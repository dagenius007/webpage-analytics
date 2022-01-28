import styles from './index.css';
import * as api from '@api';
import * as helper from './helper';
import { STEP_VIEW, WIDGET, SELECTION_ACTIONS } from './components';

const EVENT_TYPES = {
	VISITED_URL: 'event/VISITED_URL',
	FOCUS: 'event/FOCUS',
	KEY_PRESS: 'event/KEY_PRESS',
	CLICK: 'event/CLICK',
	CHANGE: 'event/CHANGE',
	VIEW: 'event/VIEW',
};

const data = localStorage.getItem('hotjar_funnel');
let steps = data ? JSON.parse(data) : [];
let activeFunnel = null;

//check if selector is active
let isSelectorActive = false;

/* 
  Rerender steps is used to update the dom whenever a new node is added , remove or totally cleared
  * @param  {_steps} list of steps added to the funnel
  * @returns void
*/
const reRenderSteps = (_steps) => {
	var e = document.querySelector('.widget__steps');
	//remove all elements
	var child = e.lastElementChild;
	while (child) {
		e.removeChild(child);
		child = e.lastElementChild;
	}

	renderSteps(_steps);
	rerenderStepCount();
};

/* 
	This function renders step on first load of the page
	* @param  {_steps} list of steps added to the funnel
  * @returns void
*/
const renderSteps = (_steps) => {
	_steps.forEach((step, index) => appendStep(step, index + 1));
};

/* 
	This append step to the list funnel steps.
	It is called in the rerenderSteps everything a step is added or removed
	* @param  {_step} A single step
	* @param  {index} unique index for that step
  * @returns void
*/
const appendStep = (step, index) => {
	const node = document.createElement('li'); // Create a <li> node

	node.classList.add(styles.widget__step);

	node.setAttribute('data-funnel-step', step.index);

	node.innerHTML += STEP_VIEW({ step, index });

	document.querySelector('.widget__steps').appendChild(node);
};

/* 
	This adds unique data-funnel-id to already selected steps
	It happens on first load if there are already steps added
	* @param  {_steps} list of steps added to the funnel
	 * @returns void
*/
const repopulateElements = (_steps) => {
	const currentPage = window.location.href;

	_steps.forEach((step) => {
		if (step.action === 'visited') return;

		if (currentPage === step.currentPage) {
			const htmlElement = document.querySelector(step.value);
			htmlElement.setAttribute('data-funnel-id', step.index);
		}
	});
};

/* 
	This function rerenders the steps count after a step is removed or added
	 * @returns void
*/
const rerenderStepCount = () => {
	const stepCount = document.querySelector('#widget-count');
	const stepLastCount = document.querySelector('#widget-last-count');

	stepCount.innerHTML = `<span id='widget-count'>${steps.length} STEP</span>`;
	stepLastCount.innerHTML = `<span id='widget-last-count'>${steps.length + 1}</span>`;
};

const onSelect = (event) => {
	const { value } = event.target;

	steps = steps.map((step) => {
		if (parseInt(activeFunnel) === parseInt(step.index)) {
			return { ...step, action: value };
		}
		return step;
	});

	localStorage.setItem('hotjar_funnel', JSON.stringify(steps));

	reRenderSteps(steps);
};

/* 
	Returns deynmaice options based on the selected tag
	* @param  {tag} html element tag
	* @returns options: Array
*/

const renderOptionValues = (tag) => {
	const options = {
		input: ['VIEW', 'CLICK', 'KEY_PRESS', 'FOCUS'],
		textarea: ['VIEW', 'CLICK', 'KEY_PRESS', 'FOCUS', 'CHANGE'],
		select: ['VIEW', 'CLICK', 'CHANGE', 'FOCUS'],
		others: ['VIEW', 'CLICK', 'FOCUS'],
	};
	if (tag !== 'input' || tag !== 'select' || tag !== 'textarea') {
		return options['others'];
	} else {
		return options[tag];
	}
};

// Removes active selector on any element
const removeActiveState = () => {
	const isActiveSelect = document.querySelector('.active-select');

	if (isActiveSelect) {
		const select = isActiveSelect.querySelector('#funnel_actions');
		select.remove();
		isActiveSelect.outerHTML = isActiveSelect.innerHTML;
	}
};

export const getValue = () => {
	const step = steps.find((_step) => parseInt(activeFunnel) === parseInt(_step.index));
	return step?.action || '';
};

/*
 THis function create an active wrapper on selected elemet.
 The element will either have been added to the list of steps or already added
 * @param  {t} event taget
 * @returns void
*/
const createWrapper = (t) => {
	//Hide widget selector

	removeActiveState();

	const wrapper = document.createElement('div');

	wrapper.classList.add('active-select');

	wrapper.style.borderWidth = '5px';
	wrapper.style.borderColor = '#ffd902';
	wrapper.style.borderStyle = 'solid';
	wrapper.style.position = 'relative';
	wrapper.style.background = 'white';

	// insert wrapper before el in the DOM tree
	t.parentNode.insertBefore(wrapper, t);
	// move el into wrapper
	wrapper.appendChild(t);

	const nodeName = t.nodeName.toLowerCase();

	wrapper.innerHTML += SELECTION_ACTIONS({ options: renderOptionValues(nodeName), getValue });

	//Hide selector after an element has be wrraped with the active selector
	const selector = document.getElementById('selector');
	if (selector) selector.style.visibility = 'hidden';
	isSelectorActive = false;

	const selectElement = document.getElementById('funnel_actions');
	const widgetFunnel = document.querySelector('#widget-funnel');

	widgetFunnel.style.visibility = 'visible';

	if (selectElement) {
		selectElement.addEventListener('change', onSelect);
	}
};

