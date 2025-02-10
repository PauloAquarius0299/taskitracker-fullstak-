'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface TasksListDTO {
    id: number;
    title: string;
    description: string;
}

const fetchTasksLists = async (): Promise<TasksListDTO[]> => {
    try {
        const res = await axios.get('http://localhost:8080/task-lists');
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar a lista de tarefas", error);
        return [];
    }
};

export default function TasksListContent() {
    const [tasksLists, setTasksLists] = useState<TasksListDTO[]>([]);

    useEffect(() => {
        fetchTasksLists().then(setTasksLists);
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>
            <ul className="space-y-4">
                {tasksLists.map((taskList) => (
                    <li key={taskList.id} className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">{taskList.title}</h2>
                        <p className="text-gray-600">{taskList.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
