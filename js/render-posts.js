import {closingForm, openBigPhoto, fillInformation} from './render-fullsize-photo.js';

const clearListing = () => {
  const pics = document.querySelectorAll('.picture');
  pics.forEach((pic) => {
    pic.remove();
  });
};

const renderPost = (photos) => {
  clearListing();

  const listing = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const element = pictureTemplate.cloneNode(true);
    const image = element.querySelector('.picture__img');
    const comments = element.querySelector('.picture__comments');
    const likes = element.querySelector('.picture__likes');
    image.src = photo.url;
    comments.textContent = photo.comments.length;
    likes.textContent = photo.likes;
    fragment.appendChild(element);
  });

  listing.appendChild(fragment);

  const thumbnails = document.querySelectorAll('.picture');
  const addThumbnailClickHandler = (thumbnail, photo) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      fillInformation(photo);
      openBigPhoto();
      closingForm();
    });
  };
  thumbnails.forEach((thumbnail, i) => {
    addThumbnailClickHandler(thumbnail, photos[i]);
  });
};

export {renderPost};
