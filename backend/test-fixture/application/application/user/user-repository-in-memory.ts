import UserRepository from "@src/application/user/user-repository";
import User from "@src/domain/user";
import RandomCodeGeneratorImpl from "@src/application/util/random-code-generator-impl";

export default class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];

  async create(email: string): Promise<User | undefined> {
    if (await this.findByEmail(email))
      return undefined;

    const user: User = {email: email, id: new RandomCodeGeneratorImpl().generate(10)}
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }


}