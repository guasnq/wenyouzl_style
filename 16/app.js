const $ = s => document.querySelector(s);

// 侧边栏开关
const panel = $('.side-panel');
$('.side-toggle')?.addEventListener('click', () => {
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
});
$('.side-close')?.addEventListener('click', () => {
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
});

// ===== 背景图“三重保险”加载 =====
// 1) 多CDN顺序回退  2) 同步到 .bg + body + CSS变量  3) 禁止带referrer避免被某些节点拦
(function setBackgroundRobust(){
  const candidates = [
    'https://cdn.jsdelivr.net/gh/guasnq/wenyouzl_style@main/img/16.webp',
    'https://fastly.jsdelivr.net/gh/guasnq/wenyouzl_style@main/img/16.webp',
    'https://gcore.jsdelivr.net/gh/guasnq/wenyouzl_style@main/img/16.webp',
    'https://raw.githubusercontent.com/guasnq/wenyouzl_style/refs/heads/main/img/16.webp'
  ];
  const bgEl = document.querySelector('.bg');
  const apply = src => {
    // 写到三处：CSS变量、.bg层、body兜底层
    document.documentElement.style.setProperty('--bg-url', `url("${src}")`);
    if (bgEl) bgEl.style.backgroundImage = `url("${src}")`;
    document.body.style.backgroundImage = `url("${src}")`;
  };
  let i = 0;
  (function tryNext(){
    if (i >= candidates.length) {
      console.warn('所有候选背景源都失败了，已使用纯色兜底。');
      return;
    }
    const test = new Image();
    test.referrerPolicy = 'no-referrer';
    test.crossOrigin = 'anonymous';
    test.onload = () => apply(candidates[i]);
    test.onerror = () => { i++; tryNext(); };
    test.src = candidates[i];
  })();
})();

// 日志时间
(function setLog(){
  const t = new Date();
  const pad = n => String(n).padStart(2,'0');
  const el = document.getElementById('logTime');
  if (el) el.textContent = `${t.getFullYear()}-${pad(t.getMonth()+1)}-${pad(t.getDate())} ${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
})();

// 红灯“呼吸”节奏 1.2–1.6s 随机
(function breathRandom(){
  const set = () => document.documentElement.style.setProperty('--
