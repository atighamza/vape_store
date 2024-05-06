import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { HashPasswordService } from './hash-password/hash-password.service';
import { HashPasswordModule } from './hash-password/hash-password.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  imports: [PrismaModule, UserModule, HashPasswordModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    HashPasswordService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
