import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}

export class RefreshDto {
  @IsString()
  refresh_token: string;
}
