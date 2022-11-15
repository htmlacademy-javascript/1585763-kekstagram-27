const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const EFFECTS = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};


const form = document.querySelector('.img-upload__form');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const uploadFileInput = form.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview img');
const scaleUp = document.querySelector('.scale__control--bigger');
const scaleDown = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');


// Создание слайдера
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

// настройки для фото
const photoSettings = {
  scale: SCALE_MAX,
  effect: EFFECTS.NONE,
  effectLevel: 100,
};

// применение новых параметров слайдера
const updateEffectLevelSlider = (effect) => {
  let min = 1;
  let max = 100;
  let step = 1;
  switch (effect) {
    case EFFECTS.NONE:
      break;
    case EFFECTS.CHROME:
    case EFFECTS.SEPIA:
      min = 0;
      max = 1;
      step = 0.1;
      break;
    case EFFECTS.MARVIN:
      min = 0;
      max = 100;
      step = 1;
      break;
    case EFFECTS.PHOBOS:
      min = 0;
      max = 3;
      step = 0.1;
      break;
    case EFFECTS.HEAT:
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

// метод применения эффекта к фото
const applyPhotoEffect = () => {
  switch (photoSettings.effect) {
    case EFFECTS.NONE:
      uploadPreview.style.filter = null;
      break;
    case EFFECTS.CHROME:
      uploadPreview.style.filter = `grayscale(${photoSettings.effectLevel})`;
      break;
    case EFFECTS.SEPIA:
      uploadPreview.style.filter = `sepia(${photoSettings.effectLevel})`;
      break;
    case EFFECTS.MARVIN:
      uploadPreview.style.filter = `invert(${photoSettings.effectLevel}%)`;
      break;
    case EFFECTS.PHOBOS:
      uploadPreview.style.filter = `blur(${photoSettings.effectLevel}px)`;
      break;
    case EFFECTS.HEAT:
      uploadPreview.style.filter = `brightness(${photoSettings.effectLevel})`;
      break;
  }
};

// метод для задания нового значения масштаб
const updatePhotoScale = (value) => {
  photoSettings.scale = value;
  scaleValue.value = `${value}%`;
  uploadPreview.style.transform = `scale(${value / 100})`;
};

// метод для задания нового значения эффект
const updatePhotoEffect = (value) => {
  photoSettings.effect = value;
  if (value === EFFECTS.NONE) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

// метод для задания нового значения интенсивность эффекта
const updatePhotoEffectLevel = (value) => {
  effectLevelValue.value = value;
  photoSettings.effectLevel = value;
};

// Валидация формы
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
  });
  document.body.addEventListener('keydown', hideModalEsc, {once: true});

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

  // событие на смену эффекта
  const effectsRadio = document.querySelectorAll('.effects__radio');
  effectsRadio.forEach((radio) => radio.addEventListener('change', () => {
    updateEffectLevelSlider(radio.value);
    updatePhotoEffect(radio.value);
    applyPhotoEffect();
  }));

  // при изменении слайдера
  effectLevelSlider.noUiSlider.on('update', () => {
    updatePhotoEffectLevel(effectLevelSlider.noUiSlider.get());
    applyPhotoEffect();
  });
};

setModalHandlers();

