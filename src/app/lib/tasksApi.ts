import axios from "axios";
import { TaskDto } from "../types/index";

export const createTask = async (taskListId: string, task: TaskDto) => {
  try {
    const response = await axios.post<TaskDto>(
      `http://localhost:8080/task-lists/${taskListId}/tasks`,
      task
    );
    return response.data;
  } catch (err) {
    console.error("Failed to create task:", err);
    throw err;
  }
};