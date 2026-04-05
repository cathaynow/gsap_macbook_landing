import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return;

                    if (
                        id.includes('/@react-three/drei/')
                    ) {
                        return 'drei-vendor';
                    }

                    if (id.includes('/@react-three/fiber/')) {
                        return 'r3f-vendor';
                    }

                    if (id.includes('/three/')) {
                        return 'three-core-vendor';
                    }

                    if (id.includes('/gsap/')) {
                        return 'gsap-vendor';
                    }

                    if (
                        id.includes('/react/') ||
                        id.includes('/react-dom/') ||
                        id.includes('/scheduler/')
                    ) {
                        return 'react-vendor';
                    }
                },
            },
        },
    },
})
