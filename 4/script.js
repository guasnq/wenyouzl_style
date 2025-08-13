// 蒙德城·天使的馈赠酒馆 - 脚本文件

// 创建背景光效
function createLightRays() {
    const container = document.getElementById('light-rays');
    const rayCount = 6;

    for (let i = 0; i < rayCount; i++) {
        const ray = document.createElement('div');
        ray.classList.add('light-ray');

        // 随机大小和位置
        const width = Math.random() * 100 + 50;
        const height = window.innerHeight * 0.8;
        const left = (i * 100) % window.innerWidth;

        ray.style.width = `${width}px`;
        ray.style.height = `${height}px`;
        ray.style.left = `${left}px`;
        ray.style.top = '0';
        ray.style.transform = `rotate(${i * 15}deg)`;

        // 随机动画延迟
        ray.style.animationDelay = `${Math.random() * 3}s`;

        container.appendChild(ray);
    }
}

// 创建漂浮装饰
function createFloatingObjects() {
    const container = document.getElementById('floating-objects');
    const objectCount = 8;
    const symbols = ['⚓', '🌊', '🐠', '🦈', '💧', '🌀', '🔱', '🐚'];

    for (let i = 0; i < objectCount; i++) {
        const obj = document.createElement('div');
        obj.classList.add('floating-object');

        // 随机符号和大小
        obj.textContent = symbols[i % symbols.length];
        const size = Math.random() * 20 + 12;
        obj.style.fontSize = `${size}px`;

        // 随机位置
        obj.style.left = `${Math.random() * 100}%`;
        obj.style.top = `${Math.random() * 100}%`;

        // 随机动画
        const animationType = i % 3 === 0 ? 'float-slow' : (i % 3 === 1 ? 'float' : 'float-fast');
        obj.classList.remove('float', 'float-slow', 'float-fast');
        obj.classList.add(animationType);

        // 随机不透明度
        obj.style.opacity = (Math.random() * 0.5 + 0.2).toString();

        container.appendChild(obj);
    }
}

// 创建背景气泡（增加多样性）
function createBubbles() {
    const container = document.getElementById('bubbles-container');
    const bubbleCount = 70;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // 随机大小
        const size = Math.random() * 40 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // 随机位置
        bubble.style.left = `${Math.random() * 100}%`;

        // 随机动画速度
        let animationClass = 'animate-bubble-rise';
        if (i % 3 === 0) animationClass = 'animate-bubble-rise-fast';
        if (i % 3 === 1) animationClass = 'animate-bubble-rise-slow';
        bubble.classList.add(animationClass);

        // 随机动画延迟
        const delay = Math.random() * 15;
        bubble.style.animationDelay = `${delay}s`;

        // 部分气泡添加发光效果
        if (i % 5 === 0) {
            bubble.classList.add('bubble-glow');
        }

        container.appendChild(bubble);
    }
}

// 创建珊瑚区小气泡
function createCoralBubbles() {
    const container = document.getElementById('coral-bubbles');
    const bubbleCount = 40;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // 小气泡
        const size = Math.random() * 10 + 3;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // 底部随机位置
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = '0';
        bubble.style.transform = 'translateY(0) scale(0.5)';

        // 随机动画延迟和持续时间
        const delay = Math.random() * 5;
        const duration = Math.random() * 8 + 5;
        bubble.style.animation = `bubbleRise ${duration}s linear infinite`;
        bubble.style.animationDelay = `${delay}s`;

        container.appendChild(bubble);
    }
}

// 侧边栏切换
function setupSidebarToggle() {
    const entranceBtn = document.getElementById('status-entrance');
    const sidebar = document.getElementById('status-sidebar');
    const statusContent = sidebar.querySelector('.overflow-y-auto');
    let isOpen = false;

    // 确保状态栏内容始终从顶部开始显示
    function resetSidebarScroll() {
        statusContent.scrollTop = 0;
    }

    entranceBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        if (isOpen) {
            // 打开状态栏 - 滑入视野
            sidebar.classList.remove('-ml-64');
            sidebar.classList.add('ml-0');
        } else {
            // 关闭状态栏 - 滑出视野
            sidebar.classList.remove('ml-0');
            sidebar.classList.add('-ml-64');
        }

        resetSidebarScroll();
    });
}

// 为行动按钮添加增强的交互效果
function setupActionButtons() {
    const buttons = document.querySelectorAll('.shell-button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            // 按钮点击动画
            button.classList.add('scale-95');
            setTimeout(() => {
                button.classList.remove('scale-95');
            }, 200);

            // 添加点击波纹效果
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';

            // 计算点击位置
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = `${Math.max(rect.width, rect.height)}px`;
            ripple.style.height = `${Math.max(rect.width, rect.height)}px`;

            button.appendChild(ripple);

            // 移除波纹元素
            setTimeout(() => {
                ripple.remove();
            }, 600);

            console.log('选择了行动:', button.textContent.trim().substring(0, 1));
        });
    });

    // 自定义指令输入框
    const customInput = document.getElementById('custom-action');
    customInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && customInput.value.trim()) {
            console.log('自定义指令:', customInput.value);
            // 添加输入确认动画
            customInput.classList.add('scale-95');
            setTimeout(() => {
                customInput.classList.remove('scale-95');
                customInput.value = '';
            }, 150);
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 确保页面从顶部开始
    window.scrollTo(0, 0);

    // 创建丰富的背景动态元素
    createLightRays();
    createFloatingObjects();
    createBubbles();
    createCoralBubbles();

    setupSidebarToggle();
    setupActionButtons();
});
