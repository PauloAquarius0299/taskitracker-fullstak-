"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Pen } from "lucide-react";
import { useRouter } from "next/navigation";

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

const DetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const taskListId = params.taskListId as string;
  const [taskList, setTaskList] = useState<TaskListDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState("");

  const handleNavigate = () => {
    router.push("/");
  };

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await axios.get<TaskListDto>(
          `http://localhost:8080/task-lists/${taskListId}`
        );
        setTaskList(response.data);
        setTitle(response.data.title); 
        setDescription(response.data.description);
      } catch (err) {
        setError("Erro ao buscar a lista de tarefas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskList();
  }, [taskListId]);

  const handleUpdate = async () => {
    try {
      const updatedTaskList = {
        id: taskListId, // Inclua o ID da lista de tarefas
        title,
        description,
        count: taskList?.count || 0,
        progress: taskList?.progress || 0,
        tasks: taskList?.tasks || [],
      };
  
      const response = await axios.put(
        `http://localhost:8080/task-lists/${taskListId}`,
        updatedTaskList
      );
  
      if (response.status === 200) {
        setTaskList(response.data); // Atualiza os dados exibidos
        setIsEditing(false); // Fecha o modal de edição
      }
    } catch (err) {
      setError("Erro ao atualizar a lista de tarefas.");
      console.error(err);
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
        <button
          onClick={() => setIsEditing(true)}
          className="text-cyan-600 hover:text-cyan-800"
        >
          <Pen size={24} />
        </button>
      </div>
      <p className="text-gray-300">{taskList.description}</p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">Tarefas:</h3>
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
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c77] p-6 rounded-2xl w-full max-w-md">
            <h3 className="text-2xl font-bold text-white mb-4">Editar Lista</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 bg-transparent border border-gray-300 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Título"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 bg-transparent border border-gray-300 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Descrição"
              rows={4}
            />
            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-800"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-800"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
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