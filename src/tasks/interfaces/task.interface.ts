export interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  responsable: string;
  deadline: Date;
  createdAt: Date;
} 