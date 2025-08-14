// 仙侠风格卡片页面脚本

// 状态栏展开/收起功能
document.addEventListener('DOMContentLoaded', function() {
    const statusBar = document.getElementById('statusBar');
    const statusHandle = document.getElementById('statusHandle');
    const handleIcon = document.getElementById('handleIcon');
    
    statusHandle.addEventListener('click', () => {
        statusBar.classList.toggle('open');
        if (statusBar.classList.contains('open')) {
            handleIcon.classList.remove('fa-chevron-right');
            handleIcon.classList.add('fa-chevron-left');
        } else {
            handleIcon.classList.remove('fa-chevron-left');
            handleIcon.classList.add('fa-chevron-right');
        }
    });
    
    // 创建水墨粒子效果
    createParticles();
    
    // 窗口大小改变时重新创建粒子
    window.addEventListener('resize', createParticles);
    
    // 为行动按钮添加点击效果
    const actionButtons = document.querySelectorAll('.petal-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
});

// 创建水墨粒子效果
function createParticles() {
    const container = document.getElementById('particle-container');
    const particleCount = 30;
    
    // 清除现有粒子
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 随机大小和位置
        const size = Math.random() * 15 + 5;
        const startX = window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4;
        const startY = window.innerHeight * 0.6 + Math.random() * window.innerHeight * 0.3;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        
        // 随机动画
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        const destX = startX + (Math.random() - 0.5) * 300;
        const destY = startY - Math.random() * 400;
        
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        container.appendChild(particle);
    }
}

// 为按钮添加点击波纹效果
function createRippleEffect(event) {
    const button = this;
    // 创建点击时的波纹效果
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.position = 'absolute';
    ripple.style.width = `${Math.max(rect.width, rect.height) * 2}px`;
    ripple.style.height = ripple.style.width;
    ripple.style.left = `${x - parseInt(ripple.style.width) / 2}px`;
    ripple.style.top = `${y - parseInt(ripple.style.height) / 2}px`;
    ripple.style.background = 'rgba(255, 255, 255, 0.2)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '1';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '2';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        ripple.remove();
    }, 700);
}