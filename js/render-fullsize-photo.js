const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.cancel');

const fragmentComment = document.createDocumentFragment();

const renderFullSizePhoto = (postsElement) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = postsElement.url;
  likesCount.textContent = postsElement.likes;
  commentsCount.textContent = postsElement.comments;
  socialCaption.textContent = postsElement.description;

  postsElement.forEach(({avatar, message}) => {
    const postComment = postsElement.comments;
    const comment = document.createElement('li');
    const commentImg = document.createElement('img');
    const commentText = document.createElement('p');
    comment.classList.add('social__comment');
    commentImg.classList.add('social__picture');
    commentText.classList.add('social__text');
    comment.append(commentImg);
    comment.append(commentText);
    commentImg.src = avatar;
    commentText.textContent = message;
    fragmentComment.append(comment);
  });
  socialComments.innerHTML = '';
  socialComments.append(fragmentComment);
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
};

const closeModal = function () {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
};

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

bigPictureClose.addEventListener('click', closeModal, {once: true});

body.addEventListener('keydown', closeModalEsc, {once: true});

export {renderFullSizePhoto};
