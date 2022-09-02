import Notiflix from 'notiflix';

const form = document.querySelector('form');
let dataObject = {};
let delay;

form.addEventListener('change', e => {
  dataObject[e.target.name] = e.target.value;
  return console.log(dataObject);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const position = dataObject.amount;
  const delayStep = dataObject.step;
  const firstDelay = dataObject.delay;
  delay = firstDelay;
  for (let i = 1; i <= position; i += 1) {
    delay = Number(delay) + Number(delayStep);

    createPromise(i, delay)
      .then(({ position, delay }) => {
        return;
      })
      .catch(error => {
        return error;
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        );
      } else {
        reject(
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          )
        );
      }
    }, delay);
  });
}
