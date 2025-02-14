import { useState } from "react";

interface EditModalProps {
  title: string;
  description: string;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

export const EditModal = ({ title, description, onSave, onCancel }: EditModalProps) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#0c0c0c77] p-6 rounded-2xl w-full max-w-md">
        <h3 className="text-2xl font-bold text-white mb-4">Editar Lista</h3>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full p-2 mb-4 bg-transparent border border-gray-300 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
          placeholder="Título"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full p-2 mb-4 bg-transparent border border-gray-300 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
          placeholder="Descrição"
          rows={4}
        />
        <div className="flex gap-4">
          <button
            onClick={() => onSave(editedTitle, editedDescription)}
            className="bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-800"
          >
            Salvar
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-800"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};