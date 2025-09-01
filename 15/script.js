/* 性能自适应 + 文字可读性保障 + 背景与动画降载 */
(function () {
  const $  = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  // —— 性能档位判断：设备内存、线程数、用户动效偏好
  const mem = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const low =
    prefersReduced ||
    mem <= 4 ||
    cores <= 4 ||
    (Math.min(window.innerWidth, window.innerHeight) < 480);

  const high = !low && mem >= 8 && cores >= 8;

  document.documentElement.classList.toggle('perf-low', low);
  document.documentElement.classList.toggle('perf-high', high);

  // —— 状态栏开关
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
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar(); });

  // —— 状态条渲染
  function renderStats() {
    $$('.stat-bars li').forEach(li => {
      const val = Number(li.dataset.val || 0);
      const max = Number(li.dataset.max || 100);
      const p = Math.max(0, Math.min(100, Math.round((val / max) * 100)));
      li.style.setProperty('--p', p + '%');
      if (!li.querySelector('.val')) {
        const v = document.createElement('span');
        v.className = 'val';
        v.textContent = ` ${val}/${max}`;
        v.style.opacity = .78;
        v.style.marginLeft = '.25rem';
        li.appendChild(v);
      }
    });
  }
  renderStats();

  // —— 背景视频：可见时播放，隐藏时暂停；低配降速
  const video = $('.bg-video');
  function tryPlay(){ video && video.play().catch(()=>{}); }
  if (video) {
    if (low) video.playbackRate = 0.9;
    if (video.readyState < 2) video.addEventListener('canplay', tryPlay, { once:true });
    tryPlay();
  }
  document.addEventListener('visibilitychange', () => {
    if (!video) return;
    if (document.hidden) { video.pause(); togglePetals(false); }
    else { tryPlay(); togglePetals(true); }
  });

  // —— 粒子：更少、更慢；低配直接减半
  const petalsHost = $('#petals');
  let petalTimer = null;
  function spawnPetal() {
    if (!petalsHost || prefersReduced) return;
    const el = document.createElement('span');
    el.className = 'petal';
    const size = 10 + Math.random() * 10;      // px
    const dur  = 16 + Math.random() * 12;      // s
    const rot  = -40 + Math.random() * 80;     // deg
    const left = Math.random() * 100;          // vw%
    el.style.cssText = `
      position:absolute; top:-10vh; left:${left}vw; width:${size}px; height:${size * 0.6}px;
      background: radial-gradient(60% 60% at 30% 40%, rgba(214,69,69,.9), rgba(214,69,69,.45));
      border-radius: 70% 30% 70% 30% / 70% 30% 70% 30%;
      filter: blur(.2px); opacity:.72; transform:rotate(${rot}deg); will-change: transform, opacity;
      animation: fall ${dur}s linear forwards, sway ${7 + Math.random()*4}s ease-in-out infinite;
    `;
    petalsHost.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 200);
  }

  function maintainPetals(target) {
    if (!petalsHost || prefersReduced) return;
    const count = petalsHost.childElementCount;
    for (let i = 0; i < Math.max(0, target - count); i++) spawnPetal();
  }

  const targetCount = low ? 6 : high ? 16 : 10;
  function togglePetals(on){
    if (!petalsHost) return;
    if (on) {
      maintainPetals(targetCount);
      if (!petalTimer) petalTimer = setInterval(() => spawnPetal(), low ? 3800 : 3000);
    } else {
      clearInterval(petalTimer); petalTimer = null;
      // 不立即清空，维持屏幕上的少量粒子，避免突兀
    }
  }
  if (!prefersReduced) togglePetals(true);

  // —— 视口变化：仅做轻量刷新
  let rAF = 0;
  function onResize(){
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => renderStats());
  }
  window.addEventListener('resize', onResize);
})();
