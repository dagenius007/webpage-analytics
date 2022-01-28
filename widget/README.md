# Widget

This is the funnel widget.

Entry point is `/src/index.js`.

## Starting up

Install dependencies:

    npm install

Run this widget:

    npm start

This will start a web server on [http://localhost:3001](http://localhost:3001)

## Folder Structure

```
widget/
    └── src/
        ├── images/                    <-- images used in the application
        ├── components.js              <-- Sub compoents of the widget funnel
        ├── helper.js                  <-- helper functions
        ├── index.css                  <-- widget styles
        ├── index.js                   <-- entry file
        ├── index.spec.js              <-- test file
    ├── .babelrc
    ├── package-lock.json
    ├── package.json
    ├── README.me
    └── webpack.config.js
```

## Incompleted Task

-   Draggable element on each of the steps to rearrange steps.This was not completed because I set priority level for
    this task to 1 and I could finish it within the speculated time.
-   UI bug , adjusting the close widget to overlay on the widget was taking longer than expected.
-   Adding typscript. It enables clean code. I already went a long with javascript before realizing the mistake I made.I
    should set this up first
-   Setting up jsdoc for commenting . I used the template instead
