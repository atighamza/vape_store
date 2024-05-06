import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshDto, SignInDto } from './dtos/auth.dto';
import { Public } from 'src/decorators/public/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Public()
  @Post('/refresh')
  refreshTheToken(@Body() body: RefreshDto) {
    return this.authService.refreshTheToken(body.refresh_token);
  }
}
