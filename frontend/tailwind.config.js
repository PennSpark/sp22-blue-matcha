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
        chocolate: '#a67449',
        darkchoco: '#543D28',
        lightchoco: '#fee7cb',
      },
      dropShadow: {
        'light-glow': '0 5px 5px rgba(255, 255, 255, 0.65)',
        glow: '0 5px 5px rgba(255, 255, 255, 1.0)',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
}
