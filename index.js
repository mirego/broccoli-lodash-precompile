var _ = require('lodash');
var Filter = require('broccoli-filter');

function LodashPrecompiler(inputTree, options) {
  if (!(this instanceof LodashPrecompiler)) return new LodashPrecompiler(inputTree, options);

  this.inputTree = inputTree;

  this.options = options || {};
  this.options.localsVariableName = options.localsVariableName || 'locals';
  this.options.useLodashEscape = typeof options.useLodashEscape === 'boolean' ? options.useLodashEscape : true;
}

LodashPrecompiler.prototype = Object.create(Filter.prototype);
LodashPrecompiler.prototype.constructor = LodashPrecompiler;

LodashPrecompiler.prototype.extensions = ['html'];
LodashPrecompiler.prototype.targetExtension = 'js';

LodashPrecompiler.prototype.processString = function(string) {
  _.templateSettings.variable = this.options.localsVariableName;
  var output = '';

  if (!this.options.useLodashEscape) {
    output += this.copyEscapeFunction();
    output += '\n';
  }

  return 'export default ' + _.template(string) + ';';
};

LodashPrecompiler.prototype.copyEscapeFunction = function() {
  // jshint ignore:start
  return ''                                 +
    'var _ = {'                             +
      'escape: function(string) {'          +
        'var unescapedHTML = /[\&<>"\']/g;' +
        'var HTMLEscapes = {'               +
          '"&": "&amp;",'                   +
          '"<": "&lt;",'                    +
          '">": "&gt;",'                    +
          "'\"': '&quot;',"                 +
          '"\'": "&#39;"'                   +
        '};'                                +

        'return string == null ? \'\' : String(string).replace(unescapedHTML, function(match) {' +
          'return HTMLEscapes[match];' +
        '});' +
      '}' +
    '};';
  // jshint ignore:end
};

module.exports = LodashPrecompiler;
