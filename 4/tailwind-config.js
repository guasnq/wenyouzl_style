// Tailwind CDN 配置（必须在 https://cdn.tailwindcss.com 之前引入）
// 仓库：guasnq/wenyouzl_style  目录：/4

tailwind.config = {
    theme: {
        extend: {
            colors: {
                deepsea: {
                    50: '#e6f0ff',
                    100: '#b3d1ff',
                    200: '#80b3ff',
                    300: '#4d94ff',
                    400: '#1a75ff',
                    500: '#005ce6',
                    600: '#0047b3',
                    700: '#003380',
                    800: '#001f4d',
                    900: '#000a1a',
                },
                coral: {
                    light: '#ff9999',
                    DEFAULT: '#ff6666',
                    dark: '#cc5252',
                },
                pearl: {
                    light: '#f0f8ff',
                    DEFAULT: '#e6f2ff',
                    dark: '#cce0ff',
                }
            },
            fontFamily: {
                fantasy: ['Garamond', 'Georgia', 'Cambria', 'serif'],
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                floatUp: {
                    '0%': { transform: 'translateY(20px)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                lensZoom: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: 0.7 },
                    '50%': { opacity: 1 },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(128, 179, 255, 0.5)' },
                    '50%': { boxShadow: '0 0 20px rgba(128, 179, 255, 0.8)' },
                },
                bubbleRise: {
                    '0%': { transform: 'translateY(100vh) scale(0.3)', opacity: 0.2 },
                    '100%': { transform: 'translateY(-100px) scale(1)', opacity: 0.8 },
                },
                wave: {
                    '0%, 100%': { transform: 'scaleX(1)' },
                    '50%': { transform: 'scaleX(1.05)' },
                },
                shine: {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)' },
                    '50%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.9)' },
                },
                fishSwim: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100vw)' },
                },
                sunlight: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255, 255, 200, 0.5)' },
                    '50%': { boxShadow: '0 0 30px rgba(255, 255, 200, 0.7)' },
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-fast': 'float 4s ease-in-out infinite',
                'bubble-rise': 'bubbleRise 15s linear infinite',
                'bubble-rise-fast': 'bubbleRise 10s linear infinite',
                'bubble-rise-slow': 'bubbleRise 20s linear infinite',
                'wave': 'wave 8s ease-in-out infinite',
                'wave-slow': 'wave 12s ease-in-out infinite',
                'shine': 'shine 4s ease-in-out infinite',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
                'glow': 'glow 3s ease-in-out infinite',
                'fish-swim': 'fishSwim 10s linear infinite',
                'fish-swim-fast': 'fishSwim 7s linear infinite',
                'fish-swim-slow': 'fishSwim 15s linear infinite',
                'sunlight': 'sunlight 15s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'lens-zoom': 'lensZoom 0.5s ease-out',
                'fade-in': 'fadeIn 1s ease-out',
                'float-up': 'floatUp 3s ease-out forwards',
            }
        }
    },
    safelist: [
        // JS 动态添加的类名
        'animate-bubble-rise',
        'animate-bubble-rise-fast',
        'animate-bubble-rise-slow',
        'animate-float',
        'animate-float-slow',
        'animate-float-fast',
        'animate-wave',
        'animate-wave-slow',
        'animate-glow',
        'animate-pulse-soft',
        'animate-sunlight',
        'animate-fade-in',
        'animate-float-up',
        'ml-0',
        'scale-95',
    ]
};
