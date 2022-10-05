function generatorNumber(numberOne, numberTwo) {
  if ((numberOne >= 0 && numberTwo >= 0) && (numberOne !== numberTwo && numberOne < numberTwo)) {
    return Math.floor(Math.random() * (numberTwo - numberOne + 1)) + numberOne;
  }
  if ((numberOne < 0 || numberTwo < 0) || (numberOne >= numberTwo)) {
    return NaN;
  }
}

// eslint-disable-next-line no-console
console.log(generatorNumber(1, 100));

function rowLimit(string, number) {
  return string.length <= number;
}

// eslint-disable-next-line no-console
console.log(rowLimit('Привет', 2));
