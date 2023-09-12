import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import * as bcryct from 'bcrypt';
import {CreateUserDto, LoginUserDto} from "../dto/user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userDto: CreateUserDto) {
    userDto.password = await bcryct.hash(userDto.password, 10);

    // check exists
    const checkUser = await this.userRepository.findByCondition({
      email: userDto.email,
    });

    if (checkUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.create(userDto);
  }

  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findByCondition({ email });

    if (!user)
      throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);

    const is_equal = bcryct.compareSync(password, user.password);

    if (!is_equal)
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);

    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByCondition({ email });
  }
}
