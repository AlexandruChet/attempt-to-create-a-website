import React from "react";

interface ItemTypes {
  title: string;
  description: string;
}

export const TaskItem: React.FC<ItemTypes> = ({ title, description }) => {
  return (
    <div className="tasks-block__headline-main-block__list">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
