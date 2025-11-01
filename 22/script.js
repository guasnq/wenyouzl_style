// ===== 抽屉开合 =====
const drawer = document.getElementById('drawer');
const toggleBtn = document.querySelector('.toggle');
const closeBtn = document.querySelector('.drawer-close');
function setDrawer(open){drawer.classList.toggle('open',open);drawer.setAttribute('aria-hidden',String(!open));toggleBtn.setAttribute('aria-expanded',String(open));}
toggleBtn.addEventListener('click',()=>setDrawer(!drawer.classList.contains('open')));
closeBtn.addEventListener('click',()=>setDrawer(false));
document.addEventListener('click',e=>{if(!drawer.classList.contains('open'))return; if(drawer.contains(e.target)||e.target===toggleBtn)return; setDrawer(false)});

// ===== 粒子风层（右上->左下），自适应性能 =====
const cvs = document.getElementById('particles');
const ctx = cvs.getContext('2d');
let DPR = Math.max(1, Math.min(window.devicePixelRatio||1, 2));
let W,H,parts; const MAX=72; // 更低上限，避免卡顿
function rnd(a,b){return Math.random()*(b-a)+a}
function init(){
  W=cvs.width=Math.floor(innerWidth*DPR); H=cvs.height=Math.floor(innerHeight*DPR);
  cvs.style.width=innerWidth+'px'; cvs.style.height=innerHeight+'px';
  const density = innerWidth<520?0.35:innerWidth<960?0.6:1; const count=Math.min(MAX,Math.floor(60*density));
  parts=new Array(count).fill(0).map(()=>({x:rnd(0,W),y:rnd(0,H),vx:-rnd(.12,.36)*DPR,vy:rnd(.08,.2)*DPR,a:rnd(.22,.5),w:rnd(16,46)*DPR,h:rnd(3,9)*DPR,life:rnd(8e3,26e3),t:performance.now()+rnd(0,2e3)}));
}
let rafId; let last=0; // 轻量节流
function draw(ts){
  if(ts-last<16){rafId=requestAnimationFrame(draw);return;} // ~60fps
  last=ts; ctx.clearRect(0,0,W,H);
  const now=ts;
  for(const p of parts){const fade=.5+.5*Math.sin((now-p.t)/p.life*2*Math.PI);ctx.globalAlpha=p.a*fade*.8;ctx.beginPath();ctx.ellipse(p.x,p.y,p.w,p.h,-Math.PI/6,0,2*Math.PI);ctx.fillStyle='rgba(255,223,168,0.85)';ctx.fill();p.x+=p.vx; p.y+=p.vy; if(p.x<-80*DPR||p.y>H+80*DPR){p.x=W+rnd(0,160)*DPR; p.y=-rnd(0,80)*DPR}}
  ctx.globalAlpha=1; rafId=requestAnimationFrame(draw);
}
init(); rafId=requestAnimationFrame(draw);
addEventListener('resize',()=>{cancelAnimationFrame(rafId); init(); rafId=requestAnimationFrame(draw);});

// 降噪：若系统偏好少动效，停用粒子
if(matchMedia('(prefers-reduced-motion: reduce)').matches){cancelAnimationFrame(rafId);}