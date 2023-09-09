import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IStudent } from './student.interface';
import { StudentDto } from './student.dto';
import { UpdateStudentDto } from './update-student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private studentModel:Model<IStudent>) {

    }

    async createStudent(studentDto: StudentDto): Promise<IStudent> {
        const newStudent = await new this.studentModel(studentDto);
        return newStudent.save();
    }

    async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
        const existStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, {new: true});

        if (!existStudent) {
            throw new NotFoundException(`Student #${studentId} not found`);
        }

        return existStudent;
    }

    async getAllStudent(): Promise<IStudent[]> {
        const students = await this.studentModel.find();

        if (!students || students.length == 0) {
            throw new NotFoundException('Students data not found!');
        }

        return students;
    }

    async getStudent(studentId: string): Promise<IStudent> {
        const student = await this.studentModel.findById(studentId);

        if (!student) throw new NotFoundException(`Student #${studentId} not found`);

        return student;
    }

    async deleteStudent(studentId: string): Promise<String> {
        const targetStudent = await this.studentModel.deleteOne({_id: studentId});

        if (!targetStudent) throw new NotFoundException(`Student #${studentId} not found`);

        return 'delete successfully';
    }

    
}
