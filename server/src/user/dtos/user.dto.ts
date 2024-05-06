import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class GetUserInformationsDto {
  @IsEmail()
  email: string;
}
