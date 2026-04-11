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

// 初始化
createDots();
update();
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
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (diff < -40) next();
  if (diff > 40) prev();
}, { passive: true });

// 检测是否为触屏设备
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// 仅在非触屏设备上启用自定义鼠标
if (!isTouchDevice) {
  document.addEventListener('mousemove', e => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });
} else {
  // 移动端强制隐藏光标元素
  if(customCursor) customCursor.style.display = 'none';
}

// 页面加载完成 → 关闭加载页
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 600);
});
