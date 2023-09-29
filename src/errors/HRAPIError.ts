export class NotFoundError extends Error {
  statusCode;
  constructor(msg: string) {
    super(msg);
    this.statusCode = 404;
  }
}
export class BadRequestError extends Error {
  statusCode;
  constructor(msg: string) {
    super(msg);
    this.statusCode = 400;
  }
}
export class UnAuthorizedError extends Error {
  statusCode;
  constructor(msg: string) {
    super(msg);
    this.statusCode = 401;
  }
}
