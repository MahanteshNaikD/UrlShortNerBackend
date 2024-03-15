import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/UserModule/user.service';



@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    ) {}



  @Post('login')
  signIn(@Body() signInDto: any) {
    return this.authService.signIn(signInDto.userName, signInDto.password);
  }
}