import React, { useState, type ChangeEvent, type FormEvent } from "react";
import MyInput from "../../shared/ui/input-ui";


interface AuthProps {
  onLoginSuccess: () => void;
}


interface formDates {
  email: string;
  password: string;
}


const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState<formDates>({
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        console.log("The server returned not JSON, but HTML");
      }

      const result = await response.json();

      if (response.ok && result.success) {
        setIsAuthenticated(true);
        onLoginSuccess();
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("invalid URL");
    }
  };

  if (isAuthenticated) return <h1>Welcome! You are logged in.</h1>;

  return (
    <div>
      <h1>Authorization</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <MyInput
            label="Email:"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="please write your email"
          />
        </div>
        <div>
          <MyInput
            label="Password:"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Auth;
