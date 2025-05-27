import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delayValue => {
      iziToast.success({
        title: 'Success',
        message: `✅Fulfilled promise in ${delayValue}ms`,
      });
    })
    .catch(delayValue => {
      iziToast.error({
        title: 'Error',
        message: `❌Rejected promise in ${delayValue}ms`,
      });
    });
});
