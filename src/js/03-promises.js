import Notiflix from 'notiflix';
const form = document.querySelector('form');
let dataObject = {};
form.addEventListener('change', e => {
  dataObject[e.target.name] = e.target.value;
  return console.log(dataObject);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(dataObject.step);
  console.log('Submitted');
  const position = dataObject.amount;
  console.log(position);
  const delay = dataObject.step;
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
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
      }
      reject();
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }, dataObject.delay);
  });
}

// createPromise(6, 1500)
//   .then(({ position, delay }) => {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
