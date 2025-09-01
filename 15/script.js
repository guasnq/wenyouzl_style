/* 自适应降载 + 局部模糊背板已就位；再加实时“掉帧保险丝” */
(function () {
  const $  = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  /* --- 性能档位：粗分 + 实测 --- */
  const mem = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const low = prefersReduced || mem <= 4 || cores <= 4 || Math.min(innerWidth, innerHeight) < 480;
  const high = !low && mem >= 8 && cores >= 8;

  document.documentElement.classList.toggle('perf-low', low);
  document.documentElement.classList.toggle('perf-high', high);

  /* --- 实时掉帧检测：一秒取样，低于 ~45fps 触发 perf-ultra --- */
  (function detectJank(){
    let frames = 0, start = performance.now(), last = start, overBudget = 0;
    function tick(t){
      frames++;
      const dt = t - last; last = t;
      if (dt > 22) overBudget++;        // 22ms ≈ 45fps
      if (t - start < 1000) requestAnimationFrame(tick);
      else {
        const janky = overBudget > 18 || frames < 45;
        if (janky) document.documentElement.classList.add('perf-ultra');
      }
    }
    requestAnimationFrame(tick);
  })();

  /* --- 状态栏 --- */
  const sidebar   = $('#sidebar');
  const toggleBtn = $('.sidebar-toggle');
  const closeBtn  = $('.sidebar-close');
  const backdrop  = $('.backdrop');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
    document.documentElement.classList.add('pause-anim');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
    document.documentElement.classList.remove('pause-anim');
  }
  toggleBtn?.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  closeBtn?.addEventListener('click', closeSidebar);
  backdrop?.addEventListener('click', closeSidebar);
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar(); });

  /* --- 状态条渲染 --- */
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

  /* --- 背景视频：可见时播，超低档降速 --- */
  const video = $('.bg-video');
  function tryPlay(){ video && video.play().catch(()=>{}); }
  if (video) {
    if (document.documentElement.classList.contains('perf-ultra') || low) {
      video.playbackRate = 0.85;   // 降速减解码压力
    }
    if (video.readyState < 2) video.addEventListener('canplay', tryPlay, { once:true });
    tryPlay();
  }
  document.addEventListener('visibilitychange', () => {
    if (!video) return;
    if (document.hidden) video.pause(); else tryPlay();
  });

  /* --- 粒子：更少、更慢，超低档直接停 --- */
  const petalsHost = $('#petals');
  let petalTimer = null;
  const reduced = prefersReduced || document.documentElement.classList.contains('perf-ultra');
  function spawnPetal() {
    if (!petalsHost || reduced) return;
    const el = document.createElement('span');
    el.className = 'petal';
    const size = 9 + Math.random() * 9;
    const dur  = 16 + Math.random() * 12;
    const rot  = -40 + Math.random() * 80;
    const left = Math.random() * 100;
    el.style.cssText = `
      position:absolute; top:-10vh; left:${left}vw; width:${size}px; height:${size * 0.6}px;
      background: radial-gradient(60% 60% at 30% 40%, rgba(214,69,69,.9), rgba(214,69,69,.45));
      border-radius: 70% 30% 70% 30% / 70% 30% 70% 30%;
      filter: blur(.2px); opacity:.7; transform:rotate(${rot}deg); will-change: transform, opacity;
      animation: fall ${dur}s linear forwards, sway ${7 + Math.random()*4}s ease-in-out infinite;
    `;
    petalsHost.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 200);
  }
  function togglePetals(on){
    if (!petalsHost) return;
    if (on && !reduced) {
      for (let i = 0; i < (low ? 4 : 8); i++) spawnPetal();
      if (!petalTimer) petalTimer = setInterval(() => spawnPetal(), low ? 4200 : 3200);
    } else {
      clearInterval(petalTimer); petalTimer = null;
    }
  }
  togglePetals(true);

  /* --- 视口变化：轻刷新 --- */
  let rAF = 0;
  addEventListener('resize', () => {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(renderStats);
  });
})();
