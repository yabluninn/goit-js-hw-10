import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysText = document.querySelector('[data-days]');
const hoursText = document.querySelector('[data-hours]');
const minutesText = document.querySelector('[data-minutes]');
const secondsText = document.querySelector('[data-seconds]');

let userSelectedDate = new Date();

startButton.disabled = true;

function validateDate(date) {
  if (date < Date.now()) {
    return false;
  } else return true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerInterface(dateObj) {
  daysText.textContent = dateObj.days.toString().padStart(2, '0');
  hoursText.textContent = dateObj.hours.toString().padStart(2, '0');
  minutesText.textContent = dateObj.minutes.toString().padStart(2, '0');
  secondsText.textContent = dateObj.seconds.toString().padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (!validateDate(userSelectedDate)) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      startButton.disabled = false;
      startButton.addEventListener('click', () => {
        startButton.disabled = true;
        dateInput.disabled = true;

        const timer = setInterval(() => {
          const leftTime = userSelectedDate.getTime() - Date.now();
          if (leftTime <= 0) {
            clearInterval(timer);
            updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            dateInput.disabled = false;
            return;
          }
          updateTimerInterface(convertMs(leftTime));
        }, 1000);
      });
    }
  },
};

flatpickr(dateInput, options);
