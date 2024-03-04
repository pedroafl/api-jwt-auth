import { SimplesException } from "./simples-exception";

export class ExistingUserException extends SimplesException {
  private static readonly NAME = "existing_user_exception";

  constructor(message: string) {
    super(200, ExistingUserException.NAME, message);
    Object.setPrototypeOf(this, ExistingUserException.prototype);
  }

  static of(message: string) {
    return new this(message);
  }
}
