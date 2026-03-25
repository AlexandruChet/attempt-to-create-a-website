import { TaskItem } from "../TaskItem/TaskItem";

interface Task {
  id: number;
  title: string;
  description: string;
}

export const TaskList = ({ tasks }: { tasks: Task[] }) => (
  <div className="tasks-block__headline-main-block">
    {tasks.map((task) => (
      <TaskItem key={task.id} {...task} />
    ))}
  </div>
);
