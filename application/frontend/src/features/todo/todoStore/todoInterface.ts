export interface ITodo {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
}

export interface IApiTodoResponse {
  data: ITodo[];
  message: string;
  status: number;
}

export interface IApiPaginatedTodoResponse {
  data: {
    items: ITodo[];
    numberOfPages: number;
  };
  message: string;
  status: number;
}
