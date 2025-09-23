// ============= 工具：根据视口尺寸做细粒度缩放（可覆盖CSS clamp） =============
(function responsiveRootFont() {
    const base = 16; // 参考
    function apply() {
        const w = Math.max(320, window.innerWidth);
        const h = Math.max(480, window.innerHeight);
        const scale = Math.min(Math.max((w / 1200 + h / 900) / 2, 0.85), 1.15); // 0.85x~1.15x
        document.documentElement.style.setProperty('--dynamic-rem', (base * scale).toFixed(2) + 'px');
        // 可用于后续：rem = var(--dynamic-rem) 搭配 clamp 已足够
    }
    window.addEventListener('resize', apply); apply();
})();

// ============= 侧边状态栏开关 =============
const panel = document.getElementById('statusPanel');
const toggleBtn = document.getElementById('statusToggle');
const closeBtn = document.getElementById('statusClose');
function openPanel() { panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); toggleBtn.setAttribute('aria-expanded', 'true'); }
function closePanel() { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); toggleBtn.setAttribute('aria-expanded', 'false'); }
toggleBtn.addEventListener('click', () => { panel.classList.contains('open') ? closePanel() : openPanel(); });
closeBtn.addEventListener('click', closePanel);
window.openPanel = openPanel; window.closePanel = closePanel; // 测试可调用

// ============= 填充状态栏数据（动态，可外部传入 window.STATUS_DATA） =============
const statusList = document.getElementById('statusList');
function renderStatus(data) {
    statusList.innerHTML = '';
    if (!Array.isArray(data)) return;
    for (const row of data) {
        const [k, v] = row;
        const item = document.createElement('div'); item.className = 'status-item';
        const label = document.createElement('div'); label.className = 'k'; label.textContent = String(k ?? '状态');
        const val = document.createElement('div'); val.className = 'v'; val.textContent = String(v ?? '');
        const bar = document.createElement('div'); bar.className = 'bar';
        const i = document.createElement('i');
        const num = Number(v);
        const pct = Number.isFinite(num) ? Math.max(0, Math.min(100, num)) : 0;
        i.style.setProperty('--val', pct + '%'); i.style.width = pct + '%';
        bar.appendChild(i); item.append(label, val, bar); statusList.appendChild(item);
    }
}
if (Array.isArray(window.STATUS_DATA)) renderStatus(window.STATUS_DATA);
window.renderStatus = renderStatus;

// ============= 鱼群动画生成 =============
const fishIcons = ['\uD83D\uDC1F', '\uD83D\uDC20', '\uD83D\uDC21']; // 🐟🐠🐡 as escaped
function seedFish() {
    const wrap = document.getElementById('fishSchool');
    wrap.innerHTML = '';
    const rows = 7; // 鱼群层数
    for (let r = 0; r < rows; r++) {
        const f = document.createElement('span');
        f.className = 'fish';
        const icon = fishIcons[Math.floor(Math.random() * fishIcons.length)];
        f.textContent = icon;
        const top = 10 + r * (80 / (rows - 1));
        const dur = 14 + Math.random() * 10;
        const delay = -Math.random() * dur;
        f.style.setProperty('--top', top + '%');
        f.style.setProperty('--dur', dur + 's');
        f.style.animationDelay = delay + 's';
        f.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);
        f.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
        wrap.appendChild(f);
    }
}
seedFish();
window.addEventListener('resize', seedFish);

// ============= 粒子画布（微光粒子） =============
(function particles() {
    const c = document.getElementById('fx-particles');
    const ctx = c.getContext('2d');
    let W, H, dpr;
    let nodes = [];
    function resize() {
        dpr = Math.min(2, window.devicePixelRatio || 1);
        W = c.width = Math.floor(innerWidth * dpr);
        H = c.height = Math.floor(innerHeight * dpr);
        c.style.width = innerWidth + 'px';
        c.style.height = innerHeight + 'px';
    }
    function init() {
        nodes = [];
        const count = Math.floor((innerWidth * innerHeight) / 24000);
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - .5) * 0.12 * dpr,
                vy: (Math.random() - .5) * 0.12 * dpr,
                r: (Math.random() * 1.6 + 0.6) * dpr,
                a: Math.random() * Math.PI * 2
            });
        }
    }
    function step() {
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        for (const p of nodes) {
            p.x += p.vx + Math.cos(p.a) * 0.05 * dpr; p.y += p.vy + Math.sin(p.a) * 0.05 * dpr; p.a += 0.002;
            if (p.x < -10 || p.x > W + 10) p.vx *= -1;
            if (p.y < -10 || p.y > H + 10) p.vy *= -1;
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
            g.addColorStop(0, 'rgba(168,247,255,.35)');
            g.addColorStop(1, 'rgba(168,247,255,0)');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
        }
        requestAnimationFrame(step);
    }
    resize(); init(); step();
    window.addEventListener('resize', () => { resize(); init(); });
})();

