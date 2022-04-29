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
        dark_greentea: '#95B18E',
        dark_matcha: '#687d63',
        lemon: '#fffab0',
        light_lemon: '#fffcd8',
        dark_lemon: '#FFF495',
        chocolate: '#a67449',
        darkchoco: '#543D28',
        lightchoco: '#fee7cb',
      },
      dropShadow: {
        'light-glow': '0 5px 5px rgba(255, 255, 255, 0.65)',
        glow: '0 5px 5px rgba(255, 255, 255, 1.0)',
        'title': '0 7px 4px rgba(56, 43, 23, 0.6)',
        'svg_lighter': '0 15px 10px rgba(56, 43, 23, 0.4)',
        'svg': '0 15px 10px rgba(56, 43, 23, 0.7)',
        'svg_darker': '0 15px 10px rgba(56, 43, 23, 0.85)',
      },
      boxShadow: {
        'darker': '0 10px 25px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'table': "url('../imgs/svg/table.svg')",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
}
