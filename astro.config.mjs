import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  
  site: 'https://ALICTF.github.io',
  
  // 2. نام ریپازیتوری که در مرحله 1 ساختید (حتما با اسلش شروع شود)
  // اگر نام ریپازیتوری jaryan-website است:
  base: '/jaryan-website',
});