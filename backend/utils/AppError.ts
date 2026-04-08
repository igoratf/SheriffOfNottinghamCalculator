export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Flag this as true to indicate it's a known, expected error (like a 404),
    // rather than a random programming bug (like a TypeError).
    this.isOperational = true;

    // Capture the stack trace to keep debugging easy
    Error.captureStackTrace(this, this.constructor);
  }
}
