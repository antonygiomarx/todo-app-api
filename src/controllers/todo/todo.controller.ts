import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { TodoService } from '@services/todo/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  @Get()
  async getAll() {
    const todos = await this._todoService.getAll();

    if (!todos) {
      return {
        success: false,
        message: 'Error getting TODOS',
      };
    }

    if (todos.length < 1) {
      return {
        success: false,
        message: 'There are not TODOS yet',
      };
    }

    return {
      success: true,
      message: 'TODOS',
      todos,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const todo = await this._todoService.get(id);

    if (!todo) {
      return {
        success: false,
        message: 'Error getting TODO',
      };
    }

    return {
      success: true,
      message: 'TODO',
      todo,
    };
  }

  /**
   * @param todoItem
   * @returns todoItem
   */
  @Post('create')
  async create(@Body() todoItem: Todo) {
    console.log(todoItem);

    const createdTodo = await this._todoService.create(todoItem);

    if (!createdTodo) {
      return {
        success: false,
        message: 'Error creating TODO',
      };
    }

    return {
      success: true,
      message: 'TODO Created',
      todo: createdTodo,
    };
  }

  @Post('update')
  async update(@Body() todoItem: Todo) {
    const todoUpdated = await this._todoService.update(todoItem);

    if (!todoUpdated) {
      return {
        success: false,
        message: 'Error updating TODO',
      };
    }

    return {
      success: true,
      message: 'TODO Updated',
      todo: todoUpdated,
    };
  }
}
