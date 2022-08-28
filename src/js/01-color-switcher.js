const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', changeBackgroundColor);

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  // startBtn.addEventListener('click', changeBackgroundColor);
});

function changeBackgroundColor() {
  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);

  if (timerId) {
    startBtn.disabled = true;
    // startBtn.removeEventListener('click', changeBackgroundColor);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
