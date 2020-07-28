import styles from './index.css';
import * as api from '@api';

(function () {
  document.querySelector(
    'body'
  ).innerHTML += `<div class=${styles.container}><button id="save-funnel">Save funnel</button></div>`;
  let firstCall = true;
  document.querySelector('#save-funnel').addEventListener('click', () => {
    console.log('button was clicked');
    if (firstCall) {
      api.submit([
        {
          type: api.VISITED_URL,
          payload: 'http://www.hotjar.com',
        },
        {
          type: api.FOCUS,
          payload: 'body',
        },
        {
          type: api.CLICK,
          payload: '#save-funnel',
        },
      ]);
      firstCall = false;
    } else {
      api.submit([
        {
          type: api.VISITED_URL,
          payload: 'http://www.hotjar.com/tour',
        },
      ]);
    }
  });
})();
