import { Injectable, PipeTransform } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class EnrichedUserPipe implements PipeTransform {
  transform(userDto: UserDto): UserDto {
    const enrichedUser: UserDto = {
      ...userDto,
      createdAt: new Date(), // enriching the user with creation timestamp
    };
    return enrichedUser;
  }
}