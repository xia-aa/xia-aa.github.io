// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			      title: {
        en: 'My Docs',
        'zh-CN': '我的文档',
      },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			      // 为此网站设置英语为默认语言。
      defaultLocale: 'root',
      locales: {
		root: {
          label: 'English',
          lang: 'en', // lang 是 root 语言必须的
        },
        // 简体中文文档在 `src/content/docs/zh-cn/` 中。
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
		}),
	],
});
