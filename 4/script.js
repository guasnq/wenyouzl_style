/* 星穹冒险 - 蒙德酒馆 交互脚本 */

/* ---------- 背景动效 ---------- */
function createLightRays() {
  const container = document.getElementById('light-rays');
  if (!container) return;
  const rayCount = 6;
  for (let i = 0; i < rayCount; i++) {
    const ray = document.createElement('div');
    ray.classList.add('light-ray');
    const width = Math.random() * 100 + 50;
    const height = window.innerHeight * 0.8;
    const left = (i * 100) % window.innerWidth;
    ray.style.width = `${width}px`;
    ray.style.height = `${height}px`;
    ray.style.left = `${left}px`;
    ray.style.top = '0';
    ray.style.transform = `rotate(${i * 15}deg)`;
    ray.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(ray);
  }
}

function createFloatingObjects() {
  const container = document.getElementById('floating-objects');
  if (!container) return;
  const objectCount = 8;
  const symbols = ['⚓', '🌊', '🐠', '🦈', '💧', '🌀', '🔱', '🐚'];
  for (let i = 0; i < objectCount; i++) {
    const obj = document.createElement('div');
    obj.classList.add('floating-object');
    obj.textContent = symbols[i % symbols.length];
    const size = Math.random() * 20 + 12;
    obj.style.fontSize = `${size}px`;
    obj.style.left = `${Math.random() * 100}%`;
    obj.style.top = `${Math.random() * 100}%`;
    const animationType = i % 3 === 0 ? 'float-slow' : (i % 3 === 1 ? 'float' : 'float-fast');
    obj.classList.add(animationType);
    obj.style.opacity = (Math.random() * 0.5 + 0.2).toString();
    container.appendChild(obj);
  }
}

function createBubbles() {
  const container = document.getElementById('bubbles-container');
  if (!container) return;
  const bubbleCount = 70;
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 40 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    let animationClass = 'animate-bubble-rise';
    if (i % 3 === 0) animationClass = 'animate-bubble-rise-fast';
    if (i % 3 === 1) animationClass = 'animate-bubble-rise-slow';
    bubble.classList.add(animationClass);
    bubble.style.animationDelay = `${Math.random() * 15}s`;
    if (i % 5 === 0) bubble.classList.add('bubble-glow');
    container.appendChild(bubble);
  }
}

function createCoralBubbles() {
  const container = document.getElementById('coral-bubbles');
  if (!container) return;
  const bubbleCount = 40;
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 10 + 3;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.bottom = '0';
    bubble.style.transform = 'translateY(0) scale(0.5)';
    const delay = Math.random() * 5;
    const duration = Math.random() * 8 + 5;
    bubble.style.animation = `bubbleRise ${duration}s linear infinite`;
    bubble.style.animationDelay = `${delay}s`;
    container.appendChild(bubble);
  }
}

/* ---------- 侧边栏 ---------- */
function setupSidebarToggle() {
  const entranceBtn = document.getElementById('status-entrance');
  const sidebar = document.getElementById('status-sidebar');
  if (!entranceBtn || !sidebar) return;
  const statusContent = sidebar.querySelector('.overflow-y-auto');
  let isOpen = false;
  const resetScroll = () => statusContent && (statusContent.scrollTop = 0);
  entranceBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    sidebar.classList.toggle('-ml-64', !isOpen);
    sidebar.classList.toggle('ml-0', isOpen);
    resetScroll();
  });
}

/* ---------- 按钮交互 ---------- */
function setupActionButtons() {
  const buttons = document.querySelectorAll('.shell-button');
  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      btn.classList.add('scale-95');
      setTimeout(() => btn.classList.remove('scale-95'), 200);
      /* 波纹 */
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255,255,255,0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height);
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = ripple.style.height = `${size}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      console.log('选择了行动:', btn.textContent.trim().substring(0, 1));
    });
  });
  /* 自定义指令 */
  const customInput = document.getElementById('custom-action');
  if (customInput) {
    customInput.addEventListener('keypress', e => {
      if (e.key === 'Enter' && customInput.value.trim()) {
        console.log('自定义指令:', customInput.value);
        customInput.classList.add('scale-95');
        setTimeout(() => {
          customInput.classList.remove('scale-95');
          customInput.value = '';
        }, 150);
      }
    });
  }
}

/* ---------- 初始化 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  createLightRays();
  createFloatingObjects();
  createBubbles();
  createCoralBubbles();
  setupSidebarToggle();
  setupActionButtons();
});
