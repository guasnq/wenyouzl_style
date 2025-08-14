// 鎏金异梦录 - 脚本文件

// 配置Tailwind自定义颜色和字体
tailwind.config = {
    theme: {
        extend: {
            colors: {
                gold: {
                    light: '#f5d392',
                    DEFAULT: '#d4af37',
                    dark: '#b8860b'
                },
                ebony: {
                    light: '#323232',
                    DEFAULT: '#1a1a1a',
                    dark: '#0a0a0a'
                },
                gem: {
                    blue: '#0070f3',
                    green: '#00c853'
                }
            },
            fontFamily: {
                fantasy: ['Palatino', 'Georgia', 'serif']
            }
        }
    }
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 状态栏切换功能
    const statusBar = document.getElementById('status-bar');
    const toggleButton = document.getElementById('toggle-status');
    const closeButton = document.getElementById('close-status');
    
    // 确保初始状态完全隐藏
    statusBar.classList.add('translate-x-full');
    
    function toggleStatusBar() {
        if (statusBar.classList.contains('translate-x-full')) {
            // 显示状态栏 - 从右侧滑入
            statusBar.classList.remove('translate-x-full');
            statusBar.classList.add('translate-x-0');
            // 按钮变为关闭图标
            toggleButton.innerHTML = '<i class="fa fa-times"></i>';
        } else {
            // 隐藏状态栏 - 滑出右侧
            statusBar.classList.remove('translate-x-0');
            statusBar.classList.add('translate-x-full');
            // 按钮恢复为滑块图标
            toggleButton.innerHTML = '<i class="fa fa-sliders"></i>';
        }
    }
    
    // 点击切换按钮
    toggleButton.addEventListener('click', toggleStatusBar);
    // 点击状态栏内的关闭按钮
    closeButton.addEventListener('click', toggleStatusBar);
    
    // 行动选项点击效果
    const actionOptions = document.querySelectorAll('.grid-cols-3 > div');
    actionOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.add('scale-95', 'opacity-80');
            setTimeout(() => {
                this.classList.remove('scale-95', 'opacity-80');
            }, 200);
        });
    });
});