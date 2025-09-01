/* 轻量交互与动效控制：状态栏、花片粒子、状态条渲染、视频兜底 */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // 状态栏开关
  const sidebar   = $('#sidebar');
  const toggleBtn = $('.sidebar-toggle');
  const closeBtn  = $('.sidebar-close');
  const backdrop  = $('.backdrop');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
  }
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  closeBtn.addEventListener('click', closeSidebar);
  backdrop.addEventListener('click', closeSidebar);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  // 状态条：根据 data-val/data-max 渲染百分比
  function renderStats() {
    $$('.stat-bars li').forEach(li => {
      const val = Number(li.dataset.val || 0);
      const max = Number(li.dataset.max || 100);
      const p = Math.max(0, Math.min(100, Math.round((val / max) * 100)));
      li.style.setProperty('--p', p + '%');
      // 在条末尾补上数值文本
      if (!li.querySelector('.val')) {
        const v = document.createElement('span');
        v.className = 'val';
        v.textContent = ` ${val}/${max}`;
        v.style.opacity = .75;
        v.style.marginLeft = '.25rem';
        li.appendChild(v);
      }
    });
  }
  renderStats();

  // 花片粒子：每分钟约 25 片，常驻 20~28 片
  const petalsHost = $('#petals');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function spawnPetal() {
    if (prefersReduced) return;
    const el = document.createElement('span');
    el.className = 'petal';
    const size = 10 + Math.random() * 12; // px
    const dur  = 14 + Math.random() * 10; // s
    const rot  = -40 + Math.random() * 80; // deg
    const left = Math.random() * 100; // vw%
    el.style.cssText = `
      position:absolute; top:-10vh; left:${left}vw; width:${size}px; height:${size * 0.6}px;
      background: radial-gradient(60% 60% at 30% 40%, rgba(214,69,69,.9), rgba(214,69,69,.45));
      border-radius: 70% 30% 70% 30% / 70% 30% 70% 30%;
      filter: blur(.2px); opacity:.75; transform:rotate(${rot}deg);
      animation: fall ${dur}s linear forwards, sway ${6 + Math.random()*4}s ease-in-out infinite;
    `;
    petalsHost.appendChild(el);
    // 清理
    setTimeout(() => el.remove(), dur * 1000 + 100);
  }

  // 维持粒子数量
  function maintainPetals() {
    if (prefersReduced) return;
    const count = petalsHost.childElementCount;
    const target = 24; // 常驻
    if (count < target) for (let i = 0; i < target - count; i++) spawnPetal();
  }
  // 持续以低频生成（约每 2.4s 一片）
  let petalTimer = null;
  if (!prefersReduced) {
    maintainPetals();
    petalTimer = setInterval(() => { spawnPetal(); }, 2400);
  }

  // 注入关键帧（避免在 CSS 内写死过多全局动画）
  const style = document.createElement('style');
  style.innerHTML = `
  @keyframes fall{
    0%{transform:translateY(-10vh) rotate(var(--r,0)) scale(1)}
    100%{transform:translateY(110vh) rotate(calc(var(--r,0) + 60deg)) scale(.95); opacity:.0}
  }
  @keyframes sway{
    0%,100%{transform:translateX(0) rotate(0deg)}
    50%{transform:translateX(6vw) rotate(8deg)}
  }`;
  document.head.appendChild(style);

  // 背景视频兜底：有些浏览器懒得自动播
  const v = document.querySelector('.bg-video');
  if (v) {
    const tryPlay = () => v.play().catch(() => {/* 静默失败 */});
    if (v.readyState < 2) v.addEventListener('canplay', tryPlay, { once:true });
    tryPlay();
  }

  // 视口变化时微调字号（进一步可读性）
  let rAF = 0;
  function onResize(){
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      // 这里可按需要动态调整根字号或卡片宽度的变量
      renderStats();
    });
  }
  window.addEventListener('resize', onResize);
})();
