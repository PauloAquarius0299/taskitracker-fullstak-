"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateTasks = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleNavigate = () => {
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskListDto = {
      title,
      description,
      count: 0,
      progress: 0.0,
      tasks: [],
    };

    try {
      const response = await fetch("http://localhost:8080/task-lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskListDto),
      });

      if (response.ok) {
        const createdTaskList = await response.json();
        console.log("Task list created:", createdTaskList);

        // Redireciona para a HomePage com o taskListId como parâmetro de consulta
        router.push(`/?taskListId=${createdTaskList.id}`);
      } else {
        console.error("Failed to create task list");
      }
    } catch (error) {
      console.error("Error creating task list:", error);
    }
  };

  return (
    <section className="py-8 bg-black">
      <div className="flex h-screen items-center justify-center p-5">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl bg-[#0c0c0c77]">
          <div className="w-full space-y-10 overflow-y-auto p-10 text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Criar uma novo topico para tarefas</h1>
            <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl text-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
              <textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl text-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                rows={4}
              />
              <button
                type="submit"
                className="bg-cyan-600 text-white text-2xl font-semibold px-8 py-4 rounded-xl hover:bg-cyan-800"
              >
                + Criar lista de topico
              </button>
            </form>
            <button
              onClick={handleNavigate}
              className="flex items-center mt-4 text-white text-lg hover:text-cyan-600"
            >
              <ArrowLeft className="mr-2" /> Voltar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTasks;