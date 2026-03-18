import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      'data/index': 'src/data/index.ts',
      'hooks/index': 'src/hooks/index.ts',
      'seo/index': 'src/seo/index.ts',
    },
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'next', 'nuqs', 'date-fns'],
    banner: {
      js: "'use client';",
    },
  },
])
