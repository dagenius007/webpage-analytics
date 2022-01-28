let submit;
import styles from './index.css';
beforeEach(() => {
	jest.resetModules();
	submit = require('@api').submit;
});

// test('calls submit', () => {
// 	// Set up our document body
// 	document.body.innerHTML = '<div>' + '  <span id="username" />' + '  <button id="button" />' + '</div>';

// 	// This module has a side-effect
// 	require('./index.js');

// 	document.querySelector('#save-funnel').click();
// 	expect(submit.mock.calls[0][0]).toEqual([
// 		{ payload: 'http://www.hotjar.com', type: 'event/VISITED_URL' },
// 		{ payload: 'body', type: 'event/FOCUS' },
// 		{ payload: '#save-funnel', type: 'event/CLICK' },
// 	]);
// });

// test('second call should not impact first one', () => {
// 	// Set up our document body
// 	document.body.innerHTML = '<div>' + '  <span id="username" />' + '  <button id="button" />' + '</div>';

// 	// This module has a side-effect
// 	require('./index.js');

// 	document.querySelector('#save-funnel').click();
// 	expect(submit.mock.calls[0][0]).toEqual([
// 		{ payload: 'http://www.hotjar.com', type: 'event/VISITED_URL' },
// 		{ payload: 'body', type: 'event/FOCUS' },
// 		{ payload: '#save-funnel', type: 'event/CLICK' },
// 	]);

// 	document.querySelector('#save-funnel').click();
// 	expect(submit.mock.calls[1][0]).toEqual([{ payload: 'http://www.hotjar.com/tour', type: 'event/VISITED_URL' }]);
// });

describe('Widget funnel', () => {
	// const location = window.location;
	// delete window.location;
	// window.location = {
	// 	...location,
	// 	reload: jest.fn(),
	// };

	const { reload } = window.location;

	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			writable: true,
			value: { reload: jest.fn() },
		});
	});

	beforeEach(() => {
		//clear dom
		document.body.innerHTML = '';
	});

	it('It renders selector', () => {
		const altKey = new KeyboardEvent('keydown', { altKey: true });
		const clickEvent = new Event('click');

		document.dispatchEvent(altKey);
		document.dispatchEvent(clickEvent);

		require('./index.js');

		const styles = getComputedStyle(document.getElementById('selector'));

		expect(styles.visibility).toBe('visible');
	});

	it('It should render widget funnel', () => {
		require('./index.js');

		const widgetFunnel = document.getElementById('widget-funnel');
		const styles = getComputedStyle(widgetFunnel);

		expect(styles.visibility).toBe('visible');
		expect(widgetFunnel).toBeTruthy();
	});

	it('It should render funnel steps', () => {
		localStorage.setItem(
			'hotjar_funnel',
			JSON.stringify([
				{
					action: 'CLICK',
					currentPage: 'http://localhost:3000/',
					index: 1,
					value: '#title',
				},
			]),
		);

		require('./index.js');

		const nodeSteps = document.querySelector('.widget__steps');

		expect(nodeSteps.childElementCount).toBe(1);
	});

	it('It should add visited url', () => {
		const altKey = new KeyboardEvent('keydown', { altKey: true });
		const pKey = new KeyboardEvent('keydown', { code: 'KeyP' });

		document.dispatchEvent(altKey);
		document.dispatchEvent(pKey);

		require('./index.js');

		const nodeSteps = document.querySelector('.widget__steps');

		expect(nodeSteps.childElementCount).toBe(1);
	});
});
