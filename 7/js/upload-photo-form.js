const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;

const form = document.querySelector('.img-upload__form');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const uploadFileInput = form.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const buttonSubmit = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

function validateHashtags(value) {
  if (value === '') {
    return true;
  }
  const hashtags = value
    .replace(/\s\s+/g, ' ')
    .trim()
    .split(' ');
  if (hashtags.length > MAX_HASHTAG_COUNT ) {
    return false;
  }
  const uniqueHashtags = hashtags
    .map((hashtag) => hashtag.toLowerCase())
    .filter((hashtag, index, self) => self.indexOf(hashtag) === index);
  if (uniqueHashtags.length < hashtags.length) {
    return false;
  }
  return hashtags.every((hashtag) => {
    if (hashtag.length < MIN_HASHTAG_LENGTH || hashtag.length > MAX_HASHTAG_LENGTH) {
      return false;
    }
    if (hashtag[0] !== '#') {
      return false;
    }
    return /^[0-9a-zа-яё]*$/i.test(hashtag.substring(1)) !== false;
  });
}

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtags,
  'Неверные хэштеги'
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Можно отправлять');
  } else {
    // eslint-disable-next-line no-console
    console.log('Нельзя отправлять');
  }
});

const showModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideModal = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function hideModalEsc(evt) {
  if (evt.key === 'Escape') {
    hideModal();
  }
}

const setModalHandlers = () => {
  uploadFileInput.addEventListener('change', () => {
    showModal();
  });
  cancelButton.addEventListener('click', () => {
    hideModal();
    document.body.addEventListener('keydown', hideModalEsc);
  });
};

setModalHandlers();

