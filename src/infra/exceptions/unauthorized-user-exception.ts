import { SimplesException } from "./simples-exception";

export class UnauthorizedUserException extends SimplesException {
  private static readonly NAME = "unauthorized_user_exception";

  constructor(message: string) {
    super(403, UnauthorizedUserException.NAME, message);
    Object.setPrototypeOf(this, UnauthorizedUserException.prototype);
  }

  static of(message: string) {
    return new this(message);
  }
}
