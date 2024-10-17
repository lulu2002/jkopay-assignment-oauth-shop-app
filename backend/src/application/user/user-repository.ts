import User from "@src/domain/user";

export default interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>;

  create(email: string): Promise<User | undefined>;
}