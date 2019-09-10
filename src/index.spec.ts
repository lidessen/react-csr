import { test as test1 } from './index';

test('test returns 123', () => {
  expect(test1()).toBe(123);
});
