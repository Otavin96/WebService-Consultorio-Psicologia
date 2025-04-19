export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);

    this.name = this.constructor.name; // Define o nome da classe (AppError)
    this.statusCode = statusCode;

    // Captura o stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
