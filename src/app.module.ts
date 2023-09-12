import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student/student.schema';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './shared/config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/', {
      dbName: 'nest_userdb',
    }),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
