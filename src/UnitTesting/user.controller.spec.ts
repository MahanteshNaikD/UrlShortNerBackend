import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../UserModule/user.module';
import { UsersService } from '../UserModule/user.service';
import { UserController } from './../UserModule/user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { Connection, Model } from 'mongoose';
import { User, UserSchema } from '../Models/User';
import { after } from 'node:test';
import { UserDto } from '../Dtos/userDto';
describe('userController', () => {
  let userController: UserController;
  let userService: UsersService;

  beforeAll(async () => {
    const uri = MongooseModule.forRoot('mongodb://localhost/UrlStoreDB');
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        uri,
        MongooseModule.forFeature([
          {
            name: 'User',
            schema: UserSchema,
          },
        ]),
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UsersService>(UsersService);
  });

  after(async () => {
    await mongoose.connection.dropDatabase(); // Cleanup after each test
    await mongoose.connection.close();
  });

  describe('create user', () => {
    it('should return "Created Sccessfully"', async () => {
      const newUserData: UserDto = {
        userName: 'John Doe',
        password: '1234567',
      };
      const result = await userController.createUser(newUserData);

      expect(result).toEqual({
        message: 'User Created Sccessfully',
        statusCode: 201,
      });
    }, 40000);
  });

  describe('user alerady present', () => {
    it('should return User Already Present', async () => {
      const newUserData: UserDto = {
        userName: 'Mahantesh',
        password: '12345',
      };
      const result = await userController.createUser(newUserData);

      expect(result).toEqual({
        message: 'User Already Present',
        statusCode: 201,
      });
    }, 40000);
  });

  describe('user alerady present', () => {
    it('should return User Already Present', async () => {
      const newUserData: UserDto = {
        userName: 'Mahantesh',
        password: '12345',
      };
      const result = await userService.creteUser(newUserData);

      expect(result).toEqual({
        message: 'User Already Present',
        statusCode: 201,
      });
    }, 40000);
  });

  describe('create user', () => {
    it('should return "Created Sccessfully"', async () => {
      const result = await userService.findOne('Mahantesh');

      expect(result).toBe({
        __v: 0,
        _id: '65f44af00a32531e6268ca2d',
        password:
          '$2a$10$HklZd2afS2VtPzvIwy9nSepuG5o7qsBE0W5Zdew.975RsOJNoqlaC',
        userName: 'Mahantesh',
      });
    }, 40000);
  });
});
