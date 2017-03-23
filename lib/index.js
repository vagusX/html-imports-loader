var loaderUtils = require('loader-utils')
var fs = require('fs')
var path = require('path')
var Vulcanize = require('vulcanize')

var domModuleRegex = /<dom-module.*?id=["'](.*?)["'].*?>/

var emitFile = false

module.exports = function (content) {
  this.cacheable && this.cacheable()

  var url = loaderUtils.interpolateName(this, '[path][name].[ext]', {
    context: this.options.context
  })

  var meta = { url: url }
  var result = content.match(domModuleRegex)

  if (Array.isArray(result) && result[1]) {
    meta.tagName = result[1]

    if (!emitFile) return 'module.exports = ' + (JSON.stringify(meta))

    meta.url = result[1] + '.html'

    var _this = this
    var callback = this.async()

    bundler(url, function(inlinedHtml) {
      _this.emitFile(result[1] + '.html', inlinedHtml)
      callback(null, 'module.exports = ' + (JSON.stringify(meta)))
    })
  } else {
    return 'module.exports = ' + (JSON.stringify(meta))
  }
}

// ===== vulcanize =====
function bundler (target, callback) {
  new Vulcanize({
    inlineScripts: true,
    inlineCss: true,
    stripComments: true
  }).process(target, function (err, inlinedHtml) {
    onError(err)
    callback(inlinedHtml)
  })
}

function onError (err) {
  if (err) {
    console.error(err + '\n' + err.stack)
    throw err
  }
}
