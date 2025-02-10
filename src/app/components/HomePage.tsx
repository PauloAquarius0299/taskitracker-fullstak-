"use client";
import { useRouter } from "next/navigation";
import TasksListContent from "./TasksListContent";

const HomePage = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/create"); 
  };

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
    <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl bg-[#0c0c0c77] p-10 text-center flex-col items-center justify-center">
      <TasksListContent />
    </div>
  </section>
  );
};

export default HomePage;
