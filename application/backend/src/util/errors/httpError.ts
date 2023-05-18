interface IHttpError {
  message: string;
  status: number;
}

class HttpError extends Error {
  public status = 500;

  constructor({ message, status }: IHttpError) {
    super(message);
    this.status = status;
  }
}

export default HttpError;
