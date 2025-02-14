import { useEffect, useState } from "react";
import axios from "axios";
import { TaskListDto, TaskDto } from "../types/index";

export const useTaskList = (taskListId: string) => {
  const [taskList, setTaskList] = useState<TaskListDto | null>(null);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskListResponse, tasksResponse] = await Promise.all([
          axios.get<TaskListDto>(`http://localhost:8080/task-lists/${taskListId}`),
          axios.get<TaskDto[]>(`http://localhost:8080/task-lists/${taskListId}/tasks`),
        ]);

        setTaskList(taskListResponse.data);
        setTasks(tasksResponse.data);
      } catch (err) {
        setError("Erro ao buscar os dados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taskListId]);

  return { taskList, tasks, loading, error };
};