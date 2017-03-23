import loaderUtils from 'loader-utils'

module.exports = () => ''

module.exports.pitch = function (remainingRequest) {
  this.cacheable && this.cacheable()

  const url = loaderUtils.interpolateName(this, '[path][name].[ext]', {
    context: this.options.context
  })

  return `
    var link = document.createElement('link')
    link.rel = 'import'
    link.href = '${url}'
    document.head.appendChild(link)
  `
}
