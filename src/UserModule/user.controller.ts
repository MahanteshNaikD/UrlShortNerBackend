import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from '../UserModule/user.service';
import { UserDto } from 'src/Dtos/userDto';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}
  @Post('createUser')
  createUser(@Body() deviceInput: UserDto) {
    return this.userService.creteUser(deviceInput);
  }
}
