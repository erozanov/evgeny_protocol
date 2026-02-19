/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				black: '#000',
				white: '#fff',
				// Current config color
				'brutal-red': '#E63E8D',
				'brutal-blue': '#00a3ff',
				'brutal-green': '#1F8D3D',
				'brutal-yellow': '#F2C100',
			},
			// Добавим стандартную толщину обводки для всего
			borderWidth: {
				'3': '3px',
				'4': '4px',
			},
			fontFamily: {
				sans: ['system-ui', 'sans-serif'],
				mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
			},
			boxShadow: {
				'brutal': '8px 8px 0px 0px #000',
				'brutal-sm': '4px 4px 0px 0px #000',
				// Акцентная тень для выделенных элементов (например, при клике)
				'brutal-hover': '2px 2px 0px 0px #000',
			},
			// Добавляем transition для плавного "нажатия" кнопок
			transitionProperty: {
				'brutal': 'transform, box-shadow',
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