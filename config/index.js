const TerserPlugin = require("terser-webpack-plugin");

const config = {
  projectName: 'mini',
  date: '2020-7-31',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [{
        from: 'src/components/vant-weapp/wxs/',
        to: 'dist/components/vant-weapp/wxs/'
      },
      {
        from: 'src/components/vant-weapp/checkbox',
        to: 'dist/components/vant-weapp/checkbox'
      },
      {
        from: 'src/components/wxParse/wxParse.wxss',
        to: 'dist/components/wxParse/wxParse.wxss'
      },
      {
        from: 'src/components/wxParse/wxParse.wxml',
        to: 'dist/components/wxParse/wxParse.wxml'
      }
    ],
    options: {}
  },
  framework: 'react',
  terser: {
    enable: true,
    config: {
      // 配置项同 https://github.com/terser/terser#minify-options
    }
  },
  csso: {
    enable: true,
    config: {
      // 配置项同 https://github.com/css/csso#minifysource-options
    }
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [
            /^.van-.*?$/, // 这里是vant-weapp中className的匹配模式
          ]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },

    lessLoaderOption: {
      strictMath: true,
      noIeCompat: true,
      modifyVars: {
        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
        'hack': `true; @import "~@/assets/iot_theme.less";`
      }
    },
    webpackChain(chain) {
      // chain.plugin('analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])

      chain.optimization.minimize(true);
      chain.plugin("terser").use(TerserPlugin, [{
        cache: true,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }]);
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'global', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  alias: {
    '@/pages': require('path').resolve(__dirname, '..', 'src/pages'),
    '@/subPackage': require('path').resolve(__dirname, '..', 'src/subPackage'),
    '@/models': require('path').resolve(__dirname, '..', 'src/models'),
    '@/assets': require('path').resolve(__dirname, '..', 'src/assets'),
    '@/image': require('path').resolve(__dirname, '..', 'src/image'),
    '@/config': require('path').resolve(__dirname, '..', 'src/config'),
    '@/components': require('path').resolve(__dirname, '..', 'src/components'),
    '@/service': require('path').resolve(__dirname, '..', 'src/service'),
    '@/utils': require('path').resolve(__dirname, '..', 'src/utils'),
    '@/package': require('path').resolve(__dirname, '..', 'package.json'),
    '@/project': require('path').resolve(__dirname, '..', 'project.config.json')
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
