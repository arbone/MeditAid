import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Nessun percorso specifico, così funziona in locale
  plugins: [react()],
});