import React, { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import Auth from "../components/Auth";

interface RegOrAuthProps {
  onComplete: () => void;
}

const RegistrationOrAuthorization: React.FC<RegOrAuthProps> = ({ onComplete }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const toggleAuth = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={toggleAuth} style={{ marginBottom: '20px' }}>
        {isLoggedIn ? "Go to registration" : "Already have an account? Sign in"}
      </button>
      
      {isLoggedIn ? (
        <Auth onLoginSuccess={onComplete} />
      ) : (
        <RegistrationForm onRegisterSuccess={onComplete} />
      )}
    </div>
  );
};

export default RegistrationOrAuthorization;
