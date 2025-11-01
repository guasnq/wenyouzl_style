// -------------------- 轻视差与粒子特效 --------------------
(function(){
  // 优化视差效果 - 使用节流减少计算频率
  const bg = document.querySelector('.bg');
  let ticking = false;
  let lastY = 0;

  function updateParallax() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const parallax = Math.min(10, y * 0.06);
    bg.style.transform = `translate3d(0, ${parallax}px, 0)`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, {passive:true});

  // 优化粒子动画 - 减少粒子数量和计算复杂度
  const c = document.getElementById('particles');
  if (!c) return; // 安全检查

  const ctx = c.getContext('2d');
  let W, H, dpr;
  const N = 25; // 从60减少到25个粒子
  const P = [];
  let animationId = null;

  function resize(){
    dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio||1)); // 限制DPI
    W = c.width = innerWidth*dpr;
    H = c.height = innerHeight*dpr;
    c.style.width = innerWidth+"px";
    c.style.height = innerHeight+"px";
  }

  function rnd(a,b){ return a + Math.random()*(b-a); }

  function init(){
    P.length=0;
    for(let i=0;i<N;i++){
      P.push({
        x:rnd(0,W),
        y:rnd(0,H),
        r:rnd(0.8,1.8)*dpr, // 减小粒子大小范围
        v:rnd(6,16), // 减慢速度
        a:rnd(0.04,0.08) // 降低透明度
      });
    }
  }

  function step(){
    if (!ctx) return;

    ctx.clearRect(0,0,W,H);

    // 批量绘制提高性能
    ctx.fillStyle = '#ffffff';
    for(const p of P){
      p.y -= p.v * 0.016;
      if(p.y < -10*dpr){
        p.y = H + rnd(0,80)*dpr;
        p.x = rnd(0,W);
      }
      ctx.globalAlpha = p.a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }

    // 检查页面是否可见，不可见时暂停动画
    if (!document.hidden) {
      animationId = requestAnimationFrame(step);
    }
  }

  // 页面可见性变化时控制动画
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    } else if (!document.hidden && !animationId) {
      animationId = requestAnimationFrame(step);
    }
  });

  window.addEventListener('resize', ()=>{
    if (animationId) cancelAnimationFrame(animationId);
    resize();
    init();
    animationId = requestAnimationFrame(step);
  });

  resize();
  init();
  animationId = requestAnimationFrame(step);
})();

// -------------------- 抽屉状态栏开合 --------------------
(function(){
  // 检查元素是否存在，避免错误
  const drawer = document.getElementById('statusDrawer');
  const openBtn = document.getElementById('openDrawer');
  const closeBtn = document.getElementById('closeDrawer');
  const backdrop = document.getElementById('drawerBackdrop');

  if (!drawer || !openBtn || !closeBtn || !backdrop) return;

  let isOpen = false; // 状态跟踪，避免重复操作

  function open(){
    if (isOpen) return;
    drawer.classList.add('open');
    backdrop.classList.add('show');
    isOpen = true;
  }

  function close(){
    if (!isOpen) return;
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
    isOpen = false;
  }

  // 使用事件委托和被动监听器优化性能
  openBtn.addEventListener('click', open, { passive: true });
  closeBtn.addEventListener('click', close, { passive: true });
  backdrop.addEventListener('click', close, { passive: true });

  // Esc 关闭 - 使用更高效的事件监听
  const escHandler = (e)=>{ if(e.key==='Escape' && isOpen) close(); };
  document.addEventListener('keydown', escHandler, { passive: true });
})();