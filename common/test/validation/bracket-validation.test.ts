import { Bracket } from 'types/bracket';
import {
  validateBracket,
  DuplicateFavoriteError,
  DuplicateSleeperError,
  DuplicateCinderellaError,
} from 'validation/bracket-validation';
import * as E from 'fp-ts/Either';

describe('validate', () => {
  const bracket: Bracket = {
    regional: {
      region1Favorite: 3,
      region1Sleeper: 4,
      region1Cinderella: 15,
      region2Favorite: 17,
      region2Sleeper: 22,
      region2Cinderella: 31,
      region3Favorite: 33,
      region3Sleeper: 40,
      region3Cinderella: 48,
      region4Favorite: 49,
      region4Sleeper: 52,
      region4Cinderella: 62,
      bonusFavorite: 1,
      bonusSleeper: 5,
      bonusCinderella: 14,
    },
    sweetSixteen: {
      favorite: 3,
      sleeper: 7,
      cinderella: 16,
    },
    fastbreakTrio: {
      favorite: 1,
      sleeper: 20,
      cinderella: 59,
    },
    finalFour: {
      region1: 1,
      region2: 19,
      region3: 37,
      region4: 64,
    },
    tournamentChoice: 13,
    graveyard: 1,
    totalPointsScored: 150,
  };
  it('should return right with bracket for valid bracket', () => {
    const result = validateBracket(bracket);

    expect(result).toEqual(E.right(bracket));
  });
  describe('should return left with error when bonus favorite', () => {
    it('is the same as the region1 favorite', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusFavorite: bracket.regional.region1Favorite },
      });

      expect(result).toEqual(E.left([DuplicateFavoriteError(bracket.regional.region1Favorite)]));
    });
    it('is the same as the region2 favorite', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusFavorite: bracket.regional.region2Favorite },
      });

      expect(result).toEqual(E.left([DuplicateFavoriteError(bracket.regional.region2Favorite)]));
    });
    it('is the same as the region3 favorite', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusFavorite: bracket.regional.region3Favorite },
      });

      expect(result).toEqual(E.left([DuplicateFavoriteError(bracket.regional.region3Favorite)]));
    });
    it('is the same as the region4 favorite', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusFavorite: bracket.regional.region4Favorite },
      });

      expect(result).toEqual(E.left([DuplicateFavoriteError(bracket.regional.region4Favorite)]));
    });
  });
  describe('should return left with error when bonus sleeper', () => {
    it('is the same as the region1 sleeper', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusSleeper: bracket.regional.region1Sleeper },
      });

      expect(result).toEqual(E.left([DuplicateSleeperError(bracket.regional.region1Sleeper)]));
    });
    it('is the same as the region2 sleeper', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusSleeper: bracket.regional.region2Sleeper },
      });

      expect(result).toEqual(E.left([DuplicateSleeperError(bracket.regional.region2Sleeper)]));
    });
    it('is the same as the region3 sleeper', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusSleeper: bracket.regional.region3Sleeper },
      });

      expect(result).toEqual(E.left([DuplicateSleeperError(bracket.regional.region3Sleeper)]));
    });
    it('is the same as the region4 sleeper', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusSleeper: bracket.regional.region4Sleeper },
      });

      expect(result).toEqual(E.left([DuplicateSleeperError(bracket.regional.region4Sleeper)]));
    });
  });
  describe('should return left with error when bonus cinderella', () => {
    it('is the same as the region1 cinderella', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusCinderella: bracket.regional.region1Cinderella },
      });

      expect(result).toEqual(E.left([DuplicateCinderellaError(bracket.regional.region1Cinderella)]));
    });
    it('is the same as the region2 cinderella', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusCinderella: bracket.regional.region2Cinderella },
      });

      expect(result).toEqual(E.left([DuplicateCinderellaError(bracket.regional.region2Cinderella)]));
    });
    it('is the same as the region3 cinderella', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusCinderella: bracket.regional.region3Cinderella },
      });

      expect(result).toEqual(E.left([DuplicateCinderellaError(bracket.regional.region3Cinderella)]));
    });
    it('is the same as the region4 cinderella', () => {
      const result = validateBracket({
        ...bracket,
        regional: { ...bracket.regional, bonusCinderella: bracket.regional.region4Cinderella },
      });

      expect(result).toEqual(E.left([DuplicateCinderellaError(bracket.regional.region4Cinderella)]));
    });
  });
  it('should return left with multiple errors aggregated', () => {
    const result = validateBracket({
      ...bracket,
      regional: {
        ...bracket.regional,
        bonusFavorite: bracket.regional.region1Favorite,
        bonusSleeper: bracket.regional.region2Sleeper,
        bonusCinderella: bracket.regional.region4Cinderella,
      },
    });

    expect(result).toEqual(
      E.left([
        DuplicateFavoriteError(bracket.regional.region1Favorite),
        DuplicateSleeperError(bracket.regional.region2Sleeper),
        DuplicateCinderellaError(bracket.regional.region4Cinderella),
      ])
    );
  });
});
