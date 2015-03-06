# broccoli-lodash-precompile

`broccoli-lodash-precompile` will, as its name states, precompile your templates with lodash and output them wrapped inside ES6 modules.

## Usage

The following example will take all files with the `.html` extension inside `input-tree` and compile them to JS.

```js
// Brocfile.js
var templatePrecompile = require('broccoli-lodash-precompile');

module.exports = templatePrecompile('templates', {
  dataObjectVariable: 'data', // Defaults to 'locals'
  useLodashEscape: false      // Defaults to `true`
});
```

## Options

__`localsVariableName`__

By default lodash uses `with` to create a context inside your templates, but since ES6 modules are in strict mode and `with` is prohibited in strict mode, we have to specify a variable where all locals will be defined.

__`useLodashEscape`__

Lodash templates depend on `_.escape` being globally defined and sometimes you don’t want that. So setting this option to `false` will use a local variable inside each template. Note that this is our own implementation of `escape` instead of lodash’s but at the time of this writing, they’re pretty similar.