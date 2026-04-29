// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightLinksValidator from 'starlight-links-validator'
import starlightCatppuccin from '@catppuccin/starlight'
import starlightUiTweaks from 'starlight-ui-tweaks'
// https://astro.build/config
export default defineConfig({
	site: 'https://xia-aa.github.io',
	integrations: [
		starlight({
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
			plugins: [
				// starlightLinksValidator(),
				 starlightUiTweaks(), starlightCatppuccin({
				          dark: { flavor: "macchiato", accent: "lavender" },
          light: { flavor: "latte", accent: "lavender" },
			})],

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
					{
						label: 'UI Framework Migration',
						translations: {
							'zh-CN': 'UI框架迁移',
						},
						slug: 'guides/ui-framework-migration',
					},
				],
			},
						{
				label: 'Docs',
				translations: {
					'zh-CN': '文档',
				},
				items: [{
					label: 'TanStack',
					items: [{
						label: "TanStack DB",
						items: [
							{
								label: "Guides",
								items: [{
									slug: "docs/tanstack/db/guides/mutations"
								}]
							}
						]
					}

					]
				}]
	
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
				title: "xaa",
			favicon: '/favicon.ico',
			customCss: [
				// Path to your Tailwind base styles:
				'./src/styles/global.css',
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/xia-aa' }],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});