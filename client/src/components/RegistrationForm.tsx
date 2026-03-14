import React, { useState, type ChangeEvent, type FormEvent } from "react";


interface RegistrationFormProps {
  onRegisterSuccess: () => void;
}

interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({onRegisterSuccess}) => {
  const [formData, setFormData] = useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Incorrect email format";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateErrors = validate();

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      setSubmitted(false);
    } else {
      setErrors({});
      const dataToSend = new FormData();
      dataToSend.append("username", formData.username);
      dataToSend.append("email", formData.email);
      dataToSend.append("password", formData.password);

      try {
        const response = await fetch("http://localhost:3000/api/save-form", {
          method: "POST",
          body: dataToSend,
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result, "is true");
          setSubmitted(true);
          onRegisterSuccess();
        } else {
          console.error("Error", response.statusText);
        }
      } catch (err) {
        console.error("Network Error", err);
      }
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      {submitted && <p>The form has been successfully submitted</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span>{errors.username}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>

        <button type="submit">Registration</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
