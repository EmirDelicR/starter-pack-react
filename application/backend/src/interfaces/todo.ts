export interface ITodoAddBodyRequest {
  userId: string;
  title: string;
}

export interface ITodo extends ITodoAddBodyRequest {
  completed: boolean;
  createdAt: Date;
  id: string;
}

export interface ITodoQueryRequest {
  isMobile: string;
  page: number;
  pageSize: number;
  userId: string;
}
