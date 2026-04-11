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

// ================== 自定义鼠标 - 改进版 ==================
const customCursor = document.getElementById('customCursor');

// 默认隐藏
customCursor.style.display = 'none';

// 更宽松的桌面检测：只要有鼠标移动事件，就显示自定义光标
let isDesktop = true;

function showCustomCursor() {
  if (customCursor.style.display !== 'block') {
    customCursor.style.display = 'block';
    console.log('自定义鼠标已显示'); // 方便你在控制台查看是否触发
  }
}

function hideCustomCursor() {
  customCursor.style.display = 'none';
}

// 监听鼠标移动 → 显示自定义光标（这是最可靠的方式）
document.addEventListener('mousemove', (e) => {
  showCustomCursor();
  customCursor.style.left = e.clientX + 'px';
  customCursor.style.top = e.clientY + 'px';
}, { passive: true });

// 如果检测到触摸操作，就隐藏自定义光标（防止手机上残留）
document.addEventListener('touchstart', () => {
  hideCustomCursor();
}, { passive: true });

// 额外保险：页面加载后，如果有鼠标，就强制尝试显示一次
window.addEventListener('load', () => {
  // 延迟一点，确保 DOM 完全就绪
  setTimeout(() => {
    // 如果之前有 mousemove，就已经显示了
    if (customCursor.style.display !== 'block') {
      // 模拟一次 mousemove 来触发
      const event = new MouseEvent('mousemove', {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
      });
      document.dispatchEvent(event);
    }
  }, 800);
});
// 加载完成关闭 loader
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 600);
});
