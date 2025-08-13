// 星穹冒险 - 蒙德酒馆 脚本文件

// Tailwind CSS 配置
tailwind.config = {
    theme: {
        extend: {
            colors: {
                nebula: {
                    dark: '#0B0F29',
                    blue: '#1A2B63',
                    purple: '#4A1975',
                    pink: '#8C21A1',
                    light: '#C142A0'
                },
                star: {
                    white: '#E0E0FF',
                    blue: '#94BFFF',
                    purple: '#C094FF',
                    gold: '#FFE094'
                }
            },
            fontFamily: {
                fantasy: ['Garamond', 'Georgia', 'serif']
            },
            animation: {
                'nebula-spin': 'spin 120s linear infinite',
                'meteor-flow': 'meteor 8s linear infinite',
                'star-pulse': 'pulse 3s ease-in-out infinite',
                'light-climb': 'climb 4s linear infinite',
                'orbit': 'orbit 20s linear infinite',
                'glow-pulse': 'glow 3s ease-in-out infinite',
                'stardust': 'stardust 0.8s ease-out forwards',
                'track-flow': 'trackFlow 15s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'twinkle-slow': 'twinkle 5s infinite ease-in-out'
            },
            keyframes: {
                meteor: {
                    '0%': { transform: 'translateX(-100%) translateY(100%)' },
                    '100%': { transform: 'translateX(100%) translateY(-100%)' }
                },
                climb: {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(-100%)' }
                },
                orbit: {
                    '0%': { transform: 'rotate(0deg) translateX(20px) rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg) translateX(20px) rotate(-360deg)' }
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(148, 191, 255, 0.7), 0 0 20px rgba(148, 191, 255, 0.5)' },
                    '50%': { boxShadow: '0 0 20px rgba(192, 148, 255, 0.9), 0 0 30px rgba(192, 148, 255, 0.7)' }
                },
                stardust: {
                    '0%': { transform: 'scale(0)', opacity: 1 },
                    '100%': { transform: 'scale(1.5)', opacity: 0 }
                },
                trackFlow: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '100% 0%' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                twinkle: {
                    '0%, 100%': { opacity: 0.3 },
                    '50%': { opacity: 1 }
                }
            }
        }
    }
};

// 创建随机星星背景
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.8 + 0.2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;

        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: white;
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            opacity: ${opacity};
            animation: twinkle 3s infinite ease-in-out ${delay}s;
        `;

        starsContainer.appendChild(star);
    }
}

// 添加星尘特效
function createStardust() {
    const container = document.getElementById('stardust-container');
    if (!container) return;

    setInterval(() => {
        const stardustCount = 15;
        for (let i = 0; i < stardustCount; i++) {
            const dust = document.createElement('div');
            const size = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const color = ['#94BFFF', '#C094FF', '#E0E0FF'][Math.floor(Math.random() * 3)];

            dust.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: 50%;
                left: ${left}%;
                top: ${top}%;
                animation: stardust 0.8s ease-out forwards;
            `;

            container.appendChild(dust);

            setTimeout(() => {
                dust.remove();
            }, 800);
        }
    }, 3000);
}

// 星轨位移动画
function setupStarfieldAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes translate {
            0% { transform: translate(0, 0); }
            25% { transform: translate(-5px, 5px); }
            50% { transform: translate(-10px, 0); }
            75% { transform: translate(-5px, -5px); }
            100% { transform: translate(0, 0); }
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// 选项点击效果
function setupOptionInteraction() {
    const options = document.querySelectorAll('.option-item');
    options.forEach(option => {
        option.addEventListener('click', function () {
            options.forEach(opt => opt.classList.remove('border-star-gold', 'border-glow', 'scale-105'));
            this.classList.add('border-star-gold', 'border-glow', 'scale-105');
        });
    });
}

// 状态栏交互
function setupStatusBar() {
    const toggle = document.getElementById('status-toggle');
    const panel = document.querySelector('.sidebar-panel');

    if (!toggle || !panel) return;

    toggle.addEventListener('change', function () {
        if (this.checked) {
            panel.style.transform = 'translateX(0)';
            panel.classList.add('show');
        } else {
            panel.style.transform = 'translateX(100%)';
            panel.classList.remove('show');
        }
    });
}

// 添加额外的背景动态星星
function addFloatingStars() {
    const body = document.body;
    const count = 10;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const color = ['#E0E0FF', '#94BFFF', '#C094FF'][Math.floor(Math.random() * 3)];

        star.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            opacity: 0.6;
            z-index: 0;
            animation: float ${Math.random() * 4 + 6}s ease-in-out infinite ${delay}s,
                       twinkle-slow 5s infinite ease-in-out ${delay + 1}s;
        `;

        body.appendChild(star);
    }
}

// 页面加载完成后初始化所有功能
window.addEventListener('load', () => {
    createStars();
    createStardust();
    setupStarfieldAnimation();
    setupOptionInteraction();
    setupStatusBar();
    addFloatingStars();
});

// 导出函数供外部使用（如果需要）
window.GameFunctions = {
    createStars,
    createStardust,
    setupStarfieldAnimation,
    setupOptionInteraction,
    setupStatusBar,
    addFloatingStars
};
