// 创建金粉粒子效果
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
    }
}

// 侧边状态栏展开/收起功能
function setupStatusBar() {
    const statusBar = document.getElementById('status-bar');
    const toggleBtn = document.getElementById('toggle-status');
    const mainContent = document.getElementById('main-content');
    const icon = toggleBtn.querySelector('i');
    let isOpen = false;
    
    // 初始状态：状态栏完全隐藏，只露出箭头按钮
    statusBar.style.transform = 'translateX(calc(-100% + 32px))'; // 32px对应缩小后的按钮宽度
    icon.classList.remove('fa-chevron-left');
    icon.classList.add('fa-chevron-right');
    
    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            // 展开状态栏：完全显示
            statusBar.style.transform = 'translateX(0)';
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
            // 为内容区添加左侧边距，避免被状态栏遮挡
            mainContent.style.paddingLeft = '32px';
        } else {
            // 收起状态栏：只显示按钮
            statusBar.style.transform = 'translateX(calc(-100% + 32px))';
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
            // 恢复内容区边距
            mainContent.style.paddingLeft = '';
        }
    });
}

// 行动按钮点击效果
function setupActionButtons() {
    const buttons = document.querySelectorAll('.action-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('scale-95');
            setTimeout(() => {
                button.classList.remove('scale-95');
            }, 200);
            
            console.log('行动选择:', button.querySelector('h3').textContent);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupStatusBar();
    setupActionButtons();
    
    const textElements = document.querySelectorAll('.text-reveal');
    textElements.forEach((el, index) => {
        el.style.animationDelay = `${0.2 + index * 0.1}s`;
    });
});

// Tailwind配置
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1a91a8',
                secondary: '#2dd4bf',
                accent: '#0d9488',
                gold: '#fbbf24',
                goldDark: '#d97706',
                goldLight: '#fde68a',
                dark: '#1e293b',
                light: '#f8fafc'
            },
            fontFamily: {
                fantasy: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif']
            }
        }
    }
};