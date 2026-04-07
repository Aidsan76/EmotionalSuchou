// 轮播逻辑
const items = document.querySelectorAll('.carousel-item');
let index = 0;

function showSlide() {
  items.forEach(item => item.classList.remove('active'));
  items[index].classList.add('active');
  index = (index + 1) % items.length;
}

showSlide();
setInterval(showSlide, 4000);

// 鼠标跟随
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor2.style.left = e.clientX + 'px';
  cursor2.style.top = e.clientY + 'px';
});
