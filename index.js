var through     = require("through2"),
    PluginError = require("gulp-util").PluginError,
    cheerio     = require('cheerio');

var GulpHTMLTextWrapper= require('./lib/gulp-html-text-wrapper');

var PLUGIN_NAME = 'gulp-html-text-wrapper';

module.exports = function (config) {
  var wrapper = new GulpHTMLTextWrapper(config);

  return through.obj(function transform(file, encoding, callback) {
    var $ = null;

    if (file.isNull()) { return callback(null, file); }
    if (file.isStream()) { this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are unsupported.')); }

    // Use cheerio to create the DOM (document object model) of a file
    $ = cheerio.load(file.contents);

    // Traverse each top-level DOM nodes with type of 'tag'
    $.root()[0].children.forEach(function(node, i) {
      if(node.type === 'tag') {
        wrapper.traverse($, node.name);
      }
    });

    // Set file.contents to the updated HTML
    file.contents = new Buffer($.html());
    callback(null, file);
  });
};
