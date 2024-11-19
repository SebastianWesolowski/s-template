import { getFavoriteFruit } from '../getFavoriteFruit';

describe('getFavoriteFruit', () => {
  it('should return the favorite fruit', () => {
    expect(getFavoriteFruit()).toBe('My favorite fruit is Watermelon 🍉');
  });

  it('should return the favorite fruit with a custom fruit', () => {
    expect(getFavoriteFruit('Apple 🍎')).toBe('My favorite fruit is Apple 🍎');
  });

  it('should return error if fruit is not a string', () => {
    expect(() => getFavoriteFruit(1 as any)).toThrow('Fruit must be a string');
  });
});
