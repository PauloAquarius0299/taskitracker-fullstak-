export interface TaskListDto {
    id: string;
    title: string;
    description: string;
    count: number;
    progress: number;
    tasks: TaskDto[];
  }
  
  export interface TaskDto {
    id: string;
    title: string;
    completed: boolean;
  }