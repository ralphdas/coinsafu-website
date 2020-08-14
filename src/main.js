import './scss/main.scss';
// templates
import './templates/index.pug';
import './templates/buy.pug';
import './templates/buy.pug';

import axios from 'axios';

const modalContainerElem = document.querySelector('.csu__modal-container');
const modalCloseElem = document.querySelector('.csu__modal-dialog-close');
const formElem = document.querySelector('.csu__submit-form');
const inputElem = document.querySelector('.csu__email-input');

modalCloseElem.addEventListener('click', closeModal);
formElem.addEventListener('submit', onSubmitHandler);

function onSubmitHandler(event) {
  event.preventDefault();
  const formData = new FormData(formElem);
  axios
    .post('./api/mailchimp-submit.php', formData)
    .then(data => {
      if (data.status === 200) {
        openModal();
        inputElem.value = '';
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function openModal() {
  modalContainerElem.classList.remove('hidden');
}

function closeModal() {
  modalContainerElem.classList.add('hidden');
}
