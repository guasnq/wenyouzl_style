// 蒙德城·天使的馈赠酒馆 脚本文件

// Tailwind配置
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#6C5CE7',
                secondary: '#0984E3',
                accent: '#FDCB6E',
                dark: '#2D3436',
                light: '#DFE6E9',
            },
            fontFamily: {
                fantasy: ['Garamond', 'Georgia', 'serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'wave': 'wave 8s ease-in-out infinite',
                'fall': 'fall 15s linear infinite',
                'meteor': 'meteor 1.5s linear forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 15px rgba(108, 92, 231, 0.7), 0 0 30px rgba(9, 132, 227, 0.5)' },
                    '50%': { boxShadow: '0 0 25px rgba(108, 92, 231, 0.9), 0 0 50px rgba(9, 132, 227, 0.7)' },
                },
                wave: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                fall: {
                    '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: 0 },
                    '10%': { opacity: 1 },
                    '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: 0 },
                },
                meteor: {
                    '0%': {
                        transform: 'translate(-50%, -50%) rotate(-45deg) scale(0)',
                        opacity: 0
                    },
                    '20%': {
                        transform: 'translate(-50%, -50%) rotate(-45deg) scale(1)',
                        opacity: 1
                    },
                    '90%': {
                        opacity: 1
                    },
                    '100%': {
                        transform: 'translate(calc(-50% + 1000px), calc(-50% + 1000px)) rotate(-45deg) scale(1)',
                        opacity: 0
                    }
                }
            }
        }
    }
};

// 侧边状态栏展开/收起功能
function initStatusBar() {
    const statusBar = document.getElementById('status-bar');
    const statusContent = document.getElementById('status-content');
    const toggleStatus = document.getElementById('toggle-status');
    const mainContent = document.querySelector('main');

    let statusExpanded = false;

    toggleStatus.addEventListener('click', () => {
        statusExpanded = !statusExpanded;

        if (statusExpanded) {
            // 展开时宽度调整为w-64（更紧凑的展开宽度）
            statusBar.classList.remove('w-12');
            statusBar.classList.add('w-64');
            statusContent.classList.remove('hidden');
            mainContent.classList.remove('ml-12');
            mainContent.classList.add('ml-64');
        } else {
            // 收起时恢复窄宽度w-12
            statusBar.classList.remove('w-64');
            statusBar.classList.add('w-12');
            statusContent.classList.add('hidden');
            mainContent.classList.remove('ml-64');
            mainContent.classList.add('ml-12');
        }
    });
}

// 滚动显示动画
function initScrollReveal() {
    function checkScroll() {
        const elements = document.querySelectorAll('.scroll-reveal');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    // 初始检查
    checkScroll();
}

// 创建粒子效果
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');

        // 随机大小
        const size = Math.random() * 3 + 1;

        // 随机位置
        const posX = Math.random() * 100;

        // 随机颜色
        const colors = ['#6C5CE7', '#0984E3', '#FDCB6E', '#DFE6E9'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // 随机动画延迟
        const delay = Math.random() * 15;

        // 设置粒子样式
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            top: -10px;
            left: ${posX}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: fall 15s linear infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
        `;

        particlesContainer.appendChild(particle);
    }
}

// 创建花瓣效果
function createPetals() {
    const petalContainer = document.getElementById('petal-container');

    // 定时创建花瓣
    setInterval(() => {
        if (document.getElementById('petal-container') && petalContainer.children.length < 10) {
            const petal = document.createElement('div');

            // 随机大小
            const size = Math.random() * 10 + 5;

            // 随机位置
            const posX = Math.random() * 100;
            const posY = -10;

            // 随机颜色
            const colors = ['#FDCB6E', '#6C5CE7', '#0984E3'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // 随机动画时间和延迟
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;

            // 设置花瓣样式
            petal.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: 50% 0 50% 0;
                top: ${posY}px;
                left: ${posX}%;
                opacity: ${Math.random() * 0.3 + 0.1};
                transform: rotate(${Math.random() * 360}deg);
                animation: fall ${duration}s linear forwards;
                animation-delay: ${delay}s;
                pointer-events: none;
            `;

            petalContainer.appendChild(petal);

            // 花瓣消失后移除元素
            setTimeout(() => {
                if (petal.parentNode === petalContainer) {
                    petalContainer.removeChild(petal);
                }
            }, (duration + delay) * 1000);
        }
    }, 2000);
}

// 创建流星效果
function createMeteor() {
    const meteorContainer = document.getElementById('meteor-container');

    // 随机位置 (顶部区域)
    const startX = Math.random() * 50 + 20; // 20% - 70%
    const startY = Math.random() * 20; // 0% - 20%

    // 随机动画持续时间
    const duration = Math.random() * 1 + 0.5;

    // 创建流星容器
    const meteor = document.createElement('div');
    meteor.style.cssText = `
        position: absolute;
        top: ${startY}%;
        left: ${startX}%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 2;
    `;

    // 创建流星头部
    const meteorHead = document.createElement('div');
    meteorHead.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background-color: #FDCB6E;
        border-radius: 50%;
        box-shadow: 0 0 10px 2px rgba(253, 203, 110, 0.8);
        transform: translate(-50%, -50%);
    `;

    // 创建流星尾迹
    const trailLength = Math.random() * 100 + 50; // 50px - 150px
    const meteorTrail = document.createElement('div');
    meteorTrail.classList.add('meteor-trail');
    meteorTrail.style.cssText = `
        width: ${trailLength}px;
        height: 2px;
        left: 0;
        top: 0;
        transform: rotate(-45deg) translateX(-100%);
    `;

    meteor.appendChild(meteorHead);
    meteor.appendChild(meteorTrail);
    meteorContainer.appendChild(meteor);

    // 应用动画
    meteor.style.animation = `meteor ${duration}s linear forwards`;

    // 流星消失后移除元素
    setTimeout(() => {
        if (meteor.parentNode === meteorContainer) {
            meteorContainer.removeChild(meteor);
        }
    }, duration * 1000);
}

// 定时创建流星
function scheduleMeteors() {
    // 立即创建一个流星
    createMeteor();

    // 之后每3-8秒创建一个流星
    setInterval(() => {
        createMeteor();
    }, Math.random() * 5000 + 3000);
}

// 页面加载完成后初始化效果
window.addEventListener('load', () => {
    initStatusBar();
    initScrollReveal();
    createParticles();
    createPetals();
    scheduleMeteors();
});