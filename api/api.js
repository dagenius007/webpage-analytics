const EVENT_TYPES = {
  VISITED_URL: 'event/VISITED_URL',
  FOCUS: 'event/FOCUS',
  KEY_PRESS: 'event/KEY_PRESS',
  CLICK: 'event/CLICK',
  CHANGE: 'event/CHANGE',
  VIEW: 'event/VIEW',
};

const validator = (events) => {
  if (!Array.isArray(events)) {
    console.error('Expected first argument to be an array, got: ', events);
    return;
  }
  events.forEach((event) => {
    if (!event.type) {
      console.error('Missing type on:', event);
      return;
    }

    if (!event.payload) {
      console.error('Missing payload on:', event);
      return;
    }

    if (Object.values(EVENT_TYPES).indexOf(event.type) === -1) {
      console.error('Invalid payload type:', event);
      return;
    }
  });
};

let submit;
if (process.env.NODE_ENV === 'test') {
  submit = jest.fn(validator);
} else {
  submit = (events) => {
    validator(events);
    console.table(events);
  };
}

module.exports = {
  validator,
  submit,
  ...EVENT_TYPES,
};
