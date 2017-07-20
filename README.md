# Hotjar Front-end Task source files #

This repository contains necessary source files to carry out the Hotjar front-end recruitment task.

## XCOM - Cross tab communication ##

The XCOM library allows instant communication between two active tabs. It currently consists of an AngularJS 1 service that facilitate bi-directional communication between tabs, as well as a vanilla JavaScript implementation with the capacity to just send data.

XCOM uses cookies that are evaluated at an interval and when they are changed the new data is picked up by the service as an incoming communication request.

### How do I use ###

The client implementation require a small proxy (proxy.html) to be loaded on the same domain as the AngularJS app. The URL of this then needs to be configured in the "host" variable inside xcom.js.

The Angular service should simply be included as a service and called from within your AngularJS app.

Feel free to improve as you see fit.


### Who do I talk to? ###

Get in touch with the team by reaching out to them in your Hipchat room.