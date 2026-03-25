import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { usePost } from "../../shared/hooks/usePost";
import MyInput from "../../shared/ui/input-ui";

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

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onRegisterSuccess,
}) => {
  const [formData, setFormData] = useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const { sendRequest, isLoading, err: apiError } = usePost("3000");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Incorrect email format";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});

    const dataToSend = new FormData();
    dataToSend.append("username", formData.username);
    dataToSend.append("email", formData.email);
    dataToSend.append("password", formData.password);

    await sendRequest(dataToSend, () => {
      setSubmitted(true);
      onRegisterSuccess();
    });
  };

  return (
    <div>
      <h1>Registration</h1>
      {submitted && <p>The form has been successfully submitted</p>}
      {apiError && <p>Server error: {apiError}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <MyInput
            label="Username:"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
            err={errors.username}
          />
        </div>
        <div>
          <MyInput
            label="Email: "
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            err={errors.email}
          />
        </div>
        <div>
          <MyInput
            label="Password:"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            err={errors.password}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Registration"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
