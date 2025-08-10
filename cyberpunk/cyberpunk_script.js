// 桌宠自由移动系统
const pet = document.querySelector('.desktop-pet');
const petSpeech = document.querySelector('.pet-speech');

let petX = 100;
let petY = 200;
let targetX = petX;
let targetY = petY;
let isMoving = false;

function getScreenBounds() {
    return {
        width: window.innerWidth - 120,
        height: window.innerHeight - 120
    };
}

function setPetPosition(x, y) {
    const bounds = getScreenBounds();
    petX = Math.max(10, Math.min(bounds.width, x));
    petY = Math.max(10, Math.min(bounds.height, y));

    pet.style.left = petX + 'px';
    pet.style.top = petY + 'px';
}

function getRandomTarget() {
    const bounds = getScreenBounds();
    return {
        x: Math.random() * bounds.width,
        y: Math.random() * bounds.height
    };
}

function moveToTarget() {
    if (isMoving) return;

    isMoving = true;
    const target = getRandomTarget();
    targetX = target.x;
    targetY = target.y;

    const distance = Math.sqrt(Math.pow(targetX - petX, 2) + Math.pow(targetY - petY, 2));
    const duration = Math.min(Math.max(distance * 8, 2000), 5000);

    if (targetX > petX) {
        pet.style.transform = 'scaleX(1)';
    } else {
        pet.style.transform = 'scaleX(-1)';
    }

    pet.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    setPetPosition(targetX, targetY);

    const movingSpeeches = ['我要去那边看看！', '移动中~', '探索新区域...', '换个地方！', '四处逛逛~'];
    petSpeech.textContent = movingSpeeches[Math.floor(Math.random() * movingSpeeches.length)];

    setTimeout(() => {
        isMoving = false;
        pet.style.transform = 'scaleX(1)';
    }, duration);
}

function scheduleNextMove() {
    const interval = Math.random() * 7000 + 8000;
    setTimeout(() => {
        if (!isMoving) {
            moveToTarget();
        }
        scheduleNextMove();
    }, interval);
}

window.addEventListener('resize', () => {
    const bounds = getScreenBounds();
    if (petX > bounds.width || petY > bounds.height) {
        setPetPosition(
            Math.min(petX, bounds.width),
            Math.min(petY, bounds.height)
        );
    }
});

const speeches = [
    '你好！欢迎来到赛博世界!',
    '数据正在传输中...',
    '系统运行正常 ^_^',
    '检测到新的访客！',
    '量子加密已激活',
    '神经链接建立成功',
    '我在这里巡逻呢~',
    '这里的数据流好美',
    '发现什么有趣的了吗?',
    '一起探索赛博空间吧！'
];

let speechIndex = 0;

// 点击桌宠互动 - 笑一下
pet.addEventListener('click', () => {
    const clickSpeeches = [
        '你好！很高兴见到你！',
        '嘿嘿，别戳我啦~',
        '我要去新地方看看了！',
        '跟我一起探索吧！',
        '点我干什么呀？^_^'
    ];
    petSpeech.textContent = clickSpeeches[Math.floor(Math.random() * clickSpeeches.length)];
    petSpeech.style.animation = 'none';
    setTimeout(() => {
        petSpeech.style.animation = 'speechBubble 6s infinite';
    }, 100);

    // 触发大笑动画
    const eyes = pet.querySelector('.smiley-eyes');
    const mouth = pet.querySelector('.smiley-mouth');
    const avatar = pet.querySelector('.pet-avatar');

    eyes.classList.add('big-smile-eyes');
    mouth.classList.add('big-smile');
    avatar.style.animation = 'petPulse 0.3s ease-in-out 3';

    setTimeout(() => {
        eyes.classList.remove('big-smile-eyes');
        mouth.classList.remove('big-smile');
        avatar.style.animation = 'petPulse 2s ease-in-out infinite';
    }, 1000);

    if (!isMoving) {
        setTimeout(moveToTarget, 1500);
    }
});

// 随机闪烁效果
function createGlitch() {
    const elements = document.querySelectorAll('.scene-content, .options-title, .status-title');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];

    randomElement.style.textShadow = '2px 0 #ff0080, -2px 0 #00ff88';
    randomElement.style.textShadow = '2px 0 #ff0080, -2px 0 #00ff88';
    randomElement.style.transform = 'translateX(2px)';

    setTimeout(() => {
        randomElement.style.textShadow = '';
        randomElement.style.transform = '';
    }, 100);
}

// 鼠标跟踪光效
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.width = '4px';
    cursor.style.height = '4px';
    cursor.style.background = '#00ff88';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.boxShadow = '0 0 10px #00ff88';
    cursor.style.zIndex = '9999';
    cursor.style.opacity = '0.7';
    cursor.style.animation = 'fadeOut 0.5s ease-out forwards';

    document.body.appendChild(cursor);

    setTimeout(() => {
        if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
    }, 500);
});

// 添加鼠标跟踪光效的CSS动画
const fadeOutKeyframes = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;

const style = document.createElement('style');
style.textContent = fadeOutKeyframes;
document.head.appendChild(style);

// 确保DOM加载完成后执行所有功能
document.addEventListener('DOMContentLoaded', function () {
    // 初始化桌宠位置
    setPetPosition(petX, petY);

    // 开始调度移动
    scheduleNextMove();

    // 开始随机闪烁效果
    setInterval(createGlitch, Math.random() * 10000 + 5000);

    // 开始定时更换对话
    setInterval(() => {
        if (!isMoving) {
            petSpeech.textContent = speeches[speechIndex];
            speechIndex = (speechIndex + 1) % speeches.length;
        }
    }, 6000);
});
