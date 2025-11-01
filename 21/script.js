// -------------------- 轻视差与粒子特效 --------------------
(function(){
  const bg = document.querySelector('.bg');
  const before = getComputedStyle(bg, '::before');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    // 背景轻微下移，卡片天然反差更明显
    const parallax = Math.min(10, y * 0.06);
    bg.style.setProperty('--parallax', parallax);
    bg.style.transform = `translate3d(0, ${parallax}px, 0)`;
  }, {passive:true});

  // 粒子光漂：上升小点
  const c = document.getElementById('particles');
  const ctx = c.getContext('2d');
  let W, H, dpr;
  const N = 60; // 稀疏
  const P = [];
  function resize(){ dpr = Math.max(1, Math.min(2, window.devicePixelRatio||1)); W = c.width = innerWidth*dpr; H = c.height = innerHeight*dpr; c.style.width = innerWidth+"px"; c.style.height = innerHeight+"px"; }
  function rnd(a,b){ return a + Math.random()*(b-a); }
  function init(){ P.length=0; for(let i=0;i<N;i++){ P.push({ x:rnd(0,W), y:rnd(0,H), r:rnd(0.6,2.2)*dpr, v:rnd(8,22), a:rnd(0.06,0.10)}); } }
  function step(t){ ctx.clearRect(0,0,W,H); for(const p of P){ p.y -= p.v * 0.016; if(p.y < -10*dpr){ p.y = H + rnd(0,120)*dpr; p.x = rnd(0,W); }
      ctx.globalAlpha = p.a; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fillStyle = '#ffffff'; ctx.fill(); }
    requestAnimationFrame(step); }
  window.addEventListener('resize', ()=>{ resize(); init(); }); resize(); init(); requestAnimationFrame(step);
})();

// -------------------- 抽屉状态栏开合 --------------------
(function(){
  const drawer = document.getElementById('statusDrawer');
  const openBtn = document.getElementById('openDrawer');
  const closeBtn = document.getElementById('closeDrawer');
  const backdrop = document.getElementById('drawerBackdrop');

  function open(){ drawer.classList.add('open'); backdrop.classList.add('show'); }
  function close(){ drawer.classList.remove('open'); backdrop.classList.remove('show'); }
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  // Esc 关闭
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
})();