(function () {
  var colors = ['var(--pink)', 'var(--sun)', 'var(--sky)', 'var(--shell)'];

  // bunting flags
  var b = document.getElementById('bunting');
  for (var i = 0; i < 40; i++) {
    var f = document.createElement('span');
    f.className = 'flag';
    f.style.background = colors[i % colors.length];
    b.appendChild(f);
  }

  // lifespan candles
  var data = [
    { n: 'Hannah Nguyen', s: 'She wants you too', y: 30, c: 0 },
    { n: 'Michelle Dominic', s: 'She would let you sit on her', y: 50, c: 1 },
    { n: 'Anamika Prince', s: 'Potentially Gay', y: 70, c: 2 },
    { n: 'Shaivi Sahni', s: 'Hot', y: 100, c: 3 },
    { n: 'Eshaal Iqbal', s: 'Founded Iqbal Foods', y: 150, c: 0 },
    { n: 'Sameen Ahmed', s: 'Is Gay', y: 194, c: 1 }
  ];
  var ul = document.getElementById('candles');
  data.forEach(function (d) {
    var li = document.createElement('li');
    li.innerHTML = '<div class="name">' + d.n + '<small>' + d.s + '</small></div>' +
      '<div class="track" role="img" aria-label="' + d.n + ', ' + d.y + ' years"><div class="fill" style="width:' + (d.y / 200 * 100) + '%;background-color:' + colors[d.c] + '"></div></div>' +
      '<div class="yrs">' + d.y + '</div>';
    ul.appendChild(li);
  });

  // confetti
  var cv = document.getElementById('confetti');
  var ctx = cv.getContext('2d');
  var parts = [], running = false;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size() {
    var r = window.devicePixelRatio || 1;
    cv.width = innerWidth * r; cv.height = innerHeight * r;
    ctx.setTransform(r, 0, 0, r, 0, 0);
  }
  addEventListener('resize', size); size();
  function cssColor(v) {
    return getComputedStyle(document.documentElement).getPropertyValue(v.slice(4, -1)).trim() || '#ff5c8a';
  }
  function burst(x, y) {
    if (reduce) return;
    var pal = colors.map(cssColor);
    for (var i = 0; i < 110; i++) {
      var a = Math.random() * Math.PI * 2, s = 4 + Math.random() * 9;
      parts.push({
        x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6,
        w: 6 + Math.random() * 7, h: 4 + Math.random() * 5,
        r: Math.random() * 6, vr: (Math.random() - .5) * .4,
        c: pal[i % pal.length], life: 0
      });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }
  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(function (p) { return p.y < innerHeight + 30 && p.life < 220; });
    parts.forEach(function (p) {
      p.vy += .28; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    });
    if (parts.length) requestAnimationFrame(tick); else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
document.getElementById('popBtn').addEventListener('click', function (e) {
  var r = e.currentTarget.getBoundingClientRect();

  // Pop confetti
  burst(r.left + r.width / 2, r.top + r.height / 2);

  // Play Rickroll audio
  var audio = document.getElementById('rickroll');
  audio.currentTime = 0;
  audio.play();
});

  // wishes
  var wishes = [
    'It’s like touching a baby',
    'somethings tingling and it’s not the gaydar',
    'It’s loong',
    'Imma scrub yo daddy',
    'Never enter Santa’s washroom',
    'Never eat Santa’s washroom'
  ];
  var k = -1;
  document.getElementById('wishBtn').addEventListener('click', function (e) {
    var n; do { n = Math.floor(Math.random() * wishes.length); } while (n === k);
    k = n;
    document.getElementById('wishOut').textContent = wishes[n];
    var r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top);
  });
})();
