// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://xia-aa.github.io',
	integrations: [
		starlight({
			title: "xaa",
			favicon: '/favicon.ico',
			components: {
      },
			customCss: [
				// Path to your Tailwind base styles:
				'./src/styles/global.css',
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/xia-aa' }],
sidebar: [
			{
				label: 'Guides',
				translations: {
					'zh-CN': '指南',
				},
				items: [
					{
						label: 'Example Guide',
						translations: {
							'zh-CN': '示例指南',
						},
						slug: 'guides/example'
					},
				],
			},
			{
				label: 'Reference',
				translations: {
					'zh-CN': '参考',
				},
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

	vite: {
		plugins: [tailwindcss()],
	},
});