import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from '@services/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll() {
    try {
      return this.prisma.todo.findMany({
        where: {
          active: true,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async get(id: string) {
    try {
      return this.prisma.todo.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(todo: Todo) {
    try {
      return this.prisma.todo.update({
        where: {
          id: todo.id,
        },
        data: todo,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(todo: Todo) {
    try {
      return this.prisma.todo.create({
        data: todo,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string) {
    try {
      return this.prisma.todo.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
