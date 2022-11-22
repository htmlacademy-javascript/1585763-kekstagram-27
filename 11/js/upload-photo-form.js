import {uploadPhoto} from './api.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview img');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const scaleUp = document.querySelector('.scale__control--bigger');
const scaleDown = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const uploadForm = document.querySelector('#upload-select-image');
const uploadSubmit = document.querySelector('#upload-submit');
const uploadFileInput = document.querySelector('#upload-file');
const cancel = document.querySelector('#upload-cancel');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const COMMENT_MAX_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const hashtagReg = /^[0-9a-zа-яё]*$/i;
const Effects = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'invalid',
  successClass: 'valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-error'
}, false);

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
    return hashtagReg.test(hashtag.substring(1)) !== false;
  });
}

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  validateHashtags,
  'Неверные хэштеги'
);

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  validateComment,
  'Неверный комментарий'
);

const photoSettings = {
  scale: SCALE_MAX,
  effect: Effects.NONE,
  effectLevel: 100,
};

const updateEffectLevelSlider = (effect) => {
  let min = 1;
  let max = 100;
  let step = 1;
  switch (effect) {
    case Effects.NONE:
      break;
    case Effects.CHROME:
    case Effects.SEPIA:
      min = 0;
      max = 1;
      step = 0.1;
      break;
    case Effects.MARVIN:
      min = 0;
      max = 100;
      step = 1;
      break;
    case Effects.PHOBOS:
      min = 0;
      max = 3;
      step = 0.1;
      break;
    case Effects.HEAT:
      min = 1;
      max = 3;
      step = 0.1;
      break;
  }
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    step
  });
  effectLevelSlider.noUiSlider.set(max);
};

const applyPhotoEffect = () => {
  switch (photoSettings.effect) {
    case Effects.NONE:
      uploadPreview.style.filter = null;
      break;
    case Effects.CHROME:
      uploadPreview.style.filter = `grayscale(${photoSettings.effectLevel})`;
      break;
    case Effects.SEPIA:
      uploadPreview.style.filter = `sepia(${photoSettings.effectLevel})`;
      break;
    case Effects.MARVIN:
      uploadPreview.style.filter = `invert(${photoSettings.effectLevel}%)`;
      break;
    case Effects.PHOBOS:
      uploadPreview.style.filter = `blur(${photoSettings.effectLevel}px)`;
      break;
    case Effects.HEAT:
      uploadPreview.style.filter = `brightness(${photoSettings.effectLevel})`;
      break;
  }
};

const updatePhotoScale = (value) => {
  photoSettings.scale = value;
  scaleValue.value = `${value}%`;
  uploadPreview.style.transform = `scale(${value / 100})`;
};

const updatePhotoEffect = (value) => {
  photoSettings.effect = value;
  if (value === Effects.NONE) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

const updatePhotoEffectLevel = (value) => {
  effectLevelValue.value = value;
  photoSettings.effectLevel = value;
};

const resetPhotoSettings = () => {
  updateEffectLevelSlider(Effects.NONE);
  updatePhotoEffect(Effects.NONE);
  applyPhotoEffect();
  updatePhotoScale(SCALE_MAX);
};

const closeForm = () => {
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', closeUploadEscClickHandler);
  cancel.removeEventListener('keydown', cancelClickHandler);
};

const showForm = (file) => {
  resetPhotoSettings();
  uploadPreview.src = URL.createObjectURL(file);
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', closeUploadEscClickHandler);
  cancel.addEventListener('click', cancelClickHandler);
};

const closeSuccess = () => {
  document.body.removeChild(document.querySelector('.success'));
  document.body.removeEventListener('keydown', closeSuccessKeyDownClickHandler);
  cancel.click();
};

const closeError = () => {
  document.body.removeChild(document.querySelector('.error'));
  document.body.removeEventListener('keydown', closeErrorEscClickHandler);
};

const onSuccessSend = () => {
  const success = successTemplate.cloneNode(true);
  document.body.appendChild(success);
  document.body.addEventListener('keydown', closeSuccessKeyDownClickHandler);
  document.querySelector('.success').addEventListener('click', outerSuccessClickHandler);
  document.querySelector('.success__button').addEventListener('click', closeSuccessClickHandler);
};

const onErrorSend = () => {
  const error = errorTemplate.cloneNode(true);
  document.body.appendChild(error);
  document.body.addEventListener('keydown', closeErrorEscClickHandler);
  document.querySelector('.error').addEventListener('click', outerErrorClickHandler);
  document.querySelector('.error__button').addEventListener('click', closeErrorClickHandler);
};

const sendForm = () => {
  uploadSubmit.setAttribute('disabled', 'true');
  const formData = new FormData(uploadForm);
  uploadPhoto(formData, onSuccessSend, onErrorSend)
    .finally(() => {
      uploadSubmit.removeAttribute('disabled');
    });
};

const setModalHandlers = () => {
  uploadFileInput.onchange = () => {
    showForm(uploadFileInput.files[0]);
  };
  uploadForm.addEventListener('submit', (evt) => {
    const valid = pristine.validate();
    evt.preventDefault();
    if (valid) {
      sendForm();
    }
  });
  scaleUp.addEventListener('click', () => {
    if (photoSettings.scale < SCALE_MAX) {
      updatePhotoScale(photoSettings.scale + SCALE_STEP);
    }
  });
  scaleDown.addEventListener('click', () => {
    if (photoSettings.scale > SCALE_MIN) {
      updatePhotoScale(photoSettings.scale - SCALE_STEP);
    }
  });
  const effectsRadio = document.querySelectorAll('.effects__radio');
  effectsRadio.forEach((radio) => radio.addEventListener('change', () => {
    updateEffectLevelSlider(radio.value);
    updatePhotoEffect(radio.value);
    applyPhotoEffect();
  }));
  effectLevelSlider.noUiSlider.on('update', () => {
    updatePhotoEffectLevel(effectLevelSlider.noUiSlider.get());
    applyPhotoEffect();
  });
};

function closeSuccessKeyDownClickHandler(evt) {
  if (evt.key === 'Escape' && document.querySelector('.success')) {
    closeSuccess();
  }
}

function outerSuccessClickHandler(evt) {
  {
    if (evt.target === evt.currentTarget) {
      closeSuccess();
    }
  }
}

function closeSuccessClickHandler() {
  closeSuccess();
}

function closeErrorEscClickHandler (evt) {
  if (evt.key === 'Escape' && document.querySelector('.error')) {
    closeError();
  }
}

function outerErrorClickHandler(evt) {
  {
    if (evt.target === evt.currentTarget) {
      closeError();
    }
  }
}

function closeErrorClickHandler() {
  closeError();
}

function closeUploadEscClickHandler(evt) {
  if (evt.key === 'Escape') {
    if (document.querySelector('.success') || document.querySelector('.error')) {
      return;
    }
    if (document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
      cancel.click();
    }
  }
}

function cancelClickHandler() {
  closeForm();
}

export {setModalHandlers};
