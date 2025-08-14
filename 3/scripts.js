// 光韵缪斯 - 交互脚本

// 状态栏交互
document.addEventListener('DOMContentLoaded', function() {
    const statusBar = document.getElementById('status-bar');
    const openStatusBtn = document.getElementById('open-status');
    const closeStatusBtn = document.getElementById('close-status');
    
    openStatusBtn.addEventListener('click', () => {
        statusBar.style.width = '320px';
        openStatusBtn.style.opacity = '0';
        setTimeout(() => {
            openStatusBtn.style.display = 'none';
        }, 500);
    });
    
    closeStatusBtn.addEventListener('click', () => {
        statusBar.style.width = '0';
        setTimeout(() => {
            openStatusBtn.style.display = 'block';
            setTimeout(() => {
                openStatusBtn.style.opacity = '1';
            }, 100);
        }, 500);
    });

    // 初始化粒子动画
    createParticles();
    // 每30秒刷新一次粒子，保持动画活力
    setInterval(createParticles, 30000);
    
    addCardInteractions();

    // 为确保动画能运行，添加窗口聚焦时重启动画的逻辑
    window.addEventListener('focus', () => {
        createParticles();
    });
});

// 创建粒子效果
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 80; // 适中数量，确保流畅度
    
    // 清除现有粒子
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        // 基础粒子类，已在CSS中定义动画
        particle.classList.add('particle');
        
        // 随机选择粒子类型（金色或紫色）
        if (i % 2 === 0) {
            particle.classList.add('particle-gold');
        } else {
            particle.classList.add('particle-purple');
        }
        
        // 更大的粒子尺寸，确保可见性
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机位置
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // 随机动画延迟，使粒子运动错开
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// 添加卡片交互效果
function addCardInteractions() {
    const cards = document.querySelectorAll('section');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animationPlayState = 'paused';
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animationPlayState = 'running';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}