import { Injectable } from '@nestjs/common';

export type User = any;
@Injectable()
export class UserService {
  findOneByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  createUser(email: any, name: any, hashedPassword: any) {
    throw new Error('Method not implemented.');
  }
}
