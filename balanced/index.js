const balanced = (s) => {
  const splittedValues = s.split('');

  const countersMap = splittedValues.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;

    return acc;
  }, {});

  const wildCards = countersMap['*'];
  delete countersMap['*'];

  const justNumbers = Object.values(countersMap);

  if (wildCards && !justNumbers.length) {
    return true;
  }

  justNumbers.sort();

  const highestValue = justNumbers[justNumbers.length - 1];
  
  const thereAreDiff = justNumbers.filter(value => value < highestValue)
  
  if (!wildCards) {
    return !thereAreDiff.length;
  }

  const lettersInString = Object.keys(countersMap);

  const avaiableLetters = 'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ'.split('').filter(letter => {
    return !lettersInString.includes(letter);
  });

  const wildCardsNeeded = justNumbers.reduce((acc, cur) => {
    acc += highestValue - cur;

    return acc;
  }, 0);

  if (wildCardsNeeded === wildCards || justNumbers.length === wildCards) {
    return true;
  }

  if (wildCardsNeeded < wildCards) {
    const over = wildCards - wildCardsNeeded;

    if (
      (over % highestValue === 0 && avaiableLetters.length >= over / highestValue) || 
      (over === justNumbers.length) ||
      (over % justNumbers.length === 0)
    ) {
      return true;
    }
  } 

  return false;
}

const obj = {
  'aaabc****': true,
  'aaabc*****': false,
  'aaabc*************************': true,
  'aabcd*******': true,
  'a': true,
  'ab': true,
  '*': true,
  'aabb**': true,
  '*aaaaaaa': true,
  'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ': true,
  'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ****************************************************': true,
  'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ*': false,
  'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ****': false,
  'abcdefghijklmnopqrstuvxwyz****************************************************': true,
  'AA*BB*CC*DD*EE**': true,
  'AA*BB*CC*DD*EE***': false,
  'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWabcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVX*****': true,
}

Object.keys(obj).map(value => {
  console.time(value);
  if (balanced(value) !== obj[value]) {
    console.log('------- failed ------')
    console.log(`expected ${balanced(value)} to be ${obj[value]}`)
  } else {
    console.log('------- passed ------')
  }
  console.timeEnd(value);
});

// a*aabc*******

// a*aabc****