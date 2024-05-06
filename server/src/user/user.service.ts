import {
  ConflictException,
  HttpException,
  NotFoundException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, GetUserInformationsDto } from './dtos/user.dto';
import { HashPasswordService } from 'src/hash-password/hash-password.service';
import { Roles } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/constants';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashPasswordService: HashPasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser({ email, firstName, lastName, password }: CreateUserDto) {
    const hashedPassword =
      await this.hashPasswordService.hashPassword(password);

    const userExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('email taken');
    }

    const newUser = await this.prismaService.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        user_type: Roles.USER,
      },
    });

    return 'user created successfully';
  }

  async getUserInformations(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.access_token_secret,
      });

      const userExists = await this.prismaService.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!userExists) {
        throw new NotFoundException();
      }
      console.log(userExists);
      const user = {
        email: userExists.email,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        role: userExists.user_type,
      };
      return { user };
    } catch (err) {
      throw new UnauthorizedException('invalid_token');
    }
  }
}
