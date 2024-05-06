import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashPasswordService {
  async hashPassword(password: string) {
    const hash = await argon2.hash(password);
    return hash;
  }
  async verifyPassword(hash: string, password: string) {
    const verif = await argon2.verify(hash, password);
    return verif;
  }
}
