// 泡泡特效JavaScript文件
const bubbleContainer = document.getElementById('bubbleContainer');
const animations = ['float', 'floatLeft', 'floatRight', 'floatCenter'];

// 控制泡泡数量，避免卡顿
let bubbleCount = 0;
const maxBubbles = 12; // 增加最大泡泡数量

function createBubble() {
    // 检查当前泡泡数量
    if (bubbleCount >= maxBubbles) {
        return;
    }

    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    // 随机大小 - 增加尺寸范围
    const size = Math.random() * 60 + 25; // 25px - 85px (增加尺寸)
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';

    // 随机水平位置
    bubble.style.left = Math.random() * 100 + '%';

    // 随机动画持续时间
    const duration = Math.random() * 8 + 6; // 6-14秒
    bubble.style.animationDuration = duration + 's';

    // 随机动画类型
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    bubble.style.animationName = randomAnimation;

    // 随机延迟
    bubble.style.animationDelay = Math.random() * 2 + 's'; // 减少延迟

    // 随机透明度 - 大幅提高透明度
    const opacity = Math.random() * 0.4 + 0.2; // 0.2 - 0.6 (显著提高透明度)
    bubble.style.background = `rgba(255, 255, 255, ${opacity})`;

    // 添加额外的视觉效果
    bubble.style.boxShadow = `0 4px 20px rgba(255, 255, 255, ${opacity * 0.8})`;
    bubble.style.border = `1px solid rgba(255, 255, 255, ${opacity * 0.6})`;

    bubbleContainer.appendChild(bubble);
    bubbleCount++;

    // 动画结束后移除元素
    bubble.addEventListener('animationend', () => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
            bubbleCount--;
        }
    });
}

// 初始化泡泡系统
function initBubbles() {
    // 初始创建更多泡泡
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createBubble();
        }, i * 800); // 每0.8秒创建一个
    }

    // 持续创建新泡泡，增加频率
    setInterval(() => {
        createBubble();
    }, 1500); // 每1.5秒创建一个

    // 每隔一段时间创建一批泡泡
    setInterval(() => {
        for (let i = 0; i < 3; i++) { // 增加批量创建数量
            setTimeout(() => {
                createBubble();
            }, i * 400);
        }
    }, 4000); // 每4秒创建一批
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    if (bubbleContainer) {
        initBubbles();
    }
});

// 性能优化：当页面不可见时暂停泡泡创建
let isPageVisible = true;

document.addEventListener('visibilitychange', function () {
    isPageVisible = !document.hidden;
    if (!isPageVisible) {
        // 页面不可见时，移除所有泡泡
        while (bubbleContainer.firstChild) {
            bubbleContainer.removeChild(bubbleContainer.firstChild);
        }
        bubbleCount = 0;
    }
}); 