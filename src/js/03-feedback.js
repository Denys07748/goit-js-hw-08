import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
const emailEl = formEl.querySelector('input[name="email"]');
const messageEl = formEl.querySelector('textarea[name="message"]');

formEl.addEventListener('input', throttle(onInputState, 500));
formEl.addEventListener('submit', onFormSubmit);

onPopulateForm();

function onFormSubmit(evt) {
  evt.preventDefault();

  if (emailEl.value === '' || messageEl.value === '') {
    alert('Заповніть всі поля!');
    return;
  }

  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));

  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onInputState(evt) {
  let formData = localStorage.getItem(LOCALSTORAGE_KEY);
  formData = formData ? JSON.parse(formData) : {};
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onPopulateForm() {
  let savedData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedData) {
    try {
      let formData = JSON.parse(savedData);
      emailEl.value = formData.email;
      messageEl.value = formData.message;
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }
}
