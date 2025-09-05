import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'sidebar-ring': 'var(--sidebar-ring)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
        'sidebar-accent': 'var(--sidebar-accent)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        sidebar: 'var(--sidebar)',
        'chart-5': 'var(--chart-5)',
        'chart-4': 'var(--chart-4)',
        'chart-3': 'var(--chart-3)',
        'chart-2': 'var(--chart-2)',
        'chart-1': 'var(--chart-1)',
        ring: 'var(--ring)',
        input: 'var(--input)',
        border: 'var(--border)',
        destructive: 'var(--destructive)',
        'accent-foreground': 'var(--accent-foreground)',
        accent: 'var(--accent)',
        'muted-foreground': 'var(--muted-foreground)',
        muted: 'var(--muted)',
        'secondary-foreground': 'var(--secondary-foreground)',
        secondary: 'var(--secondary)',
        'primary-foreground': 'var(--primary-foreground)',
        primary: 'var(--primary)',
        'popover-foreground': 'var(--popover-foreground)',
        popover: 'var(--popover)',
        'card-foreground': 'var(--card-foreground)',
        card: 'var(--card)',
      },
      fontFamily: {
        sans: 'var(--font-geist-sans)',
        mono: 'var(--font-geist-mono)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
