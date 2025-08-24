// 侧边状态栏开关
(function(){
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.querySelector('.status-toggle');
  const closeBtn  = sidebar.querySelector('.sidebar-close');

  function openSidebar(){
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar(){
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
  toggleBtn.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebar() : openSidebar());
  closeBtn.addEventListener('click', closeSidebar);
  document.addEventListener('click', (e)=>{
    if(!sidebar.classList.contains('open')) return;
    const inside = sidebar.contains(e.target) || toggleBtn.contains(e.target);
    if(!inside) closeSidebar();
  }, {passive:true});
})();

// 粒子特效（Canvas）：更显眼但更省资源
(function(){
  const canvas = document.getElementById('fx-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let DPR = Math.min(window.devicePixelRatio || 1, 1.5); // 限制像素比，节能
  let W = 0, H = 0;

  function resize(){
    const { innerWidth: w, innerHeight: h } = window;
    DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    W = w; H = h;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  const particles = [];
  const comets = [];
  let targetDensity = 110; // 目标粒子数量（会根据性能自动调整）
  let ecoMode = false;

  function spawnParticle(){
    const size = 0.8 + Math.random() * 2.6;
    particles.push({
      x: Math.random() * W,
      y: H + Math.random() * 60,
      vy: 18 + Math.random() * 32,
      size,
      alpha: 0.55 + Math.random() * 0.45
    });
  }
  function spawnComet(){
    const y = H * (0.35 + Math.random()*0.5);
    const len = 140 + Math.random()*160;
    comets.push({
      x: W + 40,
      y,
      vx: - (300 + Math.random()*240),
      len,
      life: 0,
      rot: -15 * Math.PI/180
    });
  }

  // 初始填充
  for(let i=0;i<targetDensity;i++) spawnParticle();

  let last = performance.now();
  let fpsQueue = [];

  function frame(now){
    const dt = Math.min(0.05, (now - last) / 1000); // 秒
    last = now;

    // 清屏（使用透明清除减少重绘）
    ctx.clearRect(0,0,W,H);

    // 粒子更新与绘制
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.y -= p.vy * dt;
      const fade = Math.max(0, Math.min(1, (p.y / H)));
      ctx.globalAlpha = p.alpha * (0.3 + 0.7 * fade);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fillStyle = 'white';
      ctx.fill();
      if(p.y < -20) {
        // 复用代替删除新增，降低 GC 压力
        p.x = Math.random() * W;
        p.y = H + Math.random() * 40;
        p.vy = 18 + Math.random() * 32;
        p.size = 0.8 + Math.random() * 2.6;
        p.alpha = 0.55 + Math.random() * 0.45;
      }
    }

    // 彗星
    for(let i=comets.length-1;i>=0;i--){
      const c = comets[i];
      c.x += c.vx * dt;
      c.life += dt;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      // 画一条带渐变的拖尾
      const grad = ctx.createLinearGradient(0,0,-c.len,0);
      grad.addColorStop(0,'rgba(255,255,255,0.95)');
      grad.addColorStop(1,'rgba(255,255,255,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(-c.len,0);
      ctx.stroke();
      ctx.restore();
      if(c.x < -c.len - 60) comets.splice(i,1);
    }
    ctx.restore();

    // 性能采样：近 30 帧 FPS 均值
    fpsQueue.push(1/dt);
    if(fpsQueue.length > 30) fpsQueue.shift();
    const avgFps = fpsQueue.reduce((a,b)=>a+b,0) / fpsQueue.length;

    // 自动降档/升档：帧率低则进入 ECO，反之恢复并更显眼
    if(!ecoMode && avgFps < 46){
      ecoMode = true;
      document.body.classList.add('fx-eco');
      targetDensity = 70;              // 降密度
      // 减少现有粒子
      particles.length = Math.min(particles.length, targetDensity);
    }else if(ecoMode && avgFps > 54){
      ecoMode = false;
      document.body.classList.remove('fx-eco');
      targetDensity = 120;             // 恢复更“燃”
      while(particles.length < targetDensity) spawnParticle();
    }

    // 保持粒子数量靠近目标
    if(particles.length < targetDensity) spawnParticle();
    // 彗星频率：ECO 降低
    if(Math.random() < (ecoMode ? 0.006 : 0.014)) spawnComet();

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// 轻微视差：让 FX 层跟手（非常廉价的 transform）
(function(){
  const layer = document.getElementById('fx-layer');
  if(!layer) return;

  let haveMouse = false, t = 0;
  const vw = ()=> Math.max(window.innerWidth, document.documentElement.clientWidth);
  const vh = ()=> Math.max(window.innerHeight, document.documentElement.clientHeight);

  function parallax(x=0.5,y=0.5){
    const dx = (x - 0.5) * 16;   // 偏移范围更明显
    const dy = (y - 0.5) * 12;
    layer.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }
  window.addEventListener('mousemove', (e)=>{
    haveMouse = true;
    parallax(e.clientX / vw(), e.clientY / vh());
  }, {passive:true});

  function auto(){
    if(!haveMouse){
      t += 0.004;
      parallax(0.5 + Math.sin(t)*0.18, 0.5 + Math.cos(t*0.9)*0.14);
    }
    requestAnimationFrame(auto);
  }
  auto();
})();
