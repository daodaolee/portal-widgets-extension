const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 复制文件到指定目录
const copyFiles = [
  {
    from: path.resolve('src/plugins/manifest.json'),
    to: `${path.resolve('dist')}/manifest.json`
  },
  {
    from: path.resolve('src/assets'),
    to: path.resolve('dist/assets')
  },
  {
    from: path.resolve('src/plugins/inject.js'),
    to: path.resolve('dist/js')
  }
]

// 复制插件
const plugins = [
  new CopyWebpackPlugin({
    patterns: copyFiles
  })
]

// 页面文件
const pages = {}
// 配置 popup.html 页面
const chromeName = ['popup']

chromeName.forEach(name => {
  pages[name] = {
    entry: `src/${name}/main.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`
  }
})

module.exports = {
  pages,
  productionSourceMap: false,
  // 配置 content.js background.js
  configureWebpack: {
    entry: {
      content: './src/content/main.js',
      background: './src/background/main.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename('js/[name].js').end()
      config.output.chunkFilename('js/[name].js').end()
    }

    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module.
      rule('icons').
      test(/\.svg$/).
      include.add(resolve('src/icons')).
      end().
      use('svg-sprite-loader').
      loader('svg-sprite-loader').
      options({
        symbolId: 'icon-[name]'
      }).
      end()
  },
  // 配置 content.css
  css: {
    extract: {
      filename: 'css/[name].css'
    }
  }
}
