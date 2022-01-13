import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getAll() {
    try {
      return this._prismaService.user.findMany();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async get(id: string) {
    try {
      return this._prismaService.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(user: User) {
    try {
      return this._prismaService.user.create({
        data: user,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(user: User) {
    try {
      return this._prismaService.user.update({
        where: {
          id: user.id,
        },
        data: user,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string) {
    try {
      return this._prismaService.user.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async userExists(user: User) {
    const dbUser = await this._prismaService.user.findUnique({
      where: {
        email: user.email,
        id: user.id,
      },
    });

    if (!dbUser) {
      return false;
    }

    return true;
  }
}
