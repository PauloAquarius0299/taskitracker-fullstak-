"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface TaskListDto {
  id: string;
  title: string;
  description: string;
  count: number;
  progress: number;
  tasks: TaskDto[];
}

interface TaskDto {
  id: string;
  title: string;
  completed: boolean;
}

const TasksListContent = ({ taskListId }: { taskListId: string }) => {
  const [taskList, setTaskList] = useState<TaskListDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await axios.get<TaskListDto>(
          `http://localhost:8080/task-lists/${taskListId}`
        );
        setTaskList(response.data);
      } catch (err) {
        setError("Erro ao buscar a lista de tarefas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskList();
  }, [taskListId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!taskList) {
    return <p>Nenhuma lista de tarefas encontrada.</p>;
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-white">{taskList.title}</h2>
      <p className="text-gray-300">{taskList.description}</p>
      <div className="mt-4">
        <ul className="mt-2 space-y-2">
          {taskList.tasks.map((task) => (
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
    </div>
  );
};

export default TasksListContent;