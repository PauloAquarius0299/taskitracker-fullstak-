export interface TaskListDto {
    id: string;
    title: string;
    description: string;
    count: number;
    progress: number;
    tasks: TaskDto[];
  }
  
  export interface TaskDto {
    id?: string;
    title: string;
    description: string;
    completed?: boolean;
    dueDate: string | null;
    priority: "HIGH" | "MEDIUM" | "LOW";
    status: "OPEN" | "CLOSED";
  }
  