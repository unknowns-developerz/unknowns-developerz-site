(() => {
  const menuButton = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '×' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }));
  }

  const glow = document.querySelector('.cursor-glow');
  if (glow && matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  const canvas = document.getElementById('matrix');
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  const chars = '01<>[]{}/*#λ∆';
  let cols = 0;
  let drops = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  const font = 14;
  function resize() {
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    cols = Math.ceil(innerWidth / font);
    drops = Array.from({length: cols}, () => Math.random() * -50);
  }
  resize();
  addEventListener('resize', resize);
  let last = 0;
  function draw(t) {
    if (t - last > 70) {
      last = t;
      ctx.fillStyle = 'rgba(1,7,9,.17)';
      ctx.fillRect(0,0,innerWidth,innerHeight);
      ctx.font = `600 ${font}px ui-monospace, monospace`;
      ctx.fillStyle = 'rgba(52,228,238,.7)';
      for (let i=0; i<drops.length; i++) {
        const ch = chars[Math.floor(Math.random()*chars.length)];
        ctx.fillText(ch, i*font, drops[i]*font);
        if (drops[i]*font > innerHeight && Math.random() > .985) drops[i] = 0;
        drops[i] += .5;
      }
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
