import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import configuration from '../shared/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {UserController} from "./controllers/user.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      // imports: [ConfigModule],
      // useFactory: async (configService: ConfigService) => ({
      //   secret: configService.get('SECRETKEY'),
      //   signOptions: {
      //     expiresIn: configService.get('EXIPIRESIN'),
      //   },
      // }),
      // inject: [ConfigService],
      secret: `${process.env.SECRETKEY}`,
      signOptions: {
        expiresIn: configuration().expiresIn,
      },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService, UserRepository, JwtStrategy],
})
export class UserModule {}
