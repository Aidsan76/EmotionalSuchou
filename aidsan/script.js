const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.dots');
const customCursor = document.getElementById('customCursor');
const loader = document.getElementById('loader');
let index = 0;

function loadImg(img) {
  if (img && img.dataset.src && !img.src) {
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

createDots();
update();
setInterval(next, 15000);

// 圆点点击（强制生效）
document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.onclick = () => {
    index = i;
    update();
  };
});

let touchStartX = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
document.addEventListener('touchend', e => {
  const diffX = e.changedTouches[0].screenX - touchStartX;
  if (diffX < -50) next();
  if (diffX > 50) prev();
}, { passive: true });


if (customCursor) {
  customCursor.style.display = 'block';
  document.addEventListener('mousemove', e => {
    const x = e.clientX - customCursor.offsetWidth / 2;
    const y = e.clientY - customCursor.offsetHeight / 2;
    customCursor.style.left = x + 'px';
    customCursor.style.top = y + 'px';
  });
}

function hideLoader() {
  if (loader) loader.classList.add('hidden');
}
window.addEventListener('load', () => setTimeout(hideLoader, 600));
setTimeout(hideLoader, 4000);
