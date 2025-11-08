import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  const testCases = [
    { input: 23.5, expected: '23,50 zł' },
    { input: 0, expected: '0,00 zł' },
    { input: 1000, expected: '1 000,00 zł' },
    { input: 1000000, expected: '1 000 000,00 zł' },
    { input: -50, expected: '-50,00 zł' },
    { input: -1000, expected: '-1 000,00 zł' },
    { input: 23.99, expected: '23,99 zł' },
    { input: 23.1, expected: '23,10 zł' },
    { input: 23.999, expected: '24,00 zł' },
    { input: 0.01, expected: '0,01 zł' },
    { input: 0.001, expected: '0,00 zł' },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should format ${input} to "${expected}"`, () => {
      const result = formatPrice(input);
      // Porównaj po usunięciu wszystkich białych znaków
      expect(result.replace(/\s/g, '')).toBe(expected.replace(/\s/g, ''));
    });
  });
});
