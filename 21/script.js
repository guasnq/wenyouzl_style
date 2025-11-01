// 性能优先：禁用高像素比，限制粒子与动画帧率（此版本已无Canvas粒子）。

// 抽屉开合
(function(){
  const d = document.getElementById('drawer');
  const bd = document.getElementById('bd');
  document.getElementById('open').addEventListener('click', ()=>{ d.classList.add('open'); bd.classList.add('show'); });
  document.getElementById('close').addEventListener('click', ()=>{ d.classList.remove('open'); bd.classList.remove('show'); });
  bd.addEventListener('click', ()=>{ d.classList.remove('open'); bd.classList.remove('show'); });
  window.addEventListener('keydown', e=>{ if(e.key==='Escape'){ d.classList.remove('open'); bd.classList.remove('show'); }});
})();

// 提供质感/性能切换：Alt+L 切换 data-perf
(function(){
  window.addEventListener('keydown', e=>{
    if(e.altKey && (e.key==='l' || e.key==='L')){
      const b=document.body; b.dataset.perf = b.dataset.perf==='low' ? 'high' : 'low';
    }
  });
})();

// 轻视差：仅在高质感模式启用，且幅度极低
(function(){
  const bg = document.querySelector('.bg');
  let enabled = false;
  const onScroll = ()=>{
    if(!enabled) return;
    const y = window.scrollY||0; const p = Math.min(8, y*0.05);
    bg.style.transform = `translate3d(0, ${p}px, 0)`;
  };
  const toggle = ()=>{ enabled = document.body.dataset.perf==='high'; if(!enabled) bg.style.transform='translateZ(0)'; };
  toggle();
  window.addEventListener('scroll', onScroll, {passive:true});
  const mo = new MutationObserver(toggle); mo.observe(document.body,{attributes:true,attributeFilter:['data-perf']});
})();