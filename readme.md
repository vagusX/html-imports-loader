# HTML Imports Loader for Webpack

![NPM](https://img.shields.io/npm/v/html-imports-loader.svg)
[![Build Status](https://travis-ci.org/vagusX/html-imports-loader.svg)](https://travis-ci.org/vagusX/html-imports-loader)

## Installation

```bash
$ npm install html-imports-loader
```

## Usage

### Use it in Vanilla JS

Webpack config when dev
```js
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-imports-loader'
      }
    ],
    include: /bower_components/,
    exclude: /public/
  }
```

```js
  import paperButton from '../bower_components/paper-button/paper-button.html'

  console.log(paperButton)
  /**
    * you will get a object like this
    * {
    *   tagName: 'paper-button',
    *   url: '/Users/someone/CurrentProject/bower_components/paper-button/paper-button.html'
    * }
    */
```

```js
  // we can load it by using `link` tag
  const link = document.createElement('link')
  link.rel = 'import'
  link.href = PxTimeseries.url
  document.head.appendChild(link)

  // we can create a dom instance by `createElement` method
  const PaperBtn = document.createElement(paperButton.tagName)

  // set `innerText`
  PaperBtn.innerText = 'Click it'

  // set some properties for it
  const paperBtnProps = {
    disabled: false,
    toggles: true,
    raised: true
  }

  Object.keys(paperBtnProps).map(prop => {
    PaperBtn[prop] = paperBtnProps[prop]
  })

  // mount it to specific root element when `WebComponentsReady`
  window.addEventListener('WebComponentsReady', function() {
    document.querySelector('#root').appendChild(PaperBtn)
  })

```

And pls serve the bower_components folder in your static server at the same time for better dev exprience.

Here's a sample in `express`

```js
  // serve bower components
  app.use('/bower_components', express.static('./bower_components'))

```

Webpack config when production
```js
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-imports-loader',
        options: {
          emitFile: true
        }
      }
    ],
    include: /bower_components/,
    exclude: /public/
  }
```

With the config `emitFile:true` you can get a vulcanized html modules.

### Use it in ReactJS

We now support React 💪💪💪

## Todos
* User config for vulcanize
* Emit as a Vue/Ng Component

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
