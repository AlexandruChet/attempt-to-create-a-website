import React, { useState, useMemo, type ChangeEvent } from "react";
import MyInput from "../ui/input/Input";
import MyBtn from "../ui/btn/Button";
import "../assets/styles/tasks.css";

interface Task {
  id: number;
  title: string;
  description: string;
}

const Tasks: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sortedBy, setSortedBy] = useState<"title" | "description">("title");

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "a", description: "b" },
    { id: 2, title: "b", description: "a" },
    { id: 3, title: "c", description: "c" },
  ]);

  const addTask = () => {
    if (!title.trim() || !description.trim())
      return alert("Please write title or description");

    const newTask: Task = {
      id: Date.now(),
      title: title,
      description: description,
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setDescription("");
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a[sortedBy].localeCompare(b[sortedBy]));
  }, [tasks, sortedBy]);

  const writeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const writeDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);

  return (
    <div className="tasks-block">
      <h1 className="tasks-block__headline">Tasks</h1>

      <div className="tasks-block__main-block">
        <MyInput
          label="Title"
          type="text"
          value={title}
          onChange={writeTitle}
        />

        <MyInput
          label="Description"
          type="text"
          value={description}
          onChange={writeDescription}
        />

        <MyBtn text="Add Task" onClick={addTask} type="button" />
      </div>

      <div className="tasks-block__sorted-list">
        <label className="tasks-block__sorted-list__label-text">Sort by: </label>
        <select
        className="tasks-block__sorted-list__select-block"
          value={sortedBy} 
          onChange={(e) => setSortedBy(e.target.value as "title" | "description")}
        >
          <option className="tasks-block__sorted-list__option" value="title">Title</option>
          <option className="tasks-block__sorted-list__option" value="description">Description</option>
        </select>
      </div>

      <div className="tasks-block__headline-main-block">
        {sortedTasks.map((task) => (
          <div key={task.id} className="tasks-block__headline-main-block__list">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
