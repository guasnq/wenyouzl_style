// 状态栏开合
const drawer = document.getElementById('statusDrawer');
const btnOpen = document.querySelector('.fan-toggle');
const btnClose = document.querySelector('.drawer-close');

function setDrawer(open){
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  btnOpen.setAttribute('aria-expanded', open ? 'true' : 'false');
}
btnOpen.addEventListener('click', ()=> setDrawer(!drawer.classList.contains('open')));
btnClose.addEventListener('click', ()=> setDrawer(false));
document.addEventListener('click', (e)=>{
  if (!drawer.classList.contains('open')) return;
  if (!drawer.contains(e.target) && !btnOpen.contains(e.target)) setDrawer(false);
});

// 落叶粒子
(function spawnLeaves(){
  const layer = document.querySelector('.leaf-layer');
  const leafCount = 18;
  const EMOJIS = ['🍃','🍂','🍁'];
  for(let i=0;i<leafCount;i++){
    const el = document.createElement('span');
    el.className = 'leaf';
    el.textContent = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
    const left = Math.random()*100;
    const delay = -Math.random()*10;
    const duration = 10 + Math.random()*10;
    const swing = 2 + Math.random()*2;
    el.style.left = `${left}vw`;
    el.style.animationDuration = `${duration}s, ${3.2 + Math.random()*1.6}s`;
    el.style.animationDelay = `${delay}s, ${delay/2}s`;
    el.style.opacity = (0.28 + Math.random()*0.25).toFixed(2);
    el.style.filter = `drop-shadow(0 2px ${swing}px rgba(0,0,0,0.2))`;
    layer.appendChild(el);
  }
})();

// 选项逐个升起
(function staggerActions(){
  const items = document.querySelectorAll('.action-btn');
  items.forEach((btn, idx)=>{
    btn.style.transition = 'transform .5s ease, opacity .5s ease, box-shadow .25s ease, filter .25s ease';
    btn.style.transform += ' translateY(14px) scale(0.98)';
    btn.style.opacity = '0';
    setTimeout(()=>{
      btn.style.transform = btn.style.transform.replace(' translateY(14px)','').replace(' scale(0.98)','');
      btn.style.opacity = '1';
    }, 120 * idx + 120);
  });
})();

// 动态字体：基于最短边取 18–26px
(function responsiveTweak(){
  function adjust(){
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const vmin = Math.min(w, h);
    const base = Math.max(18, Math.min(26, Math.round(vmin / 36)));
    document.documentElement.style.fontSize = base + 'px';
  }
  adjust();
  window.addEventListener('resize', adjust, { passive: true });
})();
