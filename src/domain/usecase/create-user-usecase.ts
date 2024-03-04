import { Repository } from "typeorm";
import User from "../entity/User";
import { Response } from "express";
import bcrypt from "bcryptjs";
import { ExistingUserException } from "../../infra/exceptions/existing-user-exception";

export class CreateUserUsecase {
  constructor(private readonly repository: Repository<User>) {
    this.repository = repository;
  }

  async execute(input: CreateUserUsecase.Input) {
    try {
      const { ...entity } = this.mapEntity({ ...input });

      const userExists = await this.repository.findOne({
        where: { email: entity.email },
      });

      if (userExists) {
        return new ExistingUserException("Already registered user");
      }

      const user = this.repository.create({
        email: entity.email,
        password: entity.password,
      });

      const response = await this.repository.save(user);

      return response;
    } catch (error) {
      throw error;
    }
  }
  private mapEntity(input: CreateUserUsecase.Input): User {
    return {
      email: input.email,
      password: input.password,
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
      },
    };
  }
}

export namespace CreateUserUsecase {
  export interface Input {
    email: string;
    password: string;
  }
}
