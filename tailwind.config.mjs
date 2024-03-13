/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				'3xl': '1800px',
			},
			maxWidth: {
				'screen-3xl': '1800px',
			},
			colors: {
				'neutral-dark': '#111928',
				'neutral-light': '#F5F5F5'
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
