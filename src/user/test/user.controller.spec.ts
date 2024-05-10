import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UsersController', () => {
  let controller: UserController;

  const mockUserService = {
    findByEmail: jest.fn((email: string) => {
      return {
        email,
        token: 'exampleoftesttoken',
        username: 'testusername',
      };
    }),
    create: jest.fn((dto: CreateUserDto) => {
      return {
        email: dto.email,
        // token: 'exampleoftesttoken',
        username: dto.username,
      };
    }),
    update: jest.fn((id, dto: UpdateUserDto) => {
      return {
        email: dto.email,
        // token: 'exampleoftesttoken',
        username: dto.username,
      };
    }),
    delete: jest.fn(() => {
      return 1;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overridePipe(ValidationPipe)
      .useClass(new ValidationPipe())
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return user by email', async () => {
    const email = 'test@test.com';
    expect(await controller.findMe(email)).toEqual({
      email,
      token: 'exampleoftesttoken',
      username: 'testusername',
    });
  });
  it('should create user and return him', async () => {
    const email: string = 'test@test.com';
    expect(
      await controller.create({
        uid: '123',
        email,
        username: 'test',
        // password: 'test',
      }),
    ).toEqual({
      email,
      // token: 'exampleoftesttoken',
      username: 'test',
    });
  });
  it('should update user and return him', async () => {
    const email = 'testupdated@test.com';
    expect(
      await controller.update(1, {
        email,
        username: 'testupdated',
      }),
    ).toEqual({
      email,
      // token: 'exampleoftesttoken',
      username: 'testupdated',
    });
  });
  it('should delete user', async () => {
    const email = 'test@test.com';
    expect(await controller.delete(email)).toBe(1);
  });
});
