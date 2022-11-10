function generatorNumber(numberOne, numberTwo) {
  if ((numberOne < 0 || numberTwo < 0) || (numberOne >= numberTwo)) {
    return NaN;
  }

  return Math.floor(Math.random() * (numberTwo - numberOne + 1)) + numberOne;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayElement = (elements) => elements[generatorNumber(0, elements.length - 1)];

export {getRandomArrayElement, generatorNumber, isEscapeKey};
