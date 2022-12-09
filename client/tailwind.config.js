/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontSize: {
            'xs': '.75rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '4xl': '2.5rem',
            '3xl': '1.875rem',
            '8xl': '6rem',
            '7xl': '5rem',
            '10xl': '10rem',
            '5xl': '3rem',
        },
        extend: {},
    },
    plugins: [],
}
