import {generatePosts} from './data.js';

const randomPosts = generatePosts();
const postsContainers = document.querySelector('.pictures');
const postsTemplate = document.querySelector('#picture').content.querySelectorAll('.picture');
const postsFragment = document.createDocumentFragment();

randomPosts.forEach(({url, description, likes}) => {
  const postsElement = postsTemplate.cloneNode(true);
  postsElement.querySelector('.picture__img').src = url;
  postsElement.querySelector('.picture__comments').textContent = description;
  postsElement.querySelector('.picture__likes').textContent = likes;
  postsFragment.append(postsElement);
});

postsContainers.append(postsFragment);
