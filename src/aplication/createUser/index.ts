import User from "../../domain/entity/User";
import { AppDataSource } from "../../infra/database/data-source";
import { CreateUserUsecase } from "../../domain/usecase/create-user-usecase";
import { Request, Response } from "express";

class CreateUserController {
  authenticate(request: Request, response: Response) {
    return response.send({ userId: request.userId });
  }
  async execute(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(User);
    const { ...input } = request.body;
    const createUserUsecase = new CreateUserUsecase(repository);

    const result = await createUserUsecase.execute(input);

    return response.json(result);
  }
}

export default new CreateUserController();
