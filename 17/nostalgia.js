(function () {
  const drawer = document.getElementById('statusDrawer');
  const toggle = document.querySelector('.drawer-toggle');
  const closeBtn = document.querySelector('.drawer-close');

  function openDrawer() {
    drawer.setAttribute('data-open', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    drawer.setAttribute('data-open', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', () => {
    const open = drawer.getAttribute('data-open') === 'true';
    open ? closeDrawer() : openDrawer();
  });
  closeBtn.addEventListener('click', closeDrawer);

  // ESC 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // 点击抽屉外侧也可关闭（可选，命中屏幕空白）
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggle.contains(e.target)) {
      if (drawer.getAttribute('data-open') === 'true') closeDrawer();
    }
  }, { capture: true });

  // 视口变化不强行改字重，主要靠 CSS clamp；但补一个根字号微调，避免超窄屏过大
  const updateRootSize = () => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const base = Math.max(14, Math.min(18, w / 72)); // 约等于 1.6vw 的温和版本
    document.documentElement.style.fontSize = base + 'px';
  };
  updateRootSize();
  window.addEventListener('resize', updateRootSize, { passive: true });
})();
