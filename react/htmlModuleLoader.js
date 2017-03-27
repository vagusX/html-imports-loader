var importedHref = {}

module.exports = function importHref(href, onload, onerror, optAsync) {
  var link = document.createElement('link')
  link.rel = 'import'
  link.href = href
  var list = importedHref.imported = importedHref.imported || {}
  var cached = list[link.href]
  var imprt = cached || link
  var self = this
  var loadListener = function(e) {
    e.target.__firedLoad = true
    e.target.removeEventListener('load', loadListener)
    e.target.removeEventListener('error', errorListener)
    return onload.call(self, e)
  }
  var errorListener = function(e) {
    e.target.__firedError = true
    e.target.removeEventListener('load', loadListener)
    e.target.removeEventListener('error', errorListener)
    return onerror.call(self, e)
  }
  if (onload) {
    imprt.addEventListener('load', loadListener)
  }
  if (onerror) {
    imprt.addEventListener('error', errorListener)
  }
  if (cached) {
    if (cached.__firedLoad) {
      cached.dispatchEvent(new Event('load'))
    }
    if (cached.__firedError) {
      cached.dispatchEvent(new Event('error'))
    }
  } else {
    list[link.href] = link
    optAsync = Boolean(optAsync)
    if (optAsync) {
      link.setAttribute('async', '')
    }
    document.head.appendChild(link)
  }
  return imprt
}
