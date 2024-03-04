import { SimplesException } from "./simples-exception";

export class InvalidUserException extends SimplesException {
  private static readonly NAME = "invalid_user_exception";

  constructor(message: string) {
    super(403, InvalidUserException.NAME, message);
    Object.setPrototypeOf(this, InvalidUserException.prototype);
  }

  static of(message: string) {
    return new this(message);
  }
}
