import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, GetUserInformationsDto } from './dtos/user.dto';
import { Public } from 'src/decorators/public/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post('/create')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post('/me')
  getUserInformations(@Body() body: { token: string }) {
    return this.userService.getUserInformations(body.token);
  }
}
