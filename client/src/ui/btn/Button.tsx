import React from "react";
import "./btn.css";

interface BtnProps {
  text: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const MyBtn: React.FC<BtnProps> = ({
  text,
  onClick,
  type,
  disabled,
  className,
}) => {
  return (
    <button 
      type={type}
      className={`custom-btn ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MyBtn;
