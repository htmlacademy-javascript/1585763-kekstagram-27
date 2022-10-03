function generatorNumber(numberOne, numberTwo) {
  if ((numberOne >= 0 && numberTwo >= 0) && (numberOne !== numberTwo) && (numberOne < numberTwo)) {
    return Math.floor(Math.random() * (numberTwo - numberOne + 1)) + numberOne;
  } else if ((numberOne !== Number || numberOne < 0) || (numberTwo !== Number || numberTwo < 0)) {
    return NaN;
  } else if (numberOne >= numberTwo) {
    return NaN;
  }
}

console.log(generatorNumber(1, 100));

function rowLimit(string, number) {
  if (string.length <= number) {
    return true;
  } else {
    return false;
  }
}

console.log(rowLimit('Привет', 2));
