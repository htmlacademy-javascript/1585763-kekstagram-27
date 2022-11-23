const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.cancel');
const fragmentComment = document.createDocumentFragment();
const COMMENTS_PER_PAGE = 5;
let showCommentsCounter = 0;
let comments = [];

const getComments = () => {
  const showComments = comments.slice(showCommentsCounter, showCommentsCounter + COMMENTS_PER_PAGE);
  showCommentsCounter += showComments.length;
  showComments.forEach((photoComment) => {
    const comment = document.createElement('li');
    const commentImg = document.createElement('img');
    const commentText = document.createElement('p');
    comment.classList.add('social__comment');
    commentImg.classList.add('social__picture');
    commentText.classList.add('social__text');
    comment.appendChild(commentImg);
    comment.appendChild(commentText);
    commentImg.src = photoComment.avatar;
    commentText.textContent = photoComment.message;
    fragmentComment.appendChild(comment);
  });
  socialComments.appendChild(fragmentComment);
};

const showMoreComments = () => {
  getComments();
  const commentTemplate = `${showCommentsCounter} из <span class="comments-count">${comments.length}</span> комментариев`;
  if (comments.length > COMMENTS_PER_PAGE) {
    socialCommentCount.innerHTML = commentTemplate;
  }
  if (showCommentsCounter === comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
  document.body.removeEventListener('keydown', escKeyDownHandler);
  bigPictureClose.removeEventListener('click', closeModalClickHandler);
  commentsLoader.removeEventListener('click', showMoreCommentsClickHandler);
};

const openBigPhoto = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const fillInformation = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  socialComments.innerHTML = '';
  showCommentsCounter = 0;
  comments = photo.comments;
  showMoreComments();
};

const hideForm = () => {
  commentsLoader.addEventListener('click', showMoreCommentsClickHandler);
  document.body.addEventListener('keydown', escKeyDownHandler);
  bigPictureClose.addEventListener('click', closeModalClickHandler);
};

function escKeyDownHandler(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

function showMoreCommentsClickHandler() {
  showMoreComments();
}

function closeModalClickHandler() {
  showMoreComments();
  closeModal();
}

export {hideForm, openBigPhoto, fillInformation};
