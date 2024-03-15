import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Models/User';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers:[UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
