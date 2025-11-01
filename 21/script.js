// -------------------- 简化版脚本 - 移除所有动画和复杂计算 --------------------

// -------------------- 抽屉状态栏开合 --------------------
(function(){
  const drawer = document.getElementById('statusDrawer');
  const openBtn = document.getElementById('openDrawer');
  const closeBtn = document.getElementById('closeDrawer');
  const backdrop = document.getElementById('drawerBackdrop');

  if (!drawer || !openBtn || !closeBtn || !backdrop) return;

  let isOpen = false;

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

  // 简化事件监听
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  // Esc 关闭
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape' && isOpen) close();
  });
})();