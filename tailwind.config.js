/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['/src/**/**/*.{tsx,jsx}', '/src/**/*.{tsx,jsx}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: [{ tailwindcss: {}, autoprefixer: {} }]
}
