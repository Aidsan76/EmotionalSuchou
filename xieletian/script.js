const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.dots');
let index = 0;

// 生成小圆点
function createDots() {
  items.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
}

// 更新显示
function update() {
  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// 上一张 / 下一张
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

// 小圆点点击
document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    update();
  });
});

// 手机滑动切换
let touchStartX = 0;
let touchEndX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 50) next();
  if (touchEndX > touchStartX + 50) prev();
});

const customCursor = document.getElementById('customCursor');
document.addEventListener('mousemove', e => {
  customCursor.style.display = 'block';
  customCursor.style.left = e.clientX + 'px';
  customCursor.style.top = e.clientY + 'px';
});
