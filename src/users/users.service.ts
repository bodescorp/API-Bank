import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UsersDto): Promise<{ id: string; username: string }> {
    const userAlreadyRegistered = await this.findByUserName(newUser.username);

    if (userAlreadyRegistered) {
      throw new HttpException(
        `User '${newUser.username}'already registered`,
        HttpStatus.CONFLICT,
      );
    }
    const dbUser = new UserEntity();

    dbUser.username = newUser.username;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);
    try {
      const { id, username } = await this.usersRepository.save(dbUser);

      return { id, username };
    } catch (error) {
      throw new HttpException(`Invalid User data`, HttpStatus.BAD_REQUEST);
    }
  }

  async findByUserName(username: string): Promise<UsersDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });
    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }
}