// ============= 生成水母若干（jellyfield） =============
(function seedJelly() {
    const field = document.querySelector('.jellyfield');
    function regen() {
        field.innerHTML = '';
        const n = Math.max(3, Math.floor(innerWidth / 420));
        for (let i = 0; i < n; i++) {
            const el = document.createElement('div'); el.className = 'jelly';
            const left = Math.random() * 90 + 2; // %
            const delay = -Math.random() * 30; const dur = 28 + Math.random() * 24;
            el.style.left = left + 'vw';
            el.style.bottom = (-10 - Math.random() * 20) + 'vh';
            el.style.animationDuration = dur + 's';
            el.style.animationDelay = delay + 's';
            el.style.opacity = (0.18 + Math.random() * 0.22).toFixed(2);
            field.appendChild(el);
        }
    }
    regen(); window.addEventListener('resize', regen);
})();

/* 旁白逐字泡泡化（提供函数，便于动态更新后重用） */
function applyNarrBubble(p) {
    if (!p) return; const text = p.textContent || '';
    p.dataset.orig = text; p.textContent = '';
    p.classList.add('bubble-text');
    for (const ch of Array.from(text)) {
        if (ch === ' ') { const sp = document.createElement('span'); sp.className = 'bubble-space'; p.appendChild(sp); continue; }
        if (ch === '\n' || ch === '\r') { p.appendChild(document.createElement('br')); continue; }
        const s = document.createElement('span'); s.className = 'bubble-char'; s.textContent = ch; p.appendChild(s);
    }
}
(function initNarr() { const p = document.querySelector('section[aria-label="旁白区"] .inner p'); applyNarrBubble(p); })();

/* ============= 简易测试用例 ============= */
(function runTests() {
    const results = []; function t(name, fn) { try { fn(); results.push('✅ ' + name); } catch (e) { console.error('❌ ' + name, e); results.push('❌ ' + name + ': ' + e.message); } }
    t('状态栏开关', () => { openPanel(); if (!panel.classList.contains('open')) throw new Error('未打开'); if (panel.getAttribute('aria-hidden') !== 'false') throw new Error('aria未同步'); closePanel(); if (panel.classList.contains('open')) throw new Error('未关闭'); });
    t('旁白逐字泡泡计数', () => { const p = document.querySelector('section[aria-label="旁白区"] .inner p'); const orig = p.dataset.orig || ''; const expected = Array.from(orig).filter(ch => ch !== ' ' && ch !== '\n' && ch !== '\r').length; const got = p.querySelectorAll('.bubble-char').length; if (got !== expected) throw new Error(`期望 ${expected} 实得 ${got}`); });
    if (Array.isArray(window.STATUS_DATA)) {
        t('状态项数量', () => { const n = document.querySelectorAll('.status-item').length; if (n !== window.STATUS_DATA.length) throw new Error(`期望 ${window.STATUS_DATA.length} 实得 ${n}`); });
    }
    if (location.hash.includes('debug')) {
        const pre = document.createElement('pre'); pre.id = 'test-results'; pre.style.cssText = 'position:fixed;left:.5rem;bottom:.5rem;padding:.35rem .5rem;background:rgba(0,0,0,.4);color:#cce;backdrop-filter:blur(3px);border:1px solid rgba(255,255,255,.15);font-size:.8rem;border-radius:8px;z-index:9;'; pre.textContent = results.join('\n'); document.body.appendChild(pre);
    } else {
        console.log('[tests]', '\n' + results.join('\n'));
    }
})();

// 基于 HTML 中的文本种子自动渲染状态（当未提供 window.STATUS_DATA 时生效）
(function () {
    var list = document.getElementById('statusList');
    if (!list) return;
    if (Array.isArray(window.STATUS_DATA)) return; // 用户外部已提供数据
    if (typeof window.renderStatus !== 'function') return;
    var text = list.textContent || '';
    var parts = [];
    // 允许逗号和中文逗号以及换行分隔。避免复杂转义，先把换行替换为逗号再 split
    text = text.replace(/\n/g, ',');
    text.split(',').forEach(function (seg) {
        var s = (seg || '').trim(); if (!s) return;
        var idx = s.indexOf(':'); if (idx < 0) idx = s.indexOf('：');
        if (idx > 0) {
            var k = s.slice(0, idx).trim();
            var v = s.slice(idx + 1).trim();
            parts.push([k, v]);
        }
    });
    if (parts.length) { window.renderStatus(parts); }
})();
