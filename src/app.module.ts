import { Module } from '@nestjs/common';
import { DefaultController } from './controllers/default/default.controller';
import { DefaultService } from './services/default/default.service';
import { TodoService } from './services/todo/todo.service';
import { TodoController } from './controllers/todo/todo.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [],
  controllers: [DefaultController, TodoController, UserController],
  providers: [DefaultService, TodoService, PrismaService, UserService],
})
export class AppModule {}
