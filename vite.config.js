import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default ({ mode }) => {
  // 加载env文件
  const env = loadEnv(mode, process.cwd())
  
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: 8080,
      open: true,
      proxy: {
        '/auth': {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          secure: false,
          headers: {
            'Origin': 'http://10.110.149.140:30012'
          }
        }
      }
    }
  })
}
  