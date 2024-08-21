import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  signIn(@Body('data') data: SignInDto) {
    return this.authService.signIn(data);
  }

  @Post('/signIn')
  signUp(@Body('data') data: SignUpDto) {
    return this.authService.signUp(data);
  }
}
