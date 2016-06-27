function GulpHTMLTextWrapper(config) {
  this.tagName                = config.tagName;
  this.ignoredParentsTagNames = this.hashIgnoredParents(config.ignoredParentsTagNames);
}

GulpHTMLTextWrapper.prototype.traverse = function($, node) {
  var nodeChildren = $(node).contents();
  var currentChild, currentParent;
  var textNode, normalizedTextNode, textNodeWithTags;
  var i, len;

  for (i = 0, len = nodeChildren.length; i < len; i++) {
    currentChild  = nodeChildren[i];
    currentParent = $(currentChild).parent()[0];

    if (currentChild.data && !this.isParentIgnored(currentParent.name)) {

      textNode           = currentChild.data;
      normalizedTextNode = textNode.replace(/\s+/g, '');

      // Is there text after the white-space is removed?
      if (normalizedTextNode.length) {
        textNodeWithTags = this.wrap(normalizedTextNode);

        // Replace text with text wrapped in tags
        $(currentChild).replaceWith(textNodeWithTags);
      }
    }

    this.traverse($, currentChild);
  } // for-loop
} // traverse

GulpHTMLTextWrapper.prototype.hashIgnoredParents = function(ignoredParentsTagNames) {
  var result = {};

  result[this.tagName] = true;

  ignoredParentsTagNames.forEach(function(tagName) {
    result[tagName] = true;
  });

  return result;
};

GulpHTMLTextWrapper.prototype.isParentIgnored = function(parentTagName) {
  return this.ignoredParentsTagNames[parentTagName];
}

GulpHTMLTextWrapper.prototype.wrap = function(text) {
  var tagName  = tagName  || this.tagName,
      leftTag  = leftTag  || "<" + tagName + ">",
      rightTag = rightTag || "</" + tagName + ">";

  return [leftTag, text, rightTag].join("");
};

module.exports = GulpHTMLTextWrapper;
