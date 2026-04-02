/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif']
    },
    container: {
      padding: {
        DEFAULT: '15px'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px'
    },
    extend: {
      colors: {
        primary: '#131424',
        secondary: '#393A47',
        accent: '#F13024'
      },
      backgroundImage: {
        site: "url('/images/hero-bg.png')",
        heroImage: "url('/images/hero-bg.png')",
        heroWork:
          'https://colibriwp.com/blog/wp-content/uploads/2018/07/banner-redimensionat.jpg',
        explosion: 'url("/bg-explosion.png")',
        circles: 'url("/bg-circles.png")',
        circleStar: 'url("/circle-star.svg")',
        rafael: 'url("/rafaelPilarteCyber.png")'
        // site: 'url("/site-bg.svg")'
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite'
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        poppins: [`Poppins`, 'sans-serif'],
        sora: [`Sora`, 'sans-serif']
      }
    }
  },
  container: {
    padding: {
      DEFAULT: '15px'
    }
  },
  plugins: [require('flowbite/plugin')]
}