//Submit funnel
const onSubmit = () => {
	removeActiveState();
	if (steps.length === 0) {
		alert('No steps added yet');
		return;
	}

	const apiSteps = steps.map((step) => ({ type: EVENT_TYPES[step.action], payload: step.action }));
	api.submit([...apiSteps]);
	localStorage.setItem('hotjar_funnel', []);
	steps = [];
	reRenderSteps(steps);
};

const removeStep = (index) => {
	removeActiveState();
	steps = steps.filter((step) => {
		if (step.index === parseInt(index)) {
			//Remove data-funnel-id from the element
			//if element is not a url just remove the step
			if (!step.isUrl) {
				const element = document.querySelector(step.value);
				element.removeAttribute('data-funnel-id');
			}
			return false;
		}
		return true;
	});

	//Update the steps
	localStorage.setItem('hotjar_funnel', JSON.stringify(steps));

	reRenderSteps(steps);
};

//Handles  all onkeydown events
const onKeyDown = (event) => {
	// Add visits current page to steps
	if (event.altKey && event.code === 'KeyP') {
		const url = window.location.href;
		// Check if Url already exist
		let urlExist = steps.find((_step) => _step.value === url);

		if (urlExist) return;
		const step = {
			action: 'VISITED_URL',
			value: url,
			index: steps.length + 1,
			isUrl: true,
		};
		steps.push(step);
		localStorage.setItem('hotjar_funnel', JSON.stringify(steps));
		reRenderSteps(steps);
		return;
	}

	//Escape removes active selected element if there is
	if (event.code === 'Escape') {
		removeActiveState();
	}
};

//Handles  all onClick events
const onClick = (event) => {
	event.preventDefault();

	const { target } = event;
	const widgetFunnel = document.querySelector('#widget-funnel');
	const widgetIcon = document.querySelector('#widget-icon');
	const selector = document.getElementById('selector');

	// Open selector if ALT key is pressed down
	if (event.altKey) {
		selector.style.visibility = 'visible';
		isSelectorActive = true;
		removeActiveState();

		widgetFunnel.style.visibility = 'hidden';

		return;
	}

	//Check if selector is active and slector text was not clicked
	if (isSelectorActive && (target.id !== 'hotjar_selector_close' || target.id !== 'hotjar_selector_text')) {
		//Check if attribute already has data-funnel-id
		if (!target.getAttribute('data-funnel-id')) {
			//Use attribute id or generate random id
			const id = target.id ? `#${target.id}` : helper.getFullPath(target);

			const step = {
				action: 'CLICK',
				value: id,
				index: steps.length + 1,
				currentPage: window.location.href,
				isUrl: false,
			};
			steps.push(step);

			activeFunnel = steps.length;

			localStorage.setItem('hotjar_funnel', JSON.stringify(steps));
			//Add attribute to
			target.setAttribute('data-funnel-id', steps.length);
			// appendStep(step, step.index);
			reRenderSteps(steps);
		} else {
			activeFunnel = parseInt(target.getAttribute('data-funnel-id'));
		}

		createWrapper(target);
	} else {
		//Close widget
		if (target && target.id === 'close-widget') {
			widgetFunnel.style.visibility = 'hidden';
			widgetIcon.style.visibility = 'visible';
			return;
		}

		//Clear all steps added
		if (target && target.id === 'reset-funnel') {
			localStorage.removeItem('hotjar_funnel');
			removeActiveState();
			steps = [];
			reRenderSteps([]);
			return;
		}

		//Submit steps
		if (target && target.id === 'save-funnel') {
			onSubmit();
			return;
		}

		//close widget icon
		if (target && target.id === 'widget-icon') {
			widgetFunnel.style.visibility = 'visible';
			widgetIcon.style.visibility = 'hidden';
			return;
		}

		//Close selector
		if (target && target.id === 'hotjar_selector_close') {
			isSelectorActive = false;
			selector.style.visibility = 'hidden';
			widgetFunnel.style.visibility = 'visible';
			return;
		}

		// Remove selected step
		if (target && target.id.includes('step-remove')) {
			const id = target.id;
			const dataSet = id.split('-');
			removeStep(dataSet[dataSet.length - 1]);
			return;
		}

		//Activate selected step on click of a paricular step from widget
		if (target && (target.id.includes('step-funnel') || event.target.parentNode.id.includes('step-funnel'))) {
			//Remove active id the is already active state
			removeActiveState();
			let parentElement = event.target;
			//get parent li
			while (parentElement.nodeName !== 'LI') {
				parentElement = parentElement.parentNode;
			}

			const index = parentElement.getAttribute('data-funnel-step');
			activeFunnel = parseInt(index);
			const { value } = steps.find((step) => step.index === parseInt(index));
			createWrapper(document.querySelector(value));
		}
	}
};

(function () {
	//Render widget layout with steps if there are steps
	document.querySelector('body').innerHTML += `${WIDGET(steps)}`;
	renderSteps(steps);

	//Repopulate the elements pageif reloaded or routed to another page
	repopulateElements(steps);

	document.addEventListener('keydown', onKeyDown);

	document.addEventListener('click', onClick);

	helper.dragElement(document.querySelector('#widget-funnel'));
})();
