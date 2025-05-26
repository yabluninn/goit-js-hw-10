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
        resolve('✅ Notification fulfilled!');
      } else {
        reject('❌ Notification rejected!');
      }
    }, delay);
  })
    .then(message => {
      iziToast.success({
        title: 'Success',
        message: message,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error,
      });
    });
});
