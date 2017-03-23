import loaderUtils from 'loader-utils'

const domModuleRegex = /<dom-module.*?id=["'](.*?)["'].*?>/

module.exports = function (content) {
  this.cacheable && this.cacheable()

  const url = loaderUtils.interpolateName(this, '[path][name].[ext]', {
    context: this.options.context
  })

  const meta = { url }
  const result = content.match(domModuleRegex)

  if (Array.isArray(result) && result[1]) {
    meta.name = result[1]
  }

  return `module.exports = ${JSON.stringify(meta)}`
}
