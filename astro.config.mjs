// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightLinksValidator from 'starlight-links-validator'
import starlightCatppuccin from '@catppuccin/starlight'
import starlightUiTweaks from 'starlight-ui-tweaks'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightGitHubAlerts from 'starlight-github-alerts';
import starlightFullViewMode from 'starlight-fullview-mode'

// https://astro.build/config
export default defineConfig({

	site: 'https://xia-aa.github.io',
	integrations: [
		starlight({
					// 为此网站设置英语为默认语言。
			defaultLocale: 'zh-cn',
			locales: {
				en: {
					label: 'English',
					lang: 'en', // lang 是 root 语言必须的
				},
				// 简体中文文档在 `src/content/docs/zh-cn/` 中。
				"zh-cn": {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
	// 		head: [
  //   // {
  //   //   tag: 'script',
  //   //   attrs: {
  //   //     src: '/src/scripts/fix-image-heights.ts',
  //   //     type: 'module', // Because Astro can handle TypeScript modules
  //   //   },
  //   // },
  // ],
			plugins: [
				starlightFullViewMode(),
				starlightGitHubAlerts(),
				starlightSidebarTopics([
          {
                 label: 'Skills',
            link: '/skills/',
            items: [
              "skills/drizzle-orm/skill"
            ]
          },
          {
            label: 'Docs',
            link: '/docs/',
            icon: 'open-book',
            items: [
              {
                label: 'TanStack DB',
               
                items: [
                  {
                    label: 'guides',
                    items: [
                                  'docs/tanstack-db/guides/live-queries',
                  'docs/tanstack-db/guides/mutations',
                  'docs/tanstack-db/guides/schemas',
                  'docs/tanstack-db/guides/error-handling',
                  'docs/tanstack-db/guides/collection-options-creator'
                    ]
                  },
                  {
                    label: 'collection',
                    items: [
                      'docs/tanstack-db/collection/query-collection',
                      'docs/tanstack-db/collection/electric-collection',
                      'docs/tanstack-db/collection/local-storage-collection',
                      "docs/tanstack-db/collection/local-only-collection",
                    ]
                  },
                  {
                    label: 'community',
                    items: [
                      "docs/tanstack-db/community/resources",
                    ]
                  }
                ],
              },
              {
                label: 'Paraglide Js',
                items: [
                  'docs/paraglide_js',
                  'docs/paraglide_js/tanstack-start',
                ]
              },
              {
                label: 'Electric Sync',
                items: [
                  'docs/electric-sync/api/clients/typescript'
                ]
              },
              'docs/copyright'
            ]
          },
          {
            label: 'Notes',
            link: '/notes/ui-framework-migration',
            icon: 'pen',
            items: ["notes/ui-framework-migration", 'notes/getting-started', 'notes/islands',          {
                        label: 'Skills',
            // link: '/skills/',
            autogenerate: {
              directory: 'skills',
            }
          },],
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
        ], {
          exclude: ['404', 'index'],
        }),
				// starlightLinksValidator(),
				 starlightUiTweaks(), starlightCatppuccin({
				  dark: { flavor: "macchiato", accent: "lavender" },
          light: { flavor: "latte", accent: "lavender" },
			})],

			title: "xaa",
			favicon: '/favicon.ico',
			components: {
				
				Head: '#/components/Head.astro',
			
			},
			customCss: [
				// Path to your Tailwind base styles:
				'./src/styles/global.css',
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/xia-aa' }],
			editLink: {
    		baseUrl: 'https://github.com/xia-aa/xia-aa.github.io/edit/main/',
  		},
			lastUpdated: true,
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});