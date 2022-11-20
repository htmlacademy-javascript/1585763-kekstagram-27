/*import {getRandomArrayElement, generatorNumber} from './util.js';

const DESCRIPTIONS = [
  'Если смогу, я сделаю это. Конец истории.',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон.',
  'Ни о чем не беспокойтесь. Потому что все лучшие умы на работе.',
  'Жизнь — это всего лишь серия крошечных чудес, поэтому обратите внимание на них.',
  'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.',
  'Утром, только одна хорошая мысль меняет смысл целого дня.',
  'Мечтайте. Поверьте, в это. Добейтесь этого.',
  'Улыбайтесь, потому что это делает всех нас красивыми.',
  'Воскресенье — еще один способ сказать: «Какой чудесный день!»',
  'Это моя жизнь, и мне так повезло ее жить.',
];

const USERS_NAMES = [
  'Артём',
  'Сергей',
  'Элеонора',
  'Лиза',
  'Анастасия',
  'Таня',
  'Рома',
  'Пётор',
  'Иван',
  'Андрей',
  'Михаил',
];

const USERS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_POST_COUNT = 25;

const generateIndex = () => {
  let id = 0;
  return () => {
    id++;
    return id;
  };
};

const getId = generateIndex();

function makeCommentsContent () {
  const index = getId();
  return {
    id: index,
    avatar: `img/avatar-${index}.svg`,
    message: getRandomArrayElement(USERS_MESSAGES),
    name: getRandomArrayElement(USERS_NAMES)
  };
}

const createPost = (numberPhoto) => ({
  id: numberPhoto + 1,
  url: `photos/${numberPhoto + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generatorNumber(15, 200),
  comments: Array.from({length: 8}, makeCommentsContent),
});

const generatePosts = () => Array.from({length: SIMILAR_POST_COUNT}, (_, numberPhoto) => createPost(numberPhoto));

export {generatePosts};*/
