import { TaskDto } from "../types/index";

interface TaskListProps {
  tasks: TaskDto[];
}

export const TaskList = ({ tasks }: TaskListProps) => (
  <div className="mt-4">
    <h3 className="text-xl font-semibold text-white">Tarefas:</h3>
    <ul className="mt-2 space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            readOnly
            className="form-checkbox h-5 w-5 text-cyan-600"
          />
          <span className="text-gray-300">{task.title}</span>
        </li>
      ))}
    </ul>
  </div>
);