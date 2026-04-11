const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const customCursor = document.getElementById('customCursor');
const loader = document.getElementById('loader');
let index = 0;

// 图片懒加载
function loadImg(img) {
  if (img.dataset.src && !img.src) {
    img.src = img.dataset.src;
  }
}

// 生成小点
function createDots() {
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
    if (isActive) loadImg(item.querySelector('img'));
  });
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function next() {
  index = (index + 1) % items.length;
  update();
}

function prev() {
  index = (index - 1 + items.length) % items.length;
  update();
}

// 预加载初始图片
function preloadInitImgs() {
  loadImg(items[0].querySelector('img'));
  if (items.length > 1) {
    loadImg(items[1].querySelector('img'));
  }
}

// 初始化
createDots();
update();
preloadInitImgs();
setInterval(next, 15000);

// 交互
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    update();
  });
});

// 触屏滑动优化
let touchStartX = 0;
let touchStartTime = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartTime = Date.now();
}, { passive: true });

document.addEventListener('touchend', e => {
  const diffTime = Date.now() - touchStartTime;
  const diffX = e.changedTouches[0].screenX - touchStartX;
  if (diffTime < 300) {
    if (diffX < -50) next();
    if (diffX > 50) prev();
  }
}, { passive: true });

// 自定义鼠标 - 修复位置偏移
document.addEventListener('mousemove', e => {
  const cursorX = e.clientX - customCursor.offsetWidth / 2;
  const cursorY = e.clientY - customCursor.offsetHeight / 2;
  customCursor.style.left = cursorX + 'px';
  customCursor.style.top = cursorY + 'px';
});

// 关闭加载页（增加兜底超时）
function hideLoader() {
  if (!loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
  }
}

// 方案1：等待页面加载完成
window.addEventListener('load', () => {
  setTimeout(hideLoader, 600);
});

// 方案2：兜底超时（防止load事件不触发）
setTimeout(hideLoader, 5000); // 5秒后强制关闭
