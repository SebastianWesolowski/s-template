export const getFavoriteFruit = (fruit = 'Watermelon 🍉'): string => {
  if (typeof fruit !== 'string') {
    throw new Error('Fruit must be a string');
  }
  return `My favorite fruit is ${fruit}`;
};
