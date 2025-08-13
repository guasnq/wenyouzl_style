// 蒙德城·天使的馈赠酒馆 - 脚本文件

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 初始化樱花效果
    initSakuraEffect();

    // 初始化状态栏功能
    initStatusBar();
});

// 生成樱花飘落效果
function createSakura() {
    const container = document.getElementById('sakura-container');
    if (!container) return;

    const sakura = document.createElement('div');
    sakura.classList.add('sakura');

    // 随机大小
    const size = Math.random() * 8 + 3;
    sakura.style.width = `${size}px`;
    sakura.style.height = `${size}px`;

    // 随机位置
    sakura.style.left = `${Math.random() * 100}vw`;
    sakura.style.top = `-${size}px`;

    // 随机不透明度
    sakura.style.opacity = Math.random() * 0.5 + 0.3;

    // 随机动画持续时间
    const duration = Math.random() * 15 + 10;
    sakura.style.animationDuration = `${duration}s`;

    container.appendChild(sakura);

    // 动画结束后移除元素
    setTimeout(() => {
        if (sakura && sakura.parentNode) {
            sakura.remove();
        }
    }, duration * 1000);
}

// 初始化樱花效果
function initSakuraEffect() {
    // 定时生成樱花
    setInterval(createSakura, 300);

    // 初始化生成一些樱花
    for (let i = 0; i < 15; i++) {
        createSakura();
    }
}

// 初始化状态栏功能
function initStatusBar() {
    const statusBar = document.getElementById('status-bar');
    const toggleBtn = document.getElementById('toggle-status');
    const toggleIcon = document.getElementById('toggle-icon');
    const mainContent = document.getElementById('main-content');

    if (!statusBar || !toggleBtn || !toggleIcon || !mainContent) return;

    let statusOpen = false;

    toggleBtn.addEventListener('click', () => {
        statusOpen = !statusOpen;

        if (statusOpen) {
            statusBar.style.width = '280px';
            toggleIcon.classList.remove('fa-chevron-left');
            toggleIcon.classList.add('fa-chevron-right');
            mainContent.style.marginRight = '280px';
            toggleBtn.style.right = '284px';
        } else {
            statusBar.style.width = '0';
            toggleIcon.classList.remove('fa-chevron-right');
            toggleIcon.classList.add('fa-chevron-left');
            mainContent.style.marginRight = '0';
            toggleBtn.style.right = '4px';
        }
    });

    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        if (statusOpen) {
            toggleBtn.style.right = '284px';
        } else {
            toggleBtn.style.right = '4px';
        }
    });
}

// 添加交互功能
function addInteractiveFeatures() {
    // 为行动选项添加点击事件
    const actionOptions = document.querySelectorAll('.bg-pinkLight\\/30');
    actionOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            handleActionChoice(index);
        });
    });

    // 为自定义指令输入框添加事件
    const customInput = document.querySelector('input[placeholder="输入你的行动..."]');
    if (customInput) {
        customInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleCustomAction(customInput.value);
                customInput.value = '';
            }
        });
    }
}

// 处理行动选择
function handleActionChoice(choiceIndex) {
    const actions = [
        { name: '点杯苹果酒与查尔斯攀谈', cost: 120, info: 10 },
        { name: '主动接近神秘兜帽客', pressure: 15, charm: 65 },
        { name: '静坐收集情报', investigation: 5, time: 1 }
    ];

    const action = actions[choiceIndex];
    console.log(`选择了行动: ${action.name}`);

    // 这里可以添加更多的游戏逻辑
    // 比如更新状态、显示结果等
}

// 处理自定义行动
function handleCustomAction(action) {
    if (action.trim()) {
        console.log(`执行自定义行动: ${action}`);
        // 这里可以添加自定义行动的处理逻辑
    }
}

// 页面完全加载后初始化交互功能
window.addEventListener('load', function () {
    addInteractiveFeatures();
});

// 导出函数供外部使用（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createSakura,
        initSakuraEffect,
        initStatusBar,
        handleActionChoice,
        handleCustomAction
    };
}
