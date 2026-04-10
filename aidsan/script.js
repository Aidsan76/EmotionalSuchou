const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const customCursor = document.getElementById('customCursor');
let index = 0;

// 懒加载图片
function loadImg(img) {
  if (img.dataset.src && !img.src) {
    img.src = img.dataset.src;
  }
}

// 生成小圆点
function createDots() {
  items.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
}

// 更新显示 + 懒加载当前图片
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

// 切换
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

// 事件
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    update();
  });
});

// 滑动切换
let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
document.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (diff < -50) next();
  if (diff > 50) prev();
});

// 鼠标
document.addEventListener('mousemove', e => {
  customCursor.style.left = e.clientX + 'px';
  customCursor.style.top = e.clientY + 'px';
});
