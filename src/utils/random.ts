/**
 * Get a random float between min and max
 * @param min
 * @param max
 * @param decimals
 * @returns
 */
export function getRandomFloat(min: number, max: number, decimals: number) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}
/**
 * Get a random number between min and max
 * @param min
 * @param max
 * @returns
 */
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
