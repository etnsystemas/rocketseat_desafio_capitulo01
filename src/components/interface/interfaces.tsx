export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface editTaskProps{
  taskId: number;
  taskNewTitle: string;
}

export interface renderItensProps{
  item: Task;
  index: Number;
}

export interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (data:editTaskProps) => void;
  
}

export interface TaskItemProps{
  renderItens: renderItensProps;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (data:editTaskProps) => void;  
}

