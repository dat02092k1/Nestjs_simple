import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';
import { response } from 'express';
import { UpdateStudentDto } from './update-student.dto';
 
@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {
    }

    @Post()
        async createStudent(@Res() response, @Body() studentDto: StudentDto) {
            try {
                const newStudent = await this.studentService.createStudent(studentDto);

                return response.status(HttpStatus.CREATED).json({
                    message: 'Student has been create successfully',
                    newStudent
                });
            } catch (error) {
                return response.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: 400,
                    message: 'Error: Student not created!',
                    error: 'Bad request'
                });
            }
        }
    
    @Get()
    async getStudents(@Res() response) {
        try {
            const students = await this.studentService.getAllStudent();

            return response.status(HttpStatus.OK).json({
                message: 'All students data found successfully',
                students
            })
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }

    @Get('/:id')
    async getStudent(@Res() response, @Param('id') studentId: string) {
        try {
            const checkStudent = await this.studentService.getStudent(studentId);

            return response.status(HttpStatus.OK).json({
                checkStudent
            })
        } catch (error) {
            return response.status(error.status).json(error.response); 
        }
    }

    @Put('/:id')
    async updateStudent(@Res() response, @Param('id') studentId: string, @Body() updateStudentDto: UpdateStudentDto) {
        try {
            const existingStudent = await this.studentService.updateStudent(studentId, updateStudentDto);

            return response.status(HttpStatus.OK).json({
                message: 'Student has been successfully updated',
                existingStudent,});
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }

    @Delete('/:id')
    async deleteStudent(@Res() response, @Param('id') studentId: string) {
        try {
            await this.studentService.deleteStudent(studentId);

            return response.status(HttpStatus.OK).json({
                message: 'Student deleted successfully',
            })
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }
}
