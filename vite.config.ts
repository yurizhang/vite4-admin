import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    build: {
        outDir:'build',
        // rollup 配置
        rollupOptions: {
            output: {
                manualChunks: {
                    vendors:['@tonic-ui/react','@tonic-ui/react-hooks','antd']
                    // if (id.includes("node_modules")) {
                    //     return id
                    //         .toString()
                    //         .split("node_modules/")[1]
                    //         .split("/")[0]
                    //         .toString();
                    // }
                }
            }
        }
    }
})
