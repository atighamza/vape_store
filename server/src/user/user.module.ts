import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashPasswordModule } from 'src/hash-password/hash-password.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, HashPasswordModule, JwtModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
