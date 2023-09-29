export class HRAPIError extends Error {
  public statusCode: number = 500;
  public location: string = 'HR App';
  constructor(msg: string) {
    super(msg);
  }
}

export class NotFoundError extends HRAPIError {
  constructor(msg: string, location: string) {
    super(msg);
    this.statusCode = 404;
    this.location = location;
  }
}
export class BadRequestError extends HRAPIError {
  constructor(msg: string, location: string) {
    super(msg);
    this.statusCode = 400;
    this.location = location;
  }
}
export class UnAuthorizedError extends HRAPIError {
  constructor(msg: string, location: string) {
    super(msg);
    this.statusCode = 401;
    this.location = location;
  }
}

export class UnAuthenticatedError extends HRAPIError {
  constructor(msg: string, location: string) {
    super(msg);
    this.statusCode = 403;
    this.location = location;
  }
}
