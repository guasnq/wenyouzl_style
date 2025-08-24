/* ===== 抽屉状态栏：焦点管理 + inert 防聚焦 ===== */
(function(){
  const toggle = document.querySelector('.state-toggle');
  const aside  = document.getElementById('statebar');
  const closeBtn = aside.querySelector('.state-close');
  let lastFocus = null;

  // 初始：侧栏不可聚焦
  aside.setAttribute('aria-hidden', 'true');
  try { aside.inert = true; } catch(_) {}

  function focusFirst(){
    const target = aside.querySelector('[autofocus], .state-close, h2') || aside;
    if (target && target.focus) target.focus({ preventScroll: true });
  }

  function openBar(){
    lastFocus = document.activeElement;
    try { aside.inert = false; } catch(_) {}
    aside.classList.add('open');
    aside.setAttribute('aria-hidden','false');
    toggle.setAttribute('aria-expanded','true');
    // 延后一帧再聚焦，避免过渡与样式竞争
    requestAnimationFrame(focusFirst);
  }

  function closeBar(){
    // 关闭前把焦点移回触发按钮，避免 aria-hidden 覆盖当前焦点引发警告
    if (document.activeElement && aside.contains(document.activeElement)) {
      toggle.focus({ preventScroll: true });
    } else if (lastFocus && lastFocus.focus) {
      toggle.focus({ preventScroll: true });
    }

    aside.classList.remove('open');
    aside.setAttribute('aria-hidden','true');
    toggle.setAttribute('aria-expanded','false');
    try { aside.inert = true; } catch(_) {}
  }

  toggle.addEventListener('click', () => {
    aside.classList.contains('open') ? closeBar() : openBar();
  });
  closeBtn.addEventListener('click', closeBar);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeBar(); });
})();

/* ===== 状态条目进度条 ===== */
(function(){
  const items = document.querySelectorAll('.stat-list li');
  items.forEach(li => {
    const b = li.querySelector('b');
    if(!b) return;
    const maxAttr = b.getAttribute('data-max');
    const val = parseFloat(b.textContent.trim());
    const max = maxAttr ? parseFloat(maxAttr) : null;
    if(Number.isFinite(val) && Number.isFinite(max) && max > 0){
      const ratio = Math.max(0, Math.min(1, val / max));
      const bar = document.createElement('i');
      bar.className = 'bar';
      bar.style.transform = `scaleX(${ratio})`;
      li.appendChild(bar);
    }
  });
})();

/* ===== 柔光粒子：自适应降级 / 低 FPS 自动减载 ===== */
(function(){
  const canvas = document.getElementById('fx-layer');
  const ctx = canvas.getContext('2d', { alpha: true });

  // 设备情况估计，限制 DPR，弱设备更保守
  const weakDevice =
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4);

  const DPR = Math.min(weakDevice ? 1.25 : 1.6, window.devicePixelRatio || 1);

  let particles = [];
  let W = 0, H = 0, running = true;
  let targetCount = 0;

  function resize(){
    W = canvas.clientWidth = window.innerWidth;
    H = canvas.clientHeight = window.innerHeight;
    canvas.width  = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // 基于面积估算目标数量
    targetCount = Math.floor(Math.min(140, Math.max(50, (W * H) / 26000)));
    initParticles(targetCount);
  }

  function initParticles(count){
    const arr = [];
    for(let i=0;i<count;i++){
      const r = Math.random() * 2.2 + 0.9;
      arr.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r,
        a: Math.random() * 0.5 + 0.15,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        hue: 210 + Math.random() * 90
      });
    }
    particles = arr;
  }

  // FPS 监测，自适应减载
  let lastStamp = performance.now();
  let frameCount = 0;
  let fps = 60;

  function adjustLoad(){
    if (fps < 45 && particles.length > 40) {
      particles.length = Math.floor(particles.length * 0.75); // 减少 25%
    } else if (fps > 55 && particles.length < targetCount) {
      // 温和回升
      const add = Math.min(6, targetCount - particles.length);
      for(let i=0;i<add;i++){
        const r = Math.random() * 2.2 + 0.9;
        particles.push({
          x: Math.random() * W, y: Math.random() * H, r,
          a: Math.random() * 0.5 + 0.15,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          hue: 210 + Math.random() * 90
        });
      }
    }
  }

  function tick(now){
    if(!running) return;

    frameCount++;
    if (now - lastStamp >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastStamp = now;
      adjustLoad();
    }

    ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation = 'lighter';
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -10) p.x = W + 10;
      if(p.x > W + 10) p.x = -10;
      if(p.y < -10) p.y = H + 10;
      if(p.y > H + 10) p.y = -10;

      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
      grd.addColorStop(0, `hsla(${p.hue}, 100%, 80%, ${p.a})`);
      grd.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  // 动作偏好与可见性
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleMotion(){
    running = !mediaQuery.matches && !document.hidden;
    if(running) requestAnimationFrame(tick);
    else ctx.clearRect(0,0,W,H);
  }
  mediaQuery.addEventListener('change', handleMotion);
  document.addEventListener('visibilitychange', handleMotion);

  // 事件
  window.addEventListener('resize', resize, { passive: true });
  resize(); handleMotion();
})();

/* ===== 背景视频兜底 ===== */
(function(){
  const v = document.getElementById('bg-video');
  let failed = false;
  const markFail = () => {
    if(failed) return; failed = true;
    v.style.filter = 'saturate(0.85) brightness(0.65) contrast(1.1)';
    document.body.style.background = '#0b1020 radial-gradient(1200px 800px at 50% 30%, #20305c 0%, #0b1020 60%)';
  };
  v.addEventListener('error', markFail);
  v.addEventListener('stalled', markFail);
  v.addEventListener('abort', markFail);
})();
