
"use client";
import { ArrowLeft } from "lucide-react"; 
import { useRouter } from "next/navigation";
const CreateTasks = () => {
    const router = useRouter();
    
        const handleNavigate = () => {
          router.push("/"); 
        };

  return (
    <section className="py-8 bg-black">
      <div className="flex h-screen items-center justify-center p-5">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl bg-[#0c0c0c77]">
          <div className="w-full space-y-10 overflow-y-auto p-10 text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Criar uma nova tarefa</h1>
            <form className="w-full max-w-md space-y-6">
              <input
                type="text"
                placeholder="Título"
                className="w-full p-4 border border-gray-300 rounded-xl text-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
              <textarea
                placeholder="Descrição"
                className="w-full p-4 border border-gray-300 rounded-xl text-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                rows={4}
              />
            </form>
            <button
              className="bg-cyan-600 text-white text-2xl font-semibold px-8 py-4 rounded-xl hover:bg-cyan-800"
            >
              + Criar task lista
            </button>
            <button className="flex items-center mt-4 text-white text-lg hover:text-cyan-600">
              <ArrowLeft className="mr-2" /> Voltar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTasks;
