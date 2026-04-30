// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightLinksValidator from 'starlight-links-validator'
import starlightCatppuccin from '@catppuccin/starlight'
import starlightUiTweaks from 'starlight-ui-tweaks'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightGitHubAlerts from 'starlight-github-alerts';


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
				starlightGitHubAlerts(),
				        starlightSidebarTopics([
          {
            label: 'Docs',
            link: '/docs/',
            icon: 'open-book',
            items: [
              {
                label: 'TanStack DB',
                items: [
                  'docs/tanstack-db/guides/live-queries',
                  'docs/tanstack-db/guides/mutations',
                  'docs/tanstack-db/guides/collection-options-creator'
                ]
              },
              'docs/copyright'
            ]
          },
          {
            label: 'Notes',
            link: '/notes/ui-framework-migration',
            icon: 'pen',
            items: ["notes/ui-framework-migration", 'notes/getting-started', 'notes/islands'],
          },
          {
            label: 'Reference',
            link: '/reference/example',
            icon: 'information',
            items: ['reference/example'],
          },
					          {
            label: 'Stats',
            link: '/reports/docs-stats',
            items: ['reports/docs-stats'],
          },

        ]),
				// starlightLinksValidator(),
				 starlightUiTweaks(), starlightCatppuccin({
				          dark: { flavor: "macchiato", accent: "lavender" },
          light: { flavor: "latte", accent: "lavender" },
			})],

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