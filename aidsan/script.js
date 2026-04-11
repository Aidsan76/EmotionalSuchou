const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const customCursor = document.getElementById('customCursor');
const loader = document.getElementById('loader');
let index = 0;

// === 动态视口高度修复（关键！）===
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', () => {
  setTimeout(setVH, 100);   // 横竖屏切换后延迟一下
});
setVH();   // 初始化

// 图片懒加载
function loadImg(img) {
  if (img && img.dataset.src && !img.src) {
    img.src = img.dataset.src;
  }
}

// 生成小点
function createDots() {
  dotsContainer.innerHTML = ''; // 防止重复
  items.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
}

// 更新轮播
function update() {
  items.forEach((item, i) => {
    const isActive = i === index;
    item.classList.toggle('active', isActive);
    if (isActive) {
      const img = item.querySelector('img');
      loadImg(img);
    }
  });

  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function next() { index = (index + 1) % items.length; update(); }
function prev() { index = (index - 1 + items.length) % items.length; update(); }

// 初始化
createDots();
update();
setInterval(next, 15000);

// 按钮交互
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => { index = i; update(); });
});

// 触摸滑动（优化阈值 + 防止误触）
let touchStartX = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) < 40) return;   // 阈值稍大，避免轻微滑动触发
  if (diff < -40) next();
  if (diff > 40) prev();
}, { passive: true });

// 自定义鼠标 - 只在非触屏设备（桌面）显示
if (!('ontouchstart' in window) && navigator.maxTouchPoints < 2) {
    customCursor.style.display = 'block';
    
    document.addEventListener('mousemove', e => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });
}

// 加载完成关闭 loader
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 600);
});
