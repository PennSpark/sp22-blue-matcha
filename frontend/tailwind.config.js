module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        light_matcha: '#DDEDDA',
        matcha: '#DAF5D6',
        light_greentea: '#C6E4BE',
        greentea: '#ACD1A3',
        dark_matcha: '#687d63',
        lemon: '#fffab0',
        light_lemon: '#fffcd8',
        chocolate: '#a67449',
        darkchoco: '#543D28',
        lightchoco: '#fee7cb',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
