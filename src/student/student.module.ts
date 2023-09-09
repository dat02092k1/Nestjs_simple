import { Logger, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  providers: [StudentService, Logger, ],
  controllers: [StudentController]
})
export class StudentModule {}
