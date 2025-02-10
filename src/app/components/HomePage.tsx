"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

const HomePage = () => {
  const router = useRouter();
  const [taskLists, setTaskLists] = useState<TaskListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskLists = async () => {
      try {
        const response = await fetch("http://localhost:8080/task-lists");
        if (response.ok) {
          const data = await response.json();
          setTaskLists(data);
        } else {
          setError("Erro ao buscar as listas de tarefas.");
        }
      } catch (err) {
        setError("Erro ao conectar ao servidor.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskLists();
  }, []);

  const handleNavigate = () => {
    router.push("/create");
  };

  const handleTaskListClick = (taskListId: string) => {
    router.push(`/details/${taskListId}`); // Redireciona para a página de detalhes
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="p-8 flex flex-col items-center">
      <div className="flex flex-col items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold">Minha Lista de Tarefas</h1>
        <button
          onClick={handleNavigate}
          className="bg-cyan-600 text-white text-2xl font-semibold px-8 py-4 rounded-xl hover:bg-cyan-800"
        >
          + Criar nova tarefa
        </button>
      </div>
      <div className="w-full max-w-4xl space-y-4">
        {taskLists.length > 0 ? (
          taskLists.map((taskList) => (
            <div
              key={taskList.id}
              onClick={() => handleTaskListClick(taskList.id)}
              className="cursor-pointer p-6 bg-[#0c0c0c77] rounded-2xl shadow-2xl hover:bg-[#0c0c0c99] transition-colors"
            >
              <h2 className="text-2xl font-bold text-white">{taskList.title}</h2>
              <p className="text-gray-300">{taskList.description}</p>
              <div className="mt-4">
                <span className="text-gray-400">
                  Tarefas: {taskList.tasks.length}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">Nenhuma lista de tarefas encontrada.</p>
        )}
      </div>
    </section>
  );
};

export default HomePage;