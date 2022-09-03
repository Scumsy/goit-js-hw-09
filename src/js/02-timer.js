import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const displayDays = document.querySelector('[data-days]');
const displayHours = document.querySelector('[data-hours]');
const displayMinutes = document.querySelector('[data-minutes]');
const displaySeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates);
  },
};

const dueDate = flatpickr('#datetime-picker', options);

function checkDate(date) {
  if (date[0].getTime() < options.defaultDate.getTime()) {
    Notiflix.Notify.warning('Please choose a date in the future');
    startBtn.disabled = true;
    return;
  } else {
    startBtn.disabled = false;
    startBtn.addEventListener('click', () => {
      startBtn.disabled = true;
      dueDate.input.disabled = true;
      setInterval(() => {
        getTimeCountDown(date);
      }, 1000);
    });
  }
}

function getTimeCountDown(date) {
  const ms = date[0].getTime() - Date.now();
  convertMs(ms);
  if (ms < 0) {
    convertMs(0);
    return;
  }
  return;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  displayDays.textContent = days;
  displayHours.textContent = hours;
  displayMinutes.textContent = minutes;
  displaySeconds.textContent = seconds;

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
