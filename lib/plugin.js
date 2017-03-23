// MyPlugin.js

function MyPlugin (options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function (compiler) {

  console.log(compiler.resolvers.loader)

  compiler.plugin('compile', function (params) {
    console.log('The compiler is starting to compile...')
  })

  compiler.plugin('compilation', function (compilation) {
    console.log('The compiler is starting a new compilation...')

    compilation.plugin('optimize', function () {
      console.log('The compilation is starting to optimize files...')
    })

    compilation.plugin('optimize-tree', function(chunks, modules) {
      console.log(chunks)
    });
  })

  compiler.plugin('emit', function (compilation, callback) {
    const webpackStatsJson = compilation.getStats().toJson()
    // console.log(webpackStatsJson)
    const outputPath = compilation.compiler.outputPath;
    console.log('The compilation is going to emit files...')
    callback()
  })
}

module.exports = MyPlugin
