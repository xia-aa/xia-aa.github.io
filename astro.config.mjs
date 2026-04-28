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
					{
						label: 'Islands Architecture',
						translations: {
							'zh-CN': '岛屿架构',
						},
						slug: 'guides/islands'
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
			{
				label: 'Reports',
				translations: {
					'zh-CN': '报告',
				},
				items: [
					{
						label: 'Docs Content Stats',
						translations: {
							'zh-CN': '文档内容统计',
						},
						slug: 'reports/docs-stats'
					},
				],
			},
		],
			// 为此网站设置英语为默认语言。
			defaultLocale: 'root',
			locales: {
				en: {
					label: 'English',
					lang: 'en', // lang 是 root 语言必须的
				},
				// 简体中文文档在 `src/content/docs/zh-cn/` 中。
				"root": {
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