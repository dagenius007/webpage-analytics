import styles from './index.css';
import * as helper from './helper';
import stepRemove from './images/stepclose.svg';
import closeIcon from './images/close.svg';
import infoIcon from './images/info.svg';
import widget from './images/widget.svg';
import closeSelector from './images/x.svg';

//Each steps added to the funnel
export const STEP_VIEW = ({ step, index }) =>
	`<div>
		<span class=${styles.widget__index}>${index}</span>
	</div> 
	<div id="step-funnel-${step.index}">
		<span class=${styles.title_text}>${step.action} </span>
		<span class=${styles.subtitle_text} title='${step.value}'>${helper.truncateFullPath(step.value)} </span>
	</div> 
	<div>
        <img heigth="30px" width="20px" src=${stepRemove} id="step-remove-${step.index}" />
	</div>`;

export const WIDGET_FUNNEL = (steps) =>
	`<div class=${styles.widget__funnel} id="widget-funnel">
        <button class=${styles.widget__close}>
            <img src=${closeIcon} id="close-widget"/>
        </button>
        <div class=${styles.widget__top} id='widget-top'>
            
            <h3 class='${styles.widget__top_header}'>
                Build your funnel
                <span id='widget-count' class=${styles.widget__count}>${steps.length} STEP</span>
            </h3>
            <p class='${
				styles.widget__top_info
			}'><img width='25px' height='25px' src=${infoIcon} />Navigate through your site and add the steps that will make up this funnel.</p>
        </div>
        <ul class='widget__steps'></ul>
        <div class='${styles.widget__bottom}'>
            <div>
                <span id='widget-last-count'>${steps.length + 1}</span>
            </div>
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

        <div class='${styles.widget__icon}' title='widget' id='widget-icon'> 
            <img src=${widget} id="widget-icon"/>
        </div>
    </div> `;

export const WIDGET_SELECTOR = () =>
	`<div class=${styles.selector} id="selector">
      <div>
        <p id='hotjar_selector_text'>Select an element on the page 
         <img src=${closeSelector} id='hotjar_selector_close'/>
        </p>
      </div>
    </div>`;

export const WIDGET = (steps) =>
	`<div>
        ${WIDGET_SELECTOR()}
        <div class=${styles.container}>
            ${WIDGET_FUNNEL(steps)}
        </div>
    </div>`;

export const SELECTION_ACTIONS = ({ options, getValue }) =>
	`<select name="action" class=${styles.hotjar_selector_options} id="funnel_actions">
        ${options.map(
			(option) => `<option value="${option}" ${getValue() === option ? 'selected' : ''}>
                            ${option}
                        </option>`,
		)}
    </select>`;
