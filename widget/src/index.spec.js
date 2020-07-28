let submit;
beforeEach(() => {
  jest.resetModules();
  submit = require('@api').submit;
});

test('calls submit', () => {
  // Set up our document body
  document.body.innerHTML = '<div>' + '  <span id="username" />' + '  <button id="button" />' + '</div>';

  // This module has a side-effect
  require('./index.js');

  document.querySelector('#save-funnel').click();
  expect(submit.mock.calls[0][0]).toEqual([
    { payload: 'http://www.hotjar.com', type: 'event/VISITED_URL' },
    { payload: 'body', type: 'event/FOCUS' },
    { payload: '#save-funnel', type: 'event/CLICK' },
  ]);
});

test('second call should not impact first one', () => {
  // Set up our document body
  document.body.innerHTML = '<div>' + '  <span id="username" />' + '  <button id="button" />' + '</div>';

  // This module has a side-effect
  require('./index.js');

  document.querySelector('#save-funnel').click();
  expect(submit.mock.calls[0][0]).toEqual([
    { payload: 'http://www.hotjar.com', type: 'event/VISITED_URL' },
    { payload: 'body', type: 'event/FOCUS' },
    { payload: '#save-funnel', type: 'event/CLICK' },
  ]);

  document.querySelector('#save-funnel').click();
  expect(submit.mock.calls[1][0]).toEqual([{ payload: 'http://www.hotjar.com/tour', type: 'event/VISITED_URL' }]);
});
