import { Injectable } from '@nestjs/common';
import { TodoItem } from '@prisma/client';
import { PrismaService } from '@services/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly _prisma: PrismaService) {}
  async getAll() {
    try {
      return await this._prisma.todoItem.findMany();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async get(id: string) {
    try {
      return await this._prisma.todoItem.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(todoItem: TodoItem) {
    try {
      return await this._prisma.todoItem.update({
        where: {
          id: todoItem.id,
        },
        data: todoItem,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(data: TodoItem) {
    try {
      return await this._prisma.todoItem.create({
        data,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string) {
    try {
      return await this._prisma.todoItem.update({
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
}
