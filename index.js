var loaderUtils = require('loader-utils')
var fs = require('fs')
var path = require('path')
var Vulcanize = require('vulcanize')

var domModuleRegex = /<dom-module.*?id=["'](.*?)["'].*?>/

module.exports = function (content) {
  this.cacheable && this.cacheable()

  var url = loaderUtils.interpolateName(this, '[path][name].[ext]', {
    context: this.options.context
  })

  var meta = { url: url }

  var result = content.match(domModuleRegex)

  var emitFile = this.query.emitFile

  if (Array.isArray(result) && result[1]) {
    meta.tagName = result[1]

    if (!emitFile) return 'module.exports = ' + (JSON.stringify(meta))

    meta.url = result[1] + '.html'

    var callback = this.async()
    var _this = this

    bundler(url, function(inlinedHtml) {
      _this.emitFile(result[1] + '.html', inlinedHtml)
      callback(null, 'module.exports = ' + (JSON.stringify(meta)))
    })
  } else {
    throw new Error('This html module dont have any module id')
  }
}

// ===== vulcanize =====
function bundler (target, callback) {
  new Vulcanize({
    inlineScripts: true,
    inlineCss: true,
    stripComments: true
  }).process(target, function (err, inlinedHtml) {
    if (err) throw err
    callback(inlinedHtml)
  })
}
