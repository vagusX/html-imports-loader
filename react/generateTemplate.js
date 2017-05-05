module.exports = function(meta) {
  return ("var componentGenerator = require('babel-loader!html-imports-loader/react/componentGenerator'); module.exports = componentGenerator(\"" + meta.tagName + "\", \"" + meta.url + "\")")
}
