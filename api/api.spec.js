const { submit } = require('api');

beforeEach(() => {
  jest.spyOn(global.console, 'error');
});

afterEach(() => {
  jest.clearAllMocks();
});

test('array', () => {
  jest.spyOn(console, 'error').mockImplementation();
  submit('test');
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('empty', () => {
  submit([]);
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('no type', () => {
  submit([{ payload: 'test' }]);
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('invalid type', () => {
  submit([{ type: 'type', payload: 'test' }]);
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('valid type, no payload', () => {
  submit([{ type: 'event/VISITED_URL' }]);
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('ok', () => {
  submit([{ type: 'event/VISITED_URL', payload: 'test' }]);
  expect(console.error).toHaveBeenCalledTimes(0);
});
