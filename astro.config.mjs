// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Liflode Knowledge Base',
			description: 'Operational Knowledge Platform — staff-facing documentation',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Curious-Owl11/liflode-docs-site' }],
			sidebar: [
				{
					label: 'SOPs',
					autogenerate: { directory: 'sops' },
				},
				{
					label: 'Onboarding',
					autogenerate: { directory: 'onboarding' },
				},
				{
					label: 'Training',
					autogenerate: { directory: 'training' },
				},
				{
					label: 'Runbooks',
					autogenerate: { directory: 'runbooks' },
				},
				{
					label: 'Process Docs',
					autogenerate: { directory: 'process' },
				},
			],
		}),
	],
});
