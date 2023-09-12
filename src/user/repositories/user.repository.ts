import { User } from '../models/user.model';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../shared/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel);
  }
}
