import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://parksvillehandyman.ca',
  compressHTML: true,
  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});
