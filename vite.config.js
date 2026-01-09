import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }) => {
  // 加载env文件
  const env = loadEnv(mode, process.cwd())
  
  return defineConfig({
    plugins: [
      vue(),
      tailwindcss(),
    ],
    base: '/agriculture/', // 添加基础路径配置
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: 8080,
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/auth': {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          secure: false,
          headers: {
            'Origin': env.VITE_APP_API_URL
          }
        }
      }
    },
    // 生产环境打包配置
    build: {
      // 移除 console 和 debugger
      minify: 'esbuild',
      esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : []
      }
    }
  })
}
  