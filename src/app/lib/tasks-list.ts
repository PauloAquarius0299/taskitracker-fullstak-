import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
})

export interface TasksListDTO {
    id: number;
    title: string;
    description: string;

}

export const TasksLists = async (): Promise<TasksListDTO> => {
    try {
        const res = await api.get('/api/tasks-lists');
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar a lista de tarefas", error);
        throw error;
    }
}