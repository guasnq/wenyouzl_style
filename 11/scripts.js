// 星蝶幻域 - 蒙德城卡片 脚本文件

// 状态栏控制
document.addEventListener('DOMContentLoaded', () => {
    const statusBar = document.getElementById('statusBar');
    const statusBarToggle = document.getElementById('statusBarToggle');
    const closeStatusBar = document.getElementById('closeStatusBar');
    
    statusBarToggle.addEventListener('click', () => {
        statusBar.classList.toggle('-translate-x-full');
    });
    
    closeStatusBar.addEventListener('click', () => {
        statusBar.classList.add('-translate-x-full');
    });
    
    // 星光效果动画
    createStars();
});

// 星光效果动画
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'fixed inset-0 pointer-events-none z-10';
    document.body.appendChild(starsContainer);
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        
        star.className = 'absolute rounded-full bg-white opacity-0 animate-pulse';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
}