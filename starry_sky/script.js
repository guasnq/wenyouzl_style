// 显示消息
function showMessage(text) {
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    messageText.textContent = text;
    messageBox.style.display = 'block';
    
    // 移动端优化：5秒后自动关闭
    setTimeout(() => {
        if (messageBox.style.display === 'block') {
            hideMessage();
        }
    }, 5000);
}

// 隐藏消息
function hideMessage() {
    const messageBox = document.getElementById('message-box');
    messageBox.style.display = 'none';
}

// 点击外部关闭消息框
document.addEventListener('click', function(event) {
    const messageBox = document.getElementById('message-box');
    if (messageBox.style.display === 'block' && 
        !messageBox.contains(event.target)) {
        hideMessage();
    }
});

// 移动端支持触摸事件
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// 添加更多随机星星
function createStars() {
    const starsContainer = document.querySelector('.floating-stars');
    const starCount = window.innerWidth < 768 ? 60 : 100; // 移动端减少星星数量
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        
        star.style.position = 'absolute';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.animation = `starPulse ${5 + Math.random() * 5}s infinite alternate`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// 创建流星效果
function createMeteors() {
    const container = document.querySelector('.meteors-container');
    const meteorCount = window.innerWidth < 768 ? 5 : 10; // 移动端少一些流星
    
    // 清除现有流星（如果需要重新生成）
    container.innerHTML = '';
    
    for (let i = 0; i < meteorCount; i++) {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        
        // 随机属性
        const width = Math.random() * 80 + 40; // 40-120px
        const height = Math.random() * 3 + 1; // 1-4px
        const top = Math.random() * 50; // 0-50% 顶部区域
        const right = Math.random() * 30 + 70; // 70-100% 右侧区域
        const duration = Math.random() * 2 + 1; // 1-3秒
        const delay = Math.random() * 10; // 0-10秒延迟
        const opacity = Math.random() * 0.5 + 0.5; // 0.5-1透明度
        
        // 设置样式
        meteor.style.width = `${width}px`;
        meteor.style.height = `${height}px`;
        meteor.style.top = `${top}%`;
        meteor.style.right = `${right}%`;
        meteor.style.animationDuration = `${duration}s`;
        meteor.style.animationDelay = `${delay}s`;
        meteor.style.opacity = opacity;
        
        container.appendChild(meteor);
    }
}

// 页面加载完成后创建星星和流星
window.addEventListener('load', () => {
    createStars();
    createMeteors();
    
    // 定期生成新的流星群，增加随机性
    setInterval(createMeteors, 15000); // 每15秒刷新一次流星
});