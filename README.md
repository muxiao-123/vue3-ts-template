# vue3-ts-vite-template

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 技术构成

vue3 + vueRouter + pinia + typescript + element-plus[, vant3] + elsint + prettier + vite

### 可用
1. element-plus 按需自动导入 全局组件类型声明 需搭配volar
2. compression 打包gzip压缩
3. 打包代码分析
4. 打包 css js .ext 分离
5. vueRouter 路由， pinia 状态管理
6. eslint 检测 搭配 prettier
7. 环境变量配置

### 不可用
1. pinia 持久化
2. 预渲染 用于seo


1. plugins
  1. rollup-plugin-visualizer 打包分析
  2. unplugin-auto-import unplugin-vue-components 按需自动导入 以及自动生成声明文件

### 可选配置插件

1. vite-plugin-restart
  1. 通过监听文件修改，自动重启 vite 服务

2. vite-plugin-svg-icons
  1. 用于生成 svg 雪碧图，方便在项目中使用 .svg 文件

3. vite-plugin-spritesmith
  1. css 雪碧图生成

4. vite-plugin-mock
  1. 提供了本地和生产 mock 服务
  2. 优势在于本地使用，与传统使用 mockjs 不同，是可以真实在浏览器里看到请求记录，大大提高了开发效率

5. vite-plugin-html
  1. 一个针对 index.html，提供压缩和基于 ejs 模板功能的 vite 插件
  2. 通过搭配 .env 文件，可以在开发或构建项目时，对 index.html 注入动态数据，例如替换网站标题

6. vite-plugin-compression
  1. 让项目在构建时直接生成压缩文件
```js
plugins: [
    viteCompression({
        //生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
    }),
],
```

7. vite-plugin-style-import
  1. 按需导入样式

8. unplugin-vue-components
  1. 按需导入组件

9. vite-plugin-cdn-import
  1. 引入cdn资源

```js
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
export default defineConfig({
  plugins: [
    ...
    importToCDN({
      modules: [
        autoComplete('vue'),
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'https://unpkg.com/element-plus/lib/index.full.js',
          css: 'https://unpkg.com/element-plus/lib/theme-chalk/index.css',
        }
      ]
    })
    ...
  ]
})
```

10. rollup-plugin-external-globals
  1. 另一种按需引入
```js
import externalGlobals from 'rollup-plugin-external-globals'
export default defineConfig({
    build:{
      ...
      rollupOptions:{
        external: ['vue', 'element-plus'],
        plugins: [
          externalGlobals({
              vue: 'Vue',
              'element-plus': 'ElementPlus',
          }),
        ],
      }
      ...
  }
})
```
### http/2
- 多路复用

### vite

- vite自带移除console.log和注释的配置 无需安装其他插件
```js
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
```


### typescript

1. compilerOptions
  - typeRoots 与 types
  - typeRoots: 用来指定默认的类型声明文件查找路径，默认为node_modules/@types
  - TypeScript 编译器会默认引入typeRoot下所有的声明文件，但是有时候我们并**不希望全局引入所有定义**，而是仅引入部分模块
  - types: ['jquery'] | types: []