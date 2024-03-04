import { EntityMetadataNotFoundError, Repository } from "typeorm";
import User from "../../../src/domain/entity/User";
import { CreateUserUsecase } from "../../../src/domain/usecase/create-user-usecase";
import { AppDataSource } from "../../../src/infra/database/data-source";

describe("Testing the use case for user creation", () => {
  it("Should throw an exception error", async () => {
    const user = {
      email: "pedroaf4@test.com",
      password: "123qwe",
    };
    const repository = AppDataSource.getRepository(User);
    const sut = new CreateUserUsecase(repository);

    await expect(sut.execute(user)).rejects.toEqual(
      new EntityMetadataNotFoundError("User")
    );
  });

  it("should create a user", async () => {
    const user = {
      email: "pedroaf5@test.com",
      password: "123qwe",
    };
    const repository = AppDataSource.getRepository(User);
    const sut = new CreateUserUsecase(repository);

    await expect(sut.execute(user)).toEqual({
      id: "uuid",
      email: "pedroaf5@test.com",
      password: "123qwe",
    });
  });
});
