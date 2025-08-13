// 创建动态云雾背景
function createClouds() {
    const container = document.getElementById('clouds');
    const cloudCount = 15;

    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');

        // 随机大小和位置
        const size = Math.random() * 200 + 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 60;
        const duration = Math.random() * 100 + 100;

        cloud.style.width = `${size}px`;
        cloud.style.height = `${size}px`;
        cloud.style.top = `${posY}%`;
        cloud.style.animationDelay = `${delay}s`;
        cloud.style.animationDuration = `${duration}s`;

        container.appendChild(cloud);
    }
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
    createClouds();

    // 为元素添加顺序动画效果
    const elements = [
        document.querySelector('.scene-rendering'),
        document.querySelector('.narration'),
        document.querySelector('.dynamic-events'),
        document.querySelector('.action-options'),
        document.querySelector('.status-info')
    ];

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, 300 * index);
    });

    // 确保滚动正常工作的额外处理
    document.querySelector('.main-container').style.height = 'auto';
    document.body.style.overflow = 'auto';
});
