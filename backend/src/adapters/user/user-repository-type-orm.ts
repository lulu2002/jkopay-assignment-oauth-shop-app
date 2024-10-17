import UserRepository from "@src/application/user/user-repository";
import User from "@src/domain/user";
import {Column, DataSource, Entity, PrimaryGeneratedColumn, Repository} from "typeorm";

export class UserRepositoryTypeOrm implements UserRepository {

  private userRepository: Repository<UserEntity>;

  constructor(
    private dataSource: DataSource
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return (await this.userRepository.findOneBy({email: email}))?.toUser();
  }

  async create(email: string): Promise<User | undefined> {
    const user = this.userRepository.create({email});
    return await this.userRepository.save(user);
  }

}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('identity')
  id!: string;

  @Column({unique: true, type: 'varchar'})
  email!: string;

  toUser(): User {
    return {
      id: this.id,
      email: this.email,
    }
  }
}