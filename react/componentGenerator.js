const React = require('react')
const ReactDOM = require('react-dom')
const decamelize = require('decamelize')
const htmlModuleLoader = require('./htmlModuleLoader')
const syncEvent = require('./syncEvent')

module.exports = function(tagName, url) {
  return class ReactComponent extends React.Component {
    static displayName = tagName

    componentDidMount() {
      const elementConstructor = document.createElement(tagName).constructor
      if (elementConstructor === HTMLElement) {
        htmlModuleLoader(url, () => {
          this.componentWillReceiveProps(this.props)
        }, function(e) {
          console.err('Load html module failed:', e)
        })
      } else {
        this.componentWillReceiveProps(this.props)
      }
    }

    componentWillReceiveProps(props) {
      const node = ReactDOM.findDOMNode(this)
      Object.keys(props).forEach(key => {
        if (key === 'children' || key === 'style') return

        if (props[key] === node[key]) return

        if (key.indexOf('on') === 0 && key[2] === key[2].toUpperCase()) {
          syncEvent(node, decamelize(key.substring(2), '-'), props[key])
        } else {
          node[key] = props[key]
        }
      })
    }

    render() {
      return React.createElement(tagName, { style: this.props.style }, this.props.children)
    }
  }
}
