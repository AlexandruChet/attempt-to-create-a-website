import React, { useState, type ChangeEvent } from "react";
import "../../../app/styles/tasks.css";
import MyBtn from "../../../shared/ui/btn-ui";
import MyInput from "../../../shared/ui/input-ui";
import { TaskList } from "../../ui/TaskList/TaskList";
import { useSortLst } from "../tasks-hooks/useSortList";

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
    { id: 1, title: "a", description: "c" },
    { id: 2, title: "b", description: "a" },
    { id: 3, title: "c", description: "b" },
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

  const sortedTasks = useSortLst(tasks, sortedBy);

  const writeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const writeDescription = (e: ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

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
        <label className="tasks-block__sorted-list__label-text">
          Sort by:{" "}
        </label>
        <select
          className="tasks-block__sorted-list__select-block"
          value={sortedBy}
          onChange={(e) =>
            setSortedBy(e.target.value as "title" | "description")
          }
        >
          <option className="tasks-block__sorted-list__option" value="title">
            Title
          </option>
          <option
            className="tasks-block__sorted-list__option"
            value="description"
          >
            Description
          </option>
        </select>
      </div>

      <TaskList tasks={sortedTasks} />
    </div>
  );
};

export default Tasks;
