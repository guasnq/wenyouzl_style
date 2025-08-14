// 光韵缪斯 - Tailwind配置文件

tailwind.config = {
    theme: {
        extend: {
            colors: {
                'deep-indigo': '#2D1B69',
                'rich-purple': '#4A2545',
                'golden': '#D4AF37',
            },
            animation: {
                'float': 'float 4s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shine': 'shine 4s linear infinite',
                'particle-move': 'particle-move 6s ease-in-out infinite',
                'particle-move-alt': 'particle-move-alt 7s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)' },
                    '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.9)' },
                },
                shine: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                // 主要粒子动画
                'particle-move': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: 0 },
                    '10%': { opacity: 0.8 },
                    '90%': { opacity: 0.8 },
                    '100%': { transform: 'translate(100px, -200px) rotate(360deg)', opacity: 0 },
                },
                // 交替粒子动画，方向不同
                'particle-move-alt': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: 0 },
                    '10%': { opacity: 0.8 },
                    '90%': { opacity: 0.8 },
                    '100%': { transform: 'translate(-100px, -150px) rotate(-360deg)', opacity: 0 },
                }
            }
        }
    }
}