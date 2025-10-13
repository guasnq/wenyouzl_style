// ===== 实用：选择器简化 =====
const $ = (s, r = document) => r.querySelector(s);

// ===== 侧边状态栏展开/收起 =====
const openBtn = $('#openSide');
const panel = $('#statePanel');
const closeBtn = $('#closeSide');
const bodyBox = $('#stateBody');

function toggleSide(open) {
  if (open) { panel.classList.add('open'); openBtn.setAttribute('aria-expanded', 'true'); }
  else { panel.classList.remove('open'); openBtn.setAttribute('aria-expanded', 'false'); }
}
openBtn.addEventListener('click', () => toggleSide(!panel.classList.contains('open')));
closeBtn.addEventListener('click', () => toggleSide(false));

// 点击外部区域关闭（可选）
document.addEventListener('click', (e) => {
  if (!panel.classList.contains('open')) return;
  const isInside = panel.contains(e.target) || openBtn.contains(e.target);
  if (!isInside) toggleSide(false);
});

// ===== 行动按钮 hover 提示 =====
const hoverTip = $('#hoverTip');
document.querySelectorAll('.btn-jade').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    const t = btn.getAttribute('data-tip');
    if (t) hoverTip.textContent = '提示：' + t;
  });
  btn.addEventListener('mouseleave', () => {
    hoverTip.textContent = '提示：悬停查看效果';
  });
});

// ===== 全局星粒子：缓慢飘落 =====
const starCanvas = $('#stars');
const sCtx = starCanvas.getContext('2d');
let W = innerWidth, H = innerHeight; starCanvas.width = W; starCanvas.height = H;

let stars = [];
function mkStar() {
  return {
    x: Math.random() * W,
    y: Math.random() * -H,
    r: Math.random() * 1.6 + 0.4,
    v: Math.random() * 0.35 + 0.15,
    a: Math.random() * 0.7 + 0.2
  }
}
for (let i = 0; i < 140; i++) stars.push(mkStar());

function drawStars() {
  sCtx.clearRect(0, 0, W, H);
  for (const st of stars) {
    sCtx.beginPath();
    sCtx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    sCtx.fillStyle = `rgba(255,255,255,${st.a})`;
    sCtx.fill();
    st.y += st.v; st.x += Math.sin(st.y * 0.003) * 0.15;
    if (st.y > H + 10) Object.assign(st, mkStar(), { y: -10 });
  }
  requestAnimationFrame(drawStars);
}
drawStars();

// ===== 全局淡紫烟雾：缓慢流动（简易噪声纹理位移） =====
const smokeCanvas = $('#smoke');
const mCtx = smokeCanvas.getContext('2d');
smokeCanvas.width = W; smokeCanvas.height = H;
const smokeImg = new Image();
// 使用 SVG 生成的软雾纹理
smokeImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><defs><filter id="n" x="-50%" y="-50%" width="200%" height="200%"><feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="3" seed="11"/><feColorMatrix type="matrix" values="0 0 0 0 0.69  0 0 0 0 0.61  0 0 0 0 0.85  0 0 0 0.12 0"/></filter></defs><rect width="100%" height="100%" filter="url(%23n)"/></svg>';
let t = 0;
function drawSmoke() {
  t += 0.0025;
  const ox = Math.sin(t) * 40, oy = Math.cos(t * 0.8) * 30;
  mCtx.clearRect(0, 0, W, H);
  mCtx.globalCompositeOperation = 'screen';
  mCtx.globalAlpha = 0.18; // 轻薄，不遮蔽
  for (let i = 0; i < 3; i++) {
    mCtx.drawImage(smokeImg, (ox * i) % W - W / 2, (oy * i) % H - H / 2, W * 1.8, H * 1.8);
  }
  mCtx.globalAlpha = 1;
  requestAnimationFrame(drawSmoke);
}
smokeImg.onload = drawSmoke;

// ===== 事件区花瓣粒子 =====
const petalsCanvas = $('#petals');
const pCtx = petalsCanvas.getContext('2d');
function resizeAll() { W = innerWidth; H = innerHeight; starCanvas.width = W; starCanvas.height = H; smokeCanvas.width = W; smokeCanvas.height = H; const ev = $('.events'); const r = ev.getBoundingClientRect(); petalsCanvas.width = r.width; petalsCanvas.height = r.height; petalsOffset = { x: r.left, y: r.top + scrollY }; }
let petals = [], petalsOffset = { x: 0, y: 0 };

function mkPetal() {
  const r = Math.random() * 6 + 4;
  return { x: Math.random() * petalsCanvas.width, y: -10, r, v: Math.random() * 0.4 + 0.2, sway: Math.random() * 0.8 + 0.2, rot: Math.random() * Math.PI, vr: (Math.random() * 0.02 - 0.01) };
}
function drawPetals() {
  pCtx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
  for (const p of petals) {
    pCtx.save();
    pCtx.translate(p.x, p.y);
    pCtx.rotate(p.rot);
    const grd = pCtx.createRadialGradient(0, 0, 1, 0, 0, p.r);
    grd.addColorStop(0, 'rgba(200,160,255,.95)');
    grd.addColorStop(1, 'rgba(160,120,255,.35)');
    pCtx.fillStyle = grd;
    pCtx.beginPath();
    pCtx.moveTo(0, -p.r);
    pCtx.quadraticCurveTo(p.r, -p.r * 0.2, 0, p.r);
    pCtx.quadraticCurveTo(-p.r, -p.r * 0.2, 0, -p.r);
    pCtx.fill();
    pCtx.restore();
    p.y += p.v; p.x += Math.sin(p.y * 0.03) * p.sway; p.rot += p.vr;
    if (p.y > petalsCanvas.height + 12) Object.assign(p, mkPetal(), { y: -10 });
  }
  requestAnimationFrame(drawPetals);
}

function refillPetals() { petals = []; for (let i = 0; i < 24; i++) petals.push(mkPetal()); }

// 初始尺寸
resizeAll(); refillPetals(); drawPetals();
addEventListener('resize', resizeAll);
addEventListener('scroll', () => { // 事件区重定位
  const ev = $('.events'); const r = ev.getBoundingClientRect(); petalsCanvas.width = r.width; petalsCanvas.height = r.height; petalsOffset = { x: r.left, y: r.top + scrollY };
}, { passive: true });