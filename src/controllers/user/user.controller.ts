import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '@services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this._userService.getAll();

    if (!users || users.length < 1) {
      return {
        success: false,
        message: 'There are no users',
      };
    }

    return {
      success: true,
      message: 'Users',
      users,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const user = (await this._userService.get(id)) as User;

    if (!user) {
      return {
        success: false,
        message: 'No user exists',
      };
    }

    return {
      success: true,
      message: 'User',
      user,
    };
  }

  @Post('create')
  async create(@Body() user: User) {
    const userExists = await this._userService.userExists(user);

    if (!userExists) {
      const userCreated = await this._userService.create(user);
      console.log('Usuario creado', userCreated);

      if (!user) {
        return {
          success: false,
          message: 'Error creando el usuario',
        };
      }

      return {
        success: true,
        message: 'User created',
        user: userCreated,
      };
    }
    return {
      success: false,
      message: 'User already exists',
    };
  }

  @Post('update')
  async update(@Body() user: User) {
    const userExists = await this._userService.userExists(user);

    if (!userExists) {
      return {
        success: false,
        message: 'User not exists',
      };
    }

    const userUpdated = await this._userService.update(user);
    console.log(userUpdated);

    return {
      success: false,
      message: 'Updated user',
      user: userUpdated,
    };
  }
}
