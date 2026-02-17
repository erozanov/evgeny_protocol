/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				black: '#000',
				white: '#fff',
				'brutal-red': '#ff3e00',
				'brutal-blue': '#00a3ff',
				'brutal-green': '#1aff00',
				'brutal-yellow': '#fff500',
			},
			fontFamily: {
				sans: ['system-ui', 'sans-serif'],
				mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
			},
			boxShadow: {
				'brutal': '8px 8px 0px 0px #000',
				'brutal-sm': '4px 4px 0px 0px #000',
			},
			keyframes: {
				scanline: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(1000%)' },
				},
			},
			animation: {
				scanline: 'scanline 4s linear infinite',
			},
		},
	},
	plugins: [],
}
