// 点击切换图片（手动翻页）
const items = document.querySelectorAll('.carousel-item');
let index = 0;

// 显示当前第一张
function showSlide() {
  items.forEach(item => item.classList.remove('active'));
  items[index].classList.add('active');
}

// 初始化
showSlide();

// 点击页面 → 下一张
document.addEventListener('click', () => {
  index = (index + 1) % items.length;
  showSlide();
});

// ====================
// 鼠标跟随效果（保留）
// ====================
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor2.style.left = e.clientX + 'px';
  cursor2.style.top = e.clientY + 'px';
});
