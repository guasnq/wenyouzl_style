// 霜风裹挟晶光 - Tailwind配置
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ice: {
          blue: '#a8dadd',
          light: '#e0f7fa',
          dark: '#4a6572'
        },
        frost: {
          gold: '#f0e6d2',
          pink: '#ff9aa2',
          crystal: '#f8f9fa'
        }
      },
      fontFamily: {
        fantasy: ['Garamond', 'Georgia', 'serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'crackle': 'crackle 3s ease-in-out infinite',
        'drift': 'drift 15s linear infinite',
        'twitch': 'twitch 2s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(168, 218, 221, 0.5), 0 0 10px rgba(168, 218, 221, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(168, 218, 221, 0.8), 0 0 20px rgba(168, 218, 221, 0.5), 0 0 30px rgba(168, 218, 221, 0.3)' }
        },
        crackle: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        drift: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' }
        },
        twitch: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(0.5deg)' },
          '75%': { transform: 'rotate(-0.5deg)' }
        }
      }
    }
  }
}