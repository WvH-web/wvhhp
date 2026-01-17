(function(){
  const dd = document.querySelectorAll('[data-dropdown]');
  dd.forEach(el=>{
    const btn = el.querySelector('button');
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      el.classList.toggle('open');
    });
    document.addEventListener('click', (e)=>{
      if(!el.contains(e.target)) el.classList.remove('open');
    });
  });
})();