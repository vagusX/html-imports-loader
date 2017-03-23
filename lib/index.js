var loaderUtils = require('loader-utils')

var domModuleRegex = /<dom-module.*?id=["'](.*?)["'].*?>/

module.exports = function (content) {
  this.cacheable && this.cacheable()

  var url = loaderUtils.interpolateName(this, '[path][name].[ext]', {
    context: this.options.context
  })

  var meta = { url: url }
  var result = content.match(domModuleRegex)

  if (Array.isArray(result) && result[1]) {
    meta.tagName = result[1]
  }

  return ('module.exports = ' + (JSON.stringify(meta)))
}
