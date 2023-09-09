import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UserLifecycle implements OnModuleInit {
    onModuleInit() {
        console.log('The module has been initialized');
    }
}