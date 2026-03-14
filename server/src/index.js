import express from "express";
import compression from "compression";
import multer from "multer";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), "data.json");
const STATIC_PATH = path.join(__dirname, "../../client/dist");
const upload = multer();
app.use(cors());
app.use(compression());
app.use(express.json());
app.post("/api/save-form", upload.none(), async (req, res) => {
    try {
        const formData = req.body;
        let currentData = [];
        try {
            const fileContent = await fs.readFile(DATA_FILE, "utf-8");
            currentData = fileContent ? JSON.parse(fileContent) : [];
        }
        catch (err) {
            currentData = [];
        }
        currentData.push({
            id: Date.now(),
            ...formData,
            createdAt: new Date().toISOString(),
        });
        await fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2));
        res.json({ success: true, message: "User registered" });
    }
    catch (error) {
        console.error("Reg error:", error);
        res.status(500).json({ error: "Failed to save data" });
    }
});
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email);
        let users = [];
        try {
            const fileContent = await fs.readFile(DATA_FILE, "utf-8");
            users = fileContent ? JSON.parse(fileContent) : [];
        }
        catch (err) {
            return res
                .status(401)
                .json({ success: false, message: "not found" });
        }
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            console.log("Success login:", user.username);
            res.json({ success: true, username: user.username });
        }
        else {
            res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
app.use(express.static(STATIC_PATH));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(STATIC_PATH, "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
    console.log(`Data file path: ${DATA_FILE}`);
});
//# sourceMappingURL=index.js.map