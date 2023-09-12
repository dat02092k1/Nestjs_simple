import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private _createToken({ email }: any) {
    const accessToken = this.jwtService.sign({ email });

    return {
      expiresIn: `${process.env.EXIPIRESIN}`,
      accessToken,
    };
  }

  async register(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);

    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByLogin(loginUserDto);
    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(payload: any) {
    const user = await this.userService.findByEmail(payload.email);

    if (!user)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

    return user;
  }
}
