import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/UserModule/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}
  @Post('createUser')
  createUser(@Body() deviceInput: any) {
    return this.userService.creteUser(deviceInput);
  }
}
