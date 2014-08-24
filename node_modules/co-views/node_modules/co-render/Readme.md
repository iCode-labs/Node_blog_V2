
# co-render

  Template rendering for [co](https://github.com/visionmedia/co) using [consolidate.js](https://github.com/visionmedia/consolidate.js),
  providing support for dozens of template engines.

## Installation

```
$ npm install co-render
```

 And install whichever engine(s) you use:

```
$ npm install ejs jade
```

## Example

```js
var co = require('co');
var render = require('co-render');

// swig mapped to .html

co(function *(){
  var user = {
    name: 'tobi',
    species: 'ferret'
  };


  var html = yield render('examples/user.html', { user: user, engine: 'swig' });
  console.log(html);
});

// jade, engine implied by extname

co(function *(){
  var user = {
    name: 'tobi',
    species: 'ferret'
  };


  var html = yield render('examples/user.jade', { user: user });
  console.log(html);
});

// ejs, engine implied by extname, with in-memory cache of the template function

co(function *(){
  var user = {
    name: 'tobi',
    species: 'ferret'
  };


  var html = yield render('examples/user.ejs', { user: user, cache: true });
  console.log(html);
});
```

# License

  MIT