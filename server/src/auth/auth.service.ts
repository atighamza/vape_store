import {
  HttpException,
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashPasswordService } from 'src/hash-password/hash-password.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtConstants } from './constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private hashPasswordService: HashPasswordService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new HttpException("user doesn't exist", 404);
    }

    const validPassword = await this.hashPasswordService.verifyPassword(
      userExists.password,
      password,
    );

    if (!validPassword) throw new HttpException('wrong password', 404);
    const access_token = await this.generateAccessToken(userExists.email);
    const refresh_token = await this.generateRefreshToken(userExists.email);
    return { access_token, refresh_token };
  }

  async refreshTheToken(refresh_token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: jwtConstants.refresh_token_secret,
      });

      const new_access_token = await this.generateAccessToken(payload.email);
      return { new_access_token };
    } catch (err) {
      throw new UnauthorizedException('invalid_refresh_token');
    }
  }

  private async generateRefreshToken(email: string) {
    const payload = { email };
    return this.jwtService.signAsync(payload, {
      secret: jwtConstants.refresh_token_secret,
      expiresIn: '7d',
    });
  }

  private async generateAccessToken(email: string) {
    const payload = { email };
    return this.jwtService.signAsync(payload, {
      secret: jwtConstants.access_token_secret,
      expiresIn: '5min',
    });
  }
}
