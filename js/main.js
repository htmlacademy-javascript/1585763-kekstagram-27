import {renderPost} from './render-posts.js';
import {showAlert} from './util.js';
import {getPhotos} from './api.js';
import {setModalHandlers} from './upload-photo-form.js';
import {registerFilters, filterPhotos} from './filters.js';

const onPhotoLoaded = (photos) => {
  renderPost(photos);
  setModalHandlers();
  registerFilters(() => filterPhotos(photos));
};

const onPhotoLoadError = () => showAlert('Не удалось загрузить фотографии');

getPhotos(onPhotoLoaded, onPhotoLoadError);
