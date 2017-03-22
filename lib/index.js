import loaderUtils from 'load-utils'

export default function () {}

export function pitch (remainingRequest) {
  this.cacheable && this.cacheable()

  // console.log(loaderUtils.stringifyRequest(this, '!!' + remainingRequest))

  const srcFilepath = this.resourcePath
  // const srcDirpath = path.dirname(srcFilepath)
  const tmp = `
    var link = document.createElement('link')
    link.rel = 'import'
    link.href = '${srcFilepath}'
    document.head.appendChild(link)
  `

  const result = tmp.replace(/\n\s+/g, ' ')

  return result
}
