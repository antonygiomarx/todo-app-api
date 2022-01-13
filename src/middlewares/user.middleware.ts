import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const user = req.body as User;
    if (!user.email) {
      return res
        .json({
          success: false,
          message: 'email is required',
        })
        .status(BAD_REQUEST);
    }

    next();
  }
}
