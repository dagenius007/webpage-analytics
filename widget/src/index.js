import styles from './index.css';
import * as api from '@api';
import infoIcon from './images/info.svg';
import closeIcon from './images/close.svg';
import closeSelector from './images/x.svg';
import stepRemove from './images/stepclose.svg';
import widget from './images/widget.svg';
import * as helper from './helper';

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

let isSelectorActive = false;

const reRenderSteps = (steps) => {
	var e = document.querySelector('.widget__steps');
	//remove all elements and add to it
	var child = e.lastElementChild;
	while (child) {
		e.removeChild(child);
		child = e.lastElementChild;
	}

	renderSteps(steps);
	rerenderStepCount();
};

//On first state
const renderSteps = (steps) => {
	steps.forEach((step, index) => appendStep(step, index + 1));
};

const appendStep = (step, index) => {
	const node = document.createElement('li'); // Create a <li> node

	node.classList.add(styles.widget__step);

	console.log(index, 'append step');

	node.setAttribute('data-funnel-step', step.index);

	node.innerHTML += `<div>
							<span class=${styles.widget__index}>${index}</span>
						</div> 
						<div id="step-funnel-${step.index}">
							<span class=${styles.title_text}>${step.action} </span>
							 <span class=${styles.subtitle_text} title='${step.value}'>${helper.truncateFullPath(step.value)} </span>
						</div> 
						<div>
	
							<img src=${stepRemove} id="step-remove-${step.index}" />
						</div>`;

	document.querySelector('.widget__steps').appendChild(node);
};

// this function is get selected elements
const repopulateElements = (steps) => {
	const currentPage = window.location.href;

	steps.forEach((step) => {
		if (step.action === 'visited') return;

		if (currentPage === step.currentPage) {
			const htmlElement = document.querySelector(step.value);
			htmlElement.setAttribute('data-funnel-id', step.index);
		}
	});
};

const rerenderStepCount = () => {
	const stepCount = document.querySelector('#widget-count');
	const stepLastCount = document.querySelector('#widget-last-count');

	stepCount.innerHTML = `<span id='widget-count'>${steps.length} STEP</span>`;
	stepLastCount.innerHTML = `<span id='widget-last-count'>${steps.length + 1}</span>`;
};

const renderWidgetFunnel = () => {
	return `<div class=${styles.widget__funnel} id="widget-funnel">
				<button class=${styles.widget__close}><img src=${closeIcon} id="close-widget"/></button>
				<div class=${styles.widget__top} id='widget-top'>
					<h3 class='${styles.widget__top_header}'>
					   Build your funnel
		 				<span id='widget-count'>${steps.length} STEP</span>
					</h3>
					<p class='${
						styles.widget__top_info
					}'><span><img src=${infoIcon} /></span>Navigate through your site and add the steps that will make up this funnel.
					</p>
				</div>
				
				<ul class='widget__steps'></ul>
				<div class='${styles.widget__bottom}'>
					<div><span id='widget-last-count'>${steps.length + 1}</span></div>
					<div class='${styles.widget__options}'>
						<div>
							<h4 class='${styles.title_text}'>User visits current page</h4>
							<p class='${styles.subtitle_text}'>ALT + p</p>
						</div>
						<div>
							<h4 class='${styles.title_text}'>User interacts with an element</h4>
							<p class='${styles.subtitle_text}'>ALT + click</p>
						</div>
					</div>
				</div>
				<div class='${styles.widget__bottons}'>
					<button class='${styles.widget__botton_save}' id='save-funnel'>Save funnel</button>
					<button class='${styles.widget__botton_remove}' id='reset-funnel'>Reset funnel</button>
				</div>

				<div class='${styles.widget__icon}' id='widget-icon'> <img src=${closeIcon} id="widget-icon"/></div>
			</div> `;
};

const renderSelector = () => {
	return `<div class=${styles.selector} id="selector">
				<div>
					<p id='hotjar_selector_text'>Select an element on the page <button><img src=${closeSelector} id='hotjar_selector_close'/></button></p>
				</div>
			</div>`;
};

