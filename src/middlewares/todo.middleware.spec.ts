import { TodoMiddleware } from './todo.middleware';

describe('TodoMiddleware', () => {
  it('should be defined', () => {
    expect(new TodoMiddleware()).toBeDefined();
  });
});
