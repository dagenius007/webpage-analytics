/***********************************************
 * XCOM - Cross tab communication.
 ***********************************************/

(function () {
    /**
     * The xcom namespace allows communication with the Insights admin interface through the use of an iframed proxy
     * that uses LocalStorage to send cross tab/window messages.
     *
     * It's currently (and probably never will be) compatible with Internet Explorer 11 [%^*&#].
     *
     * @namespace xcom
     * @memberof window
     */

    var host = 'https://[hostname]/';

    window.xcom = function () {
        var self = {},
            dataQueue = [],
            states = {
                unloaded: 1,
                loading: 2,
                loaded: 3,
                ready: 10
            },
            loadState = states.unloaded,
            proxyUrlBase = host + 'proxy.html',
            proxyName = '_hjXcomProxyFrame',
            proxyFrame;

        var listen = function () {
            if (window.addEventListener) {
                window.addEventListener('message', onMessage, false);
            } else {
                window.attachEvent('onmessage', onMessage);
            }
        };

        // Adds a hidden iframe to the page and starts listening.
        var setup = function () {
            // If loading of the iframe haven't started then add the iframe to the page.
            if (loadState === states.unloaded) {
                listen();
                loadState = states.loading;
                var newProxyFrame = document.createElement('iframe');
                newProxyFrame.style.position = 'fixed';
                newProxyFrame.style.top = -100;
                newProxyFrame.style.left = -100;
                newProxyFrame.width = 1;
                newProxyFrame.height = 1;
                newProxyFrame.id = proxyName;
                newProxyFrame.src = proxyUrlBase;
                document.body.appendChild(newProxyFrame);
                proxyFrame = document.getElementById(proxyName);
            }
        };

        /**
         * Sends a message from the script to the angular app.
         * @function setup
         * @memberof! window.xcom
         * @param eventId The event ID listened to by Crosstab.
         * @param data The data to send.
         * @example window.xcom.send('test', { foo: 'bar' });
         */
        self.send = function (eventId, data) {
            if (loadState === states.ready) {
                // Send the eventId and data through a post message.
                proxyFrame.contentWindow.postMessage({
                    eventId: eventId,
                    data: data
                }, '*');
            } else {
                dataQueue.push({
                    eventId: eventId,
                    data: data
                });
                setup();
            }
        };

        // Listens for incoming messages. If it's a knockknock we process anything that had been processed prior.
        var onMessage = function (event) {
            if (event.data.eventId === 'knockknock') {
                loadState = states.ready;
                dataQueue.forEach(function (item) {
                    self.send(item.eventId, item.data);
                });
                dataQueue = [];
            }
        };

        return self;
    }();
}());
