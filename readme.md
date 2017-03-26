# HTML Imports Loader for Webpack

![NPM](https://img.shields.io/npm/v/html-imports-loader.svg)
[![Build Status](https://travis-ci.org/vagusX/html-imports-loader.svg)](https://travis-ci.org/vagusX/html-imports-loader)

## Installation

```bash
$ npm install html-imports-loader
```

## Usage

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

*And pls serve the bower_components folder in your static server at the same time for better dev exprience.*

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

With the config `emitFile` you can get a vulcanized html modules.

## Todos
* User config for vulcanize
* Emit as a React/Vue/Ng Component

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
