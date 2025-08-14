// 烟雨竹窗 - 蒙德酒馆 脚本文件

// 配置Tailwind自定义颜色和字体
tailwind.config = {
    theme: {
        extend: {
            colors: {
                bamboo: {
                    light: '#d4e6c8',
                    DEFAULT: '#8dae7f',
                    dark: '#5a7247'
                },
                ink: {
                    light: '#707070',
                    DEFAULT: '#333333',
                    dark: '#1a1a1a'
                },
                rice: {
                    light: '#f8f4e3',
                    DEFAULT: '#f0e6d2',
                    dark: '#e6d9be'
                }
            },
            fontFamily: {
                song: ['"Noto Serif SC"', 'serif'],
                kai: ['"Noto Serif SC"', 'serif']
            }
        }
    }
};

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 侧边状态栏展开/收起功能
    const statusBar = document.getElementById('statusBar');
    const mainContent = document.getElementById('mainContent');
    const openStatusBtn = document.getElementById('openStatusBtn');
    const closeStatusBtn = document.getElementById('closeStatusBtn');
    
    // 打开状态栏
    openStatusBtn.addEventListener('click', () => {
        statusBar.classList.remove('w-0');
        statusBar.classList.add('w-72');
        openStatusBtn.classList.add('hidden');
    });
    
    // 关闭状态栏
    closeStatusBtn.addEventListener('click', () => {
        statusBar.classList.remove('w-72');
        statusBar.classList.add('w-0');
        openStatusBtn.classList.remove('hidden');
    });

    // 为行动选项添加点击效果
    const actionButtons = document.querySelectorAll('section:nth-child(4) button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('scale-90', 'opacity-70');
            setTimeout(() => {
                this.classList.remove('scale-90', 'opacity-70');
            }, 150);
            console.log('选择了行动:', this.querySelector('span:first-child').textContent);
        });
    });

    // 自定义指令提交功能
    const customActionInput = document.getElementById('customAction');
    customActionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            alert(`已提交自定义指令: ${this.value}`);
            this.value = '';
        }
    });

    // 页面加载动画
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 150 + index * 200);
    });
});