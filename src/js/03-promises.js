import Notiflix from 'notiflix';

const form = document.querySelector('form');
let dataObject = {};

form.addEventListener('change', e => {
  dataObject[e.target.name] = e.target.value;
  return console.log(dataObject);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const position = dataObject.amount;
  const delay = dataObject.step;

  setTimeout(() => {
    for (let i = 1; i <= position; i += 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          resolve();
        })
        .catch(({ position, delay }) => {
          reject();
        });
    }
  }, delay);
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    console.log(shouldResolve);
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
    }, dataObject.delay);
  });
}
