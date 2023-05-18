export interface IMessage {
  id: string;
  from: string;
  date: string;
  message: string;
  previewUrl: string;
}

export interface IMessageRequest {
  email: string;
  message: string;
  fullName: string;
}

export interface IEmailsPaginatedQueryRequest {
  page: number;
  pageSize: number;
  desc: string;
  columnId: keyof IMessage;
  filter: string;
}
