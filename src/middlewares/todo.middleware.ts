import { Injectable, NestMiddleware } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status';

@Injectable()
export class TodoMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const todo = req.body as Todo;

    if (!todo.title) {
      return res
        .json({
          success: false,
          message: 'title is required',
        })
        .status(BAD_REQUEST);
    }

    next();
  }
}
