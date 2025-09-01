(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function toggleSidebar() {
    $('#sidebar').classList.toggle('active');
  }

  // 偶发阴影效果（用 CSS 类，不再动态注入 <style>）
  function createShadow() {
    const el = document.createElement('div');
    el.className = 'shadow-pass';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
  function scheduleShadow() {
    const interval = Math.random() * 20000 + 20000; // 20-40s
    setTimeout(() => {
      createShadow();
      scheduleShadow();
    }, interval);
  }

  // 响应式字体（沿用原逻辑）
  function adjustFontSizes() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    document.documentElement.style.setProperty('--font-size-base', Math.max(14, vw * 0.025) + 'px');
    document.documentElement.style.setProperty('--font-size-title', Math.max(18, vw * 0.04) + 'px');
    document.documentElement.style.setProperty('--font-size-small', Math.max(12, vw * 0.02) + 'px');
  }

  // 为状态条应用 data-fill
  function applyStatusFill() {
    $$('.status-fill').forEach(el => {
      const v = el.dataset.fill || '0';
      el.style.width = `${v}%`;
    });
  }

  // 交互绑定
  function bindEvents() {
    $('#sidebarToggle')?.addEventListener('click', toggleSidebar);
    $('#sidebarClose')?.addEventListener('click', toggleSidebar);

    // 按钮按压微动效
    $$('.action-button').forEach(btn => {
      btn.addEventListener('click', function () {
        this.style.transform = 'translateX(4px) scale(0.98)';
        setTimeout(() => (this.style.transform = ''), 150);
      });
    });

    // Esc 关闭侧栏
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && $('#sidebar')?.classList.contains('active')) toggleSidebar();
    });

    window.addEventListener('resize', adjustFontSizes);
  }

  // 启动
  document.addEventListener('DOMContentLoaded', () => {
    applyStatusFill();
    adjustFontSizes();
    bindEvents();
    scheduleShadow();
  });
})();
