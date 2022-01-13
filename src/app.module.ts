import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DefaultController } from './controllers/default/default.controller';
import { DefaultService } from './services/default/default.service';
import { TodoService } from './services/todo/todo.service';
import { TodoController } from './controllers/todo/todo.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { TodoMiddleware } from '@middlewares/todo.middleware';
import { UserMiddleware } from '@middlewares/user.middleware';

@Module({
  imports: [],
  controllers: [DefaultController, TodoController, UserController],
  providers: [DefaultService, TodoService, PrismaService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TodoMiddleware)
      .forRoutes({ path: 'todo/create', method: RequestMethod.POST })
      .apply(UserMiddleware)
      .forRoutes({ path: 'user/create', method: RequestMethod.POST });
  }
}