const renderWidget = (steps) => {
	return `<div>
				${renderSelector()}
				<div class=${styles.container}>
					${renderWidgetFunnel(steps)}
				</div>
			</div>`;
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

const getValue = () => {
	const step = steps.find((step) => parseInt(activeFunnel) === parseInt(step.index));
	return step?.action || '';
};

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

const removeActiveState = () => {
	const isActiveSelect = document.querySelector('.active-select');

	if (isActiveSelect) {
		const select = isActiveSelect.querySelector('#funnel_actions');
		select.remove();
		isActiveSelect.outerHTML = isActiveSelect.innerHTML;
	}
};

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

	wrapper.innerHTML += `${renderSelectAction(renderOptionValues(nodeName))}`;

	//Hide selector
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

const renderSelectAction = (options) => {
	return `<select name="action" id="funnel_actions" style="
    position: absolute;
    right: -5px;
    background: #FFD902;
    color: #242424;
    padding: 9px 8px;
    font-size: 14px;
    border: 1px solid #FFD902;
	outline:none;
">
	${options.map((option) => `<option value="${option}" ${getValue() === option ? 'selected' : ''}>${option}</option>`)}
  </select>`;
};

const onSubmit = () => {
	console.log({ steps });
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
			//Remove data-funnel-id
			if (!step.isUrl) {
				const element = document.querySelector(step.value);
				element.removeAttribute('data-funnel-id');
			}
			return false;
		}
		return true;
	});

	localStorage.setItem('hotjar_funnel', JSON.stringify(steps));

	reRenderSteps(steps);
};

const onKeyDown = (event) => {
	if (event.altKey && event.code === 'KeyP') {
		const url = window.location.href;
		// Check if Url already exist
		let urlExist = steps.find((step) => step.value === url);

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

	if (event.code === 'Escape') {
		removeActiveState();
	}
};

const onClick = (event) => {
	event.preventDefault();

	const { target } = event;
	const widgetFunnel = document.querySelector('#widget-funnel');
	const widgetIcon = document.querySelector('#widget-icon');
	const selector = document.getElementById('selector');

	// Listen for hot_jar selcector close
	if (event.altKey) {
		selector.style.visibility = 'visible';
		isSelectorActive = true;
		removeActiveState();

		widgetFunnel.style.visibility = 'hidden';

		return;
	}

	if (isSelectorActive && target.id !== 'hotjar_selector_close' && target.id !== 'hotjar_selector_text') {
		//Check if attribute already has id
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

		if (target && target.id === 'save-funnel') {
			onSubmit();
			return;
		}

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

		//Activate selected step on click of a paricular step
		if (target && (target.id.includes('step-funnel') || event.target.parentNode.id.includes('step-funnel'))) {
			//Remove active id the is already active state
			removeActiveState();
			let parentElement = event.target;
			//get parent li
			while (parentElement.nodeName !== 'LI') {
				parentElement = parentElement.parentNode;
			}
			console.log({ parentElement });
			const index = parentElement.getAttribute('data-funnel-step');
			activeFunnel = parseInt(index);
			const { value } = steps.find((step) => step.index === parseInt(index));
			createWrapper(document.querySelector(value));
		}
	}
};

(function () {
	//Render widget layout with steps if there are steps
	document.querySelector('body').innerHTML += `${renderWidget(steps)}`;
	renderSteps(steps);

	//Repopulate the elements pageif reloaded or routed to another page
	repopulateElements(steps);

	document.addEventListener('keydown', onKeyDown);

	document.addEventListener('click', onClick);

	helper.dragElement(document.querySelector('#widget-funnel'));

	// let firstCall = true;
	// document.querySelector('#save-funnel').addEventListener('click', () => {
	// 	console.log('button was clicked');
	// 	if (firstCall) {
	// 		api.submit([
	// 			{
	// 				type: api.VISITED_URL,
	// 				payload: 'http://www.hotjar.com',
	// 			},
	// 			{
	// 				type: api.FOCUS,
	// 				payload: 'body',
	// 			},
	// 			{
	// 				type: api.CLICK,
	// 				payload: '#save-funnel',
	// 			},
	// 		]);
	// 		firstCall = false;
	// 	} else {
	// 		api.submit([
	// 			{
	// 				type: api.VISITED_URL,
	// 				payload: 'http://www.hotjar.com/tour',
	// 			},
	// 		]);
	// 	}
	// });
})();
