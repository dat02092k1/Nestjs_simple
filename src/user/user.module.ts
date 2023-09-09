import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLifecycle } from './user.lifecycle';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, Logger, UserLifecycle, ],
  controllers: [UserController]
})
export class UserModule {}
