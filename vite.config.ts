import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react(),viteCompression({        
        verbose: true,
        disable: false,
        algorithm: 'gzip',
        ext:".gz",
        filter: /\.(js|mjs|css|html)$/i,
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        deleteOriginFile: false // 删除原文件
    })],
    resolve: {
        // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
            "@": path.resolve(__dirname, './src')
        }
    },    
    build: {
        outDir:'build',
        // rollup 配置
        rollupOptions: {
            output: {
                manualChunks: {
                    vendors:['@tonic-ui/react','@tonic-ui/react-hooks','antd','react-table','i18next', 'react-i18next']
                    // if (id.includes("node_modules")) {
                    //     return id
                    //         .toString()
                    //         .split("node_modules/")[1]
                    //         .split("/")[0]
                    //         .toString();
                    // }
                },                
                entryFileNames: 'js/[name].[hash].js',
                chunkFileNames: 'js/[name].[hash].js',
                assetFileNames: assetInfo => {
                    let info = assetInfo.name.split('.');
                    let extType = info[info.length - 1];
                    if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
                       extType = 'images'
                    } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
                       extType = 'images'
                    }else{
                       extType = 'css'  
                    }
                    return `${extType}/[name].[hash].[ext]`
                  }                
            }
        }
    },
    server: {
        proxy: {
            '/ui/uic/v3/': {
                target: 'http://localhost:7778',
                changeOrigin: true,
                headers: {
                    "uic-token": '0Ud3AIQdpo0F3dhN'
                }
            }
        }
    }    
})
