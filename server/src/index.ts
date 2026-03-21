import express from "express";
import type { Request, Response } from "express";
import compression from "compression";
import multer from "multer";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT: number = 3000;
const DATA_FILE = path.join(process.cwd(), "data.json");
const STATIC_PATH = path.join(__dirname, "../../client/dist");
const ERROR_FILE = path.join(__dirname, "../../server", "404.html");
const upload = multer();

app.use(cors());
app.use(compression());
app.use(express.json());

app.post(
  "/api/save-form",
  upload.none(),
  async (req: Request, res: Response) => {
    try {
      const formData = req.body;
      let currentData = [];
      try {
        const fileContent = await fs.readFile(DATA_FILE, "utf-8");
        currentData = fileContent ? JSON.parse(fileContent) : [];
      } catch (err) {
        currentData = [];
      }

      currentData.push({
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      });

      await fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2));
      res.json({ success: true, message: "User registered" });
    } catch (error) {
      console.error("Reg error:", error);
      res.status(500).json({ error: "Failed to save data" });
    }
  },
);

app.get("/download", async (req: Request, res: Response) => {
  const fileName = req.query.file as string;

  if (!fileName) return res.status(400).send("File name required");

  const filePath = path.resolve(STATIC_PATH, fileName);

  if (!filePath.startsWith(STATIC_PATH)) {
    console.warn(`🚨 Hack attempt blocked! Path: ${filePath}`);

    try {
      await fs.mkdir(path.dirname(ERROR_FILE), { recursive: true });

      const errorContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404 Not Found</title>
    <style>
        body { font-family: sans-serif; background: #f0f0f0; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { text-align: center; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #ff5733; font-size: 3rem; }
        a { display: inline-block; margin-top: 1rem; color: white; background: #ff5733; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>404</h1>
        <p>Access Denied / Not Found</p>
        <a href="/">Back Home</a>
    </div>
</body>
</html>`;

      await fs.writeFile(ERROR_FILE, errorContent, "utf-8");
      return res.status(404).sendFile(ERROR_FILE);
    } catch (err) {
      console.error("Failed to create error file:", err);
      return res.status(500).send("Internal Server Error");
    }
  }

  try {
    await fs.access(filePath);
    res.sendFile(filePath);
  } catch (err) {
    res.status(404).send("File not found");
  }
});

app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);
    let users = [];

    try {
      const fileContent = await fs.readFile(DATA_FILE, "utf-8");
      users = fileContent ? JSON.parse(fileContent) : [];
    } catch (err) {
      return res.status(401).json({ success: false, message: "not found" });
    }

    const user = users.find(
      (u: any) => u.email === email && u.password === password,
    );

    if (user) {
      console.log("Success login:", user.username);
      res.json({ success: true, username: user.username });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.use(express.static(STATIC_PATH));

app.get(/.*/, (req: Request, res: Response) => {
  res.sendFile(path.join(STATIC_PATH, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
  console.log(`Data file path: ${DATA_FILE}`);
});
