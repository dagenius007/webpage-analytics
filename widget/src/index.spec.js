let submit;
import styles from './index.css';
beforeEach(() => {
	jest.resetModules();
	submit = require('@api').submit;
});

describe('Widget funnel', () => {
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
