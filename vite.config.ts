import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type ConfigEnv, type UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
const config: UserConfigExport = defineConfig(
  ({ command, mode }: ConfigEnv) => {
    console.log(command)
    const lifecycle = process.env.npm_lifecycle_event
    return {
      base: '/vue-ts-template/',
      esbuild: {
        drop: ['console', 'debugger'],
      },
      build: {
        // 禁止build 压缩报告 default true
        brotliSize: false,
        rollupOptions: {
          output: {
            // 最小化拆分包
            // manualChunks: (id) => {
            //   if (id.includes('node_modules/element-plus')) {
            //     return 'elem-plus'
            //   } else if (id.includes('node_modules')) {
            //     return 'vendor'
            //     // return id.toString().split('node_modules/')[1].split('/')[0].toString()
            //   }
            // },
            // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
            entryFileNames: 'js/[name].[hash].js',
            // 用于命名代码拆分时创建的共享块的输出命名
            chunkFileNames: 'js/[name].[hash].js',
            // 用于输出静态资源的命名，[ext]表示文件扩展名
            assetFileNames: '[ext]/[name].[hash].[ext]',
          },
        },
        // sourcemap: true,
      },
      plugins: [
        vue(),
        vueJsx(),
        AutoImport({ resolvers: [VantResolver()] }),
        Components({ resolvers: [VantResolver()] }),
        lifecycle === 'report'
          ? visualizer({
              open: false,
              brotliSize: true,
              filename: 'report.html',
            })
          : null,
        mode === 'production'
          ? viteCompression({
              verbose: true,
              disable: false,
              algorithm: 'gzip',
              threshold: 10240,
              ext: '.gz',
            })
          : null,
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
    }
  }
)
export default config
