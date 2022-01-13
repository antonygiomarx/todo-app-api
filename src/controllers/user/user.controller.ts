import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '@services/user/user.service';
import { Response } from 'express';
import { BAD_REQUEST } from 'http-status';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAll();

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
    const user = (await this.userService.get(id)) as User;

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
  async create(@Body() user: User, @Res() res: Response) {
    const userExists = await this.userService.userExists(user);

    if (!userExists) {
      const userCreated = await this.userService.create(user);

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
    return res
      .json({
        success: false,
        message: 'User already exists',
      })
      .status(BAD_REQUEST);
  }

  @Post('update')
  async update(@Body() user: User) {
    const userExists = await this.userService.userExists(user);

    if (!userExists) {
      return {
        success: false,
        message: 'User not exists',
      };
    }

    const userUpdated = await this.userService.update(user);

    return {
      success: false,
      message: 'Updated user',
      user: userUpdated,
    };
  }
}
