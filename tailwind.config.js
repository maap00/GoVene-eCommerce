export default {
    content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
                padding: '1rem',
        },
            fontFamily: {
                 montserrat: ['Montserrat', 'sans-serif'],
        },
        },
    },
    plugins: [
            require('@tailwindcss/typography'),

    ],
}