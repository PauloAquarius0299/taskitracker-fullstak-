"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { ArrowLeft, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTaskList } from "../../lib/useTaskList";
import { EditModal } from "../../components/EditModal";
import { TaskList } from "../../components/TaskList";

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
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!taskList) {
    return <p>Nenhuma lista de tarefas encontrada.</p>;
  }

  return (
    <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl bg-[#0c0c0c77] p-10 text-center flex-col items-center justify-center">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">{taskList.title}</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditing(true)}
            className="text-cyan-600 hover:text-cyan-800"
          >
            <Pen size={24} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            <Trash size={24} />
          </button>
        </div>
      </div>
      <p className="text-gray-300">{taskList.description}</p>
      <TaskList tasks={tasks} />
      {isEditing && (
        <EditModal
          title={title}
          description={description}
          onSave={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}
      <button
        onClick={handleNavigate}
        className="flex items-center mt-4 text-white text-lg hover:text-cyan-600"
      >
        <ArrowLeft className="mr-2" /> Voltar
      </button>
    </div>
  );
};

export default DetailsPage;