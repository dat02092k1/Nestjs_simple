import { IsDate, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsDate() 
  readonly createdAt?: Date; 
}
