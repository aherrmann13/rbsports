import { Cinderella, Favorite, isCinderella, isFavorite, isSleeper, Sleeper, Team } from 'types/bracket';

describe('type guard', () => {
  const favorites: Favorite[] = [1, 2, 3, 17, 18, 19, 33, 34, 35, 49, 50, 51];
  const sleepers: Sleeper[] = [4, 5, 6, 7, 8, 20, 21, 22, 23, 24, 36, 37, 38, 39, 40, 52, 53, 54, 55, 56];
  const cinderellas: Cinderella[] = [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
  ];
  const invalidTeams: Team[] = [65 as Team, 66 as Team];
  describe('isFavorite', () => {
    test.each(favorites)('should return true for [%p]', (favorite) => {
      expect(isFavorite(favorite)).toBe(true);
    });
    test.each([...sleepers, ...cinderellas, ...invalidTeams])('should return false for [%p]', (other) => {
      expect(isFavorite(other)).toBe(false);
    });
  });
  describe('isSleeper', () => {
    test.each(sleepers)('should return true for [%p]', (sleeper) => {
      expect(isSleeper(sleeper)).toBe(true);
    });
    test.each([...favorites, ...cinderellas, ...invalidTeams])('should return false for [%p]', (other) => {
      expect(isSleeper(other)).toBe(false);
    });
  });
  describe('isCinderella', () => {
    test.each(cinderellas)('should return true for [%p]', (cinderella) => {
      expect(isCinderella(cinderella)).toBe(true);
    });
    test.each([...favorites, ...sleepers, ...invalidTeams])('should return false for [%p]', (other) => {
      expect(isCinderella(other)).toBe(false);
    });
  });
});
