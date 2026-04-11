const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.dots');
const customCursor = document.getElementById('customCursor');
const loader = document.getElementById('loader');
let index = 0;

function loadImg(img) {
  if (img.dataset.src && !img.src) {
    img.src = img.dataset.src;
  }
}

function createDots() {
  items.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
}

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

// 圆点切换
document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    update();
  });
});

// 手机滑动
let touchStartX = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
  const diffX = e.changedTouches[0].screenX - touchStartX;
  if (diffX < -50) next();
  if (diffX > 50) prev();
}, { passive: true });

// 自定义鼠标
document.addEventListener('mousemove', e => {
  const x = e.clientX - customCursor.offsetWidth / 2;
  const y = e.clientY - customCursor.offsetHeight / 2;
  customCursor.style.left = x + 'px';
  customCursor.style.top = y + 'px';
});

// 加载页 —— 绝对不会再卡死！
function hideLoader() {
  loader.classList.add('hidden');
}

window.addEventListener('load', () => {
  setTimeout(hideLoader, 600);
});

setTimeout(hideLoader, 4000);
