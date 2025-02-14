"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { TaskDto } from "../../../types/index";
import { createTask } from "../../../lib/tasksApi";

const Tasks = () => {
  const { taskListId } = useParams();
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<Omit<TaskDto, "id">>({
    title: "",
    description: "",
    dueDate: null,
    priority: "MEDIUM",
    status: "OPEN",
    completed: false,
  });
  const [editingTask, setEditingTask] = useState<TaskDto | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<TaskDto[]>(
          `http://localhost:8080/task-lists/${taskListId}/tasks`
        );
        setTasks(response.data);
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (taskListId) {
      fetchTasks();
    }
  }, [taskListId]);

  const handleCreateTask = async () => {
    try {
      const taskPayload: Omit<TaskDto, "id"> = {
        ...newTask,
        dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : null,
      };

      const createdTask = await createTask(taskListId as string, taskPayload);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setNewTask({
        title: "",
        description: "",
        dueDate: null,
        priority: "MEDIUM",
        status: "OPEN",
        completed: false,
      });
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const handleUpdateTask = async (updatedTask: TaskDto) => {
    try {
      const payload = {
        ...updatedTask,
        dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString() : null,
      };

      console.log("Payload sendo enviado:", payload); // Log do payload

      const response = await axios.put<TaskDto>(
        `http://localhost:8080/task-lists/${taskListId}/tasks/${updatedTask.id}`,
        payload
      );

      console.log("Resposta do servidor:", response.data); // Log da resposta

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? response.data : task))
      );
      setEditingTask(null);
    } catch (err) {
      console.error("Failed to update task:", err);
      if (err.response) {
        console.error("Detalhes do erro:", err.response.data); // Log detalhado do erro
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(
        `http://localhost:8080/task-lists/${taskListId}/tasks/${taskId}`
      );

      // Atualiza a lista de tarefas, removendo a tarefa excluída
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
      if (err.response) {
        console.error("Detalhes do erro:", err.response.data);
      }
    }
  };

  const handlePriorityChange = (priority: "HIGH" | "MEDIUM" | "LOW") => {
    setNewTask((prevTask) => ({ ...prevTask, priority }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 flex flex-col items-center text-black">
      <h1 className="text-2xl font-bold mb-4 text-white">Tarefa diaria</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="p-2 border border-gray-300 rounded shadow-sm"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="p-2 border border-gray-300 rounded shadow-sm"
        />
        <input
          type="date"
          value={newTask.dueDate || ""}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="p-2 border border-gray-300 rounded shadow-sm"
        />
        <div className="flex gap-2">
          {["HIGH", "MEDIUM", "LOW"].map((priority) => (
            <button
              key={priority}
              onClick={() => handlePriorityChange(priority as "HIGH" | "MEDIUM" | "LOW")}
              className={`px-4 py-2 rounded ${
                newTask.priority === priority
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              } hover:bg-blue-500`}
            >
              {priority}
            </button>
          ))}
        </div>
        <button
          onClick={handleCreateTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Criar Tarefa
        </button>
      </div>
      <ul className="w-full max-w-lg">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-2 p-4 bg-white border border-gray-300 rounded shadow-md"
          >
            <h2 className="font-bold text-gray-900">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">
              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
            </p>
            <p className="text-sm text-gray-500 font-semibold">
              Status: {task.completed ? "✅ Completed" : "⌛ Pending"}
            </p>
            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditingTask(task)}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Tarefa</h2>
            <input
              type="text"
              placeholder="Title"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              className="p-2 border border-gray-300 rounded shadow-sm w-full mb-4"
            />
            <input
              type="text"
              placeholder="Description"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
              className="p-2 border border-gray-300 rounded shadow-sm w-full mb-4"
            />
            <input
              type="date"
              value={editingTask.dueDate || ""}
              onChange={(e) =>
                setEditingTask({ ...editingTask, dueDate: e.target.value })
              }
              className="p-2 border border-gray-300 rounded shadow-sm w-full mb-4"
            />
            <div className="flex gap-2 mb-4">
              {["HIGH", "MEDIUM", "LOW"].map((priority) => (
                <button
                  key={priority}
                  onClick={() =>
                    setEditingTask({
                      ...editingTask,
                      priority: priority as "HIGH" | "MEDIUM" | "LOW",
                    })
                  }
                  className={`px-4 py-2 rounded ${
                    editingTask.priority === priority
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-black"
                  } hover:bg-blue-500`}
                >
                  {priority}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleUpdateTask(editingTask)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;