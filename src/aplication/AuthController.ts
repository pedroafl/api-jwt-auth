import User from "../domain/entity/User";
import { AppDataSource } from "../infra/database/data-source";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { InvalidUserException } from "../infra/exceptions/invalid-user-exception";
import { UnauthorizedUserException } from "../infra/exceptions/unauthorized-user-exception";

class AuthController {
  async authenticate(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(User);
    const { email, password } = request.body;

    const user = await repository.findOne({
      where: { email },
    });

    if (!user) {
      return new InvalidUserException("Invalid user");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return new UnauthorizedUserException("Unauthorized user");
    }

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

    user.password = "";

    return response.json({
      user,
      token,
    });
  }
}

export default new AuthController();
