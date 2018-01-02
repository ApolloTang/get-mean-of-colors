
## Get Mean of Colors

The function in question is called 'getMeanOfColors()', where it:

- Takes 2 colors as arguments and returns the average color.
- The parameters will be two 6-digit hexadecimal strings.
- The return value should be a 6-digit hexadecimal string.
- The hexadecimal strings represent colors in RGB, much like in CSS.
- The average color is to be determined by taking the arithmetic mean for each component: red, green and blue.

getMeanOfColors() is exported as an ES6 default module from the file called 'get-mean-of-colors.js'. This file is imported in get-mean-of-colors.test.js where unit tests are writen to test against its functionalities as well as the details of helper functions used.

The test framwork used in testing getMeanOfColors() is mocha.js and chai.js, where there are set up in the index.html file and run in the browser where test results are shown. You will need an http server to get it load it into the browser.

You can install a simple http server with npm as follow:

```
$ npm install -g http-server
```

Then get it started with

```
$ http-server -p <port-number>
```

In broswer, navigate to localhost:port-number you will see the results of test



