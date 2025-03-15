import { getFavoriteFruit } from './getFavoriteFruit';

if (process.env.SDEBUG) {
  const fruit = getFavoriteFruit('Apple 🍎');
  console.log(fruit);
}

export { getFavoriteFruit };
