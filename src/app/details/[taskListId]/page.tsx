"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { ArrowLeft, Pen, Trash } from "lucide-react";
import { useTaskList } from "../../lib/useTaskList";
import { EditModal } from "../../components/EditModal";
import { TaskList } from "../../components/TaskList";
import Tasks from "./tasks/page";

const DetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const taskListId = params.taskListId as string;
  const { taskList, tasks, loading, error } = useTaskList(taskListId);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleNavigate = () => {
    router.push("/");
  };

  const handleUpdate = async (newTitle: string, newDescription: string) => {
    try {
      const updatedTaskList = {
        id: taskListId,
        title: newTitle,
        description: newDescription,
        count: taskList?.count || 0,
        progress: taskList?.progress || 0,
        tasks: taskList?.tasks || [],
      };

      const response = await axios.put(
        `http://localhost:8080/task-lists/${taskListId}`,
        updatedTaskList
      );

      if (response.status === 200) {
        setTitle(newTitle);
        setDescription(newDescription);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Erro ao atualizar a lista de tarefas:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/task-lists/${taskListId}`
      );

      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.error("Erro ao excluir a lista de tarefas:", err);
    }
  };

  if (loading) {
    return <p>Carregando...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!taskList) {
    return <p>Nenhuma lista de tarefas encontrada.</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-black">
      <div className="w-full max-w-4xl flex flex-col bg-[#0c0c0cdd] p-8">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{taskList.title}</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="text-cyan-500 hover:text-cyan-400 transition duration-200"
            >
              <Pen size={24} />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-400 transition duration-200"
            >
              <Trash size={24} />
            </button>
          </div>
        </div>
  
        {/* Descrição da lista de tarefas */}
        <p className="text-gray-300 mb-6">{taskList.description}</p>
  
        {/* Lista de tarefas */}
        <div className="flex-1 overflow-y-auto mb-6">
          <TaskList tasks={tasks} />
        </div>
  
        {/* Modal de edição */}
        {isEditing && (
          <EditModal
            title={title}
            description={description}
            onSave={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        )}
  
        {/* Botão de voltar */}
        <button
          onClick={handleNavigate}
          className="flex items-center mt-6 text-white text-lg hover:text-cyan-400 transition duration-200"
        >
          <ArrowLeft className="mr-2" /> Voltar
        </button>
  
        {/* Componente de tarefas */}
        <div className="w-full mt-6">
          <Tasks />
        </div>
      </div>
    </div>
  );
  
};

export default DetailsPage;