export enum TaskPriorityEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Task {
  startDate: string;
  text: string;
  priority: TaskPriorityEnum;
  dueDate: string | null;
  done: boolean;
  doneDate: string | null;
}

export interface TaskState {
  tasks: Task[];
}
