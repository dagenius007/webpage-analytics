/**
 * Services for cross tab communication.
 *
 * It uses cookies instead of local storage events because we need cross-origin
 * communication between different schemas (http / https).
 */
appModule.service('Crosstab', [
    'ipCookie',
    function (ipCookie) {
        var listeners = [],
            triggerListenersTimerId;

        /**
         * Start listening to a new signal.
         *
         * @param eventId Name of event to listen for.
         * @param fn Callback function.
         */
        this.listen = function (eventId, fn) {
            var eventInfo = (ipCookie('Crosstab') || {})[eventId];

            listeners[eventId] = listeners[eventId] || {
                lastUpdate: eventInfo && eventInfo.lastUpdate,
                callbacks: []
            };

            listeners[eventId].callbacks.push(fn);

            // Start checking for events once the first listener has been registered.
            if (!triggerListenersTimerId) {
                triggerListeners();
                triggerListenersTimerId = setInterval(triggerListeners, 1000);
            }
        };

        /**
         * Broadcast a new signal to all listeners.
         *
         * @param eventId Id of event.
         * @param data [optional] Data to send with the event.
         */
        this.signal = function (eventId, data) {
            var events = ipCookie('Crosstab') || {};

            events[eventId] = {
                lastUpdate: (new Date()).getTime(),
                data: data
            };
            ipCookie('Crosstab', events);
        };

        function triggerListeners() {
            var events = ipCookie('Crosstab') || {};

            for (var eventId in listeners) {
                var eventInfo = events[eventId];
                var listenerInfo = listeners[eventId];

                if (eventInfo && eventInfo.lastUpdate !== listenerInfo.lastUpdate) {
                    listenerInfo.lastUpdate = eventInfo.lastUpdate;
                    listenerInfo.callbacks.forEach(function (callback) {
                        callback(eventInfo.data);
                    });
                }
            }
        }

        return this;
    }
]);
