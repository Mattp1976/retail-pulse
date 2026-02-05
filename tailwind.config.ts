import type { Config } from "tailwindcss";

const config: Config = {
    content: [
          "./app/**/*.{js,ts,jsx,tsx,mdx}",
          "./components/**/*.{js,ts,jsx,tsx,mdx}",
        ],
    theme: {
          extend: {
                  fontFamily: {
                            sans: [
                                        '-apple-system',
                                        'BlinkMacSystemFont',
                                        '"SF Pro Display"',
                                        '"SF Pro Text"',
                                        '"Segoe UI"',
                                        'Roboto',
                                        '"Helvetica Neue"',
                                        'Arial',
                                        'sans-serif',
                                      ],
                            display: [
                                        '-apple-system',
                                        'BlinkMacSystemFont',
                                        '"SF Pro Display"',
                                        '"Segoe UI"',
                                        'Roboto',
                                        'sans-serif',
                                      ],
                  },
                  colors: {
                            apple: {
                                        bg: '#FFFFFF',
                                        'bg-secondary': '#F5F5F7',
                                        'bg-tertiary': '#E8E8ED',
                                        text: '#1D1D1F',
                                        'text-secondary': '#86868B',
                                        border: '#D2D2D7',
                                        accent: '#0071E3',
                                        'accent-hover': '#0077ED',
                                        danger: '#FF3B30',
                                        success: '#34C759',
                            },
                  },
                  boxShadow: {
                            'apple-xs': '0 1px 3px rgba(0, 0, 0, 0.08)',
                            'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.12)',
                            'apple-md': '0 8px 24px rgba(0, 0, 0, 0.15)',
                            'apple-lg': '0 16px 40px rgba(0, 0, 0, 0.12)',
                            'apple-card': '0 4px 12px rgba(0, 0, 0, 0.08)',
                            'apple-button': '0 2px 8px rgba(0, 0, 0, 0.1)',
                  },
                  borderRadius: {
                            'apple-sm': '8px',
                            'apple': '12px',
                            'apple-md': '16px',
                            'apple-lg': '20px',
                            'apple-xl': '24px',
                  },
                  animation: {
                            'fade-in': 'fadeIn 300ms ease-out',
                            'slide-up': 'slideUp 300ms ease-out',
                            'scale-in': 'scaleIn 200ms ease-out',
                            'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
                  },
                  keyframes: {
                            fadeIn: {
                                        '0%': { opacity: '0' },
                                        '100%': { opacity: '1' },
                            },
                            slideUp: {
                                        '0%': { opacity: '0', transform: 'translateY(8px)' },
                                        '100%': { opacity: '1', transform: 'translateY(0)' },
                            },
                            scaleIn: {
                                        '0%': { opacity: '0', transform: 'scale(0.95)' },
                                        '100%': { opacity: '1', transform: 'scale(1)' },
                            },
                            pulseSubtle: {
                                        '0%, 100%': { opacity: '1' },
                                        '50%': { opacity: '0.7' },
                            },
                  },
                  transitionDuration: {
                            '250': '250ms',
                            '350': '350ms',
                  },
                  transitionTimingFunction: {
                            'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                  },
          },
    },
    plugins: [],
};

export default config;
