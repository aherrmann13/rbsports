import { Bracket as BracketValidation, BracketEntry } from 'validation/bracket';
import * as E from 'fp-ts/Either';
import { draw } from 'io-ts/Decoder';

/**
 * 'test obj type' becuase any large amount of tests was going to be mostly copy paste testing the same thing, I think
 * this is the best cross between readability and test coverage
 */

export type BracketValidationTest = {
  propSetter: (prop: unknown) => unknown;
  validNumbers: number[];
};

const bracket = {
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

const teamVals: number[] = [
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  ...[17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
  ...[33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
  ...[49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
];

const tests = [
  [
    'region1Favorite',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region1Favorite: p } }),
      validNumbers: [1, 2, 3],
    },
  ],
  [
    'region1Sleeper',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region1Sleeper: p } }),
      validNumbers: [4, 5, 6, 7, 8],
    },
  ],
  [
    'region1Cinderella',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region1Cinderella: p } }),
      validNumbers: [9, 10, 11, 12, 13, 14, 15, 16],
    },
  ],
  [
    'region2Favorite',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region2Favorite: p } }),
      validNumbers: [17, 18, 19],
    },
  ],
  [
    'region2Sleeper',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region2Sleeper: p } }),
      validNumbers: [20, 21, 22, 23, 24],
    },
  ],
  [
    'region2Cinderella',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region2Cinderella: p } }),
      validNumbers: [25, 26, 27, 28, 29, 30, 31, 32],
    },
  ],
  [
    'region3Favorite',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region3Favorite: p } }),
      validNumbers: [33, 34, 35],
    },
  ],
  [
    'region3Sleeper',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region3Sleeper: p } }),
      validNumbers: [36, 37, 38, 39, 40],
    },
  ],
  [
    'region3Cinderella',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region3Cinderella: p } }),
      validNumbers: [41, 42, 43, 44, 45, 46, 47, 48],
    },
  ],
  [
    'region4Favorite',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region4Favorite: p } }),
      validNumbers: [49, 50, 51],
    },
  ],
  [
    'region4Sleeper',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region4Sleeper: p } }),
      validNumbers: [52, 53, 54, 55, 56],
    },
  ],
  [
    'region4Cinderella',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, region4Cinderella: p } }),
      validNumbers: [57, 58, 59, 60, 61, 62, 63, 64],
    },
  ],
  [
    'bonusFavorite',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, bonusFavorite: p } }),
      validNumbers: [1, 2, 3, 17, 18, 19, 33, 34, 35, 49, 50, 51],
    },
  ],
  [
    'bonusSleeper',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, bonusSleeper: p } }),
      validNumbers: [4, 5, 6, 7, 8, 20, 21, 22, 23, 24, 36, 37, 38, 39, 40, 52, 53, 54, 55, 56],
    },
  ],
  [
    'bonusCinderella',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, regional: { ...bracket.regional, bonusCinderella: p } }),
      validNumbers: [
        ...[9, 10, 11, 12, 13, 14, 15, 16],
        ...[25, 26, 27, 28, 29, 30, 31, 32],
        ...[41, 42, 43, 44, 45, 46, 47, 48],
        ...[57, 58, 59, 60, 61, 62, 63, 64],
      ],
    },
  ],
  [
    'fastbreakTrio Favorite',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, fastbreakTrio: { ...bracket.fastbreakTrio, favorite: p } }),
      validNumbers: [1, 2, 3, 17, 18, 19, 33, 34, 35, 49, 50, 51],
    },
  ],
  [
    'fastbreakTrio Sleeper',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, fastbreakTrio: { ...bracket.fastbreakTrio, sleeper: p } }),
      validNumbers: [4, 5, 6, 7, 8, 20, 21, 22, 23, 24, 36, 37, 38, 39, 40, 52, 53, 54, 55, 56],
    },
  ],
  [
    'fastbreakTrio Cinderella',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, fastbreakTrio: { ...bracket.fastbreakTrio, cinderella: p } }),
      validNumbers: [
        ...[9, 10, 11, 12, 13, 14, 15, 16],
        ...[25, 26, 27, 28, 29, 30, 31, 32],
        ...[41, 42, 43, 44, 45, 46, 47, 48],
        ...[57, 58, 59, 60, 61, 62, 63, 64],
      ],
    },
  ],
  [
    'sweetSixteen Favorite',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, sweetSixteen: { ...bracket.sweetSixteen, favorite: p } }),
      validNumbers: [1, 2, 3, 17, 18, 19, 33, 34, 35, 49, 50, 51],
    },
  ],
  [
    'sweetSixteen Sleeper',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, sweetSixteen: { ...bracket.sweetSixteen, sleeper: p } }),
      validNumbers: [4, 5, 6, 7, 8, 20, 21, 22, 23, 24, 36, 37, 38, 39, 40, 52, 53, 54, 55, 56],
    },
  ],
  [
    'sweetSixteen Cinderella',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, sweetSixteen: { ...bracket.sweetSixteen, cinderella: p } }),
      validNumbers: [
        ...[9, 10, 11, 12, 13, 14, 15, 16],
        ...[25, 26, 27, 28, 29, 30, 31, 32],
        ...[41, 42, 43, 44, 45, 46, 47, 48],
        ...[57, 58, 59, 60, 61, 62, 63, 64],
      ],
    },
  ],
  [
    'finalFour region1',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, finalFour: { ...bracket.finalFour, region1: p } }),
      validNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
  ],
  [
    'finalFour region2',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, finalFour: { ...bracket.finalFour, region2: p } }),
      validNumbers: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    },
  ],
  [
    'finalFour region3',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, finalFour: { ...bracket.finalFour, region3: p } }),
      validNumbers: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    },
  ],
  [
    'finalFour region4',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, finalFour: { ...bracket.finalFour, region4: p } }),
      validNumbers: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
    },
  ],
  [
    'graveyard',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, graveyard: p }),
      validNumbers: [1, 17, 33, 49],
    },
  ],
  [
    'tournamentChoice',
    {
      propSetter: (p: unknown): unknown => ({ ...bracket, tournamentChoice: p }),
      validNumbers: [
        ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        ...[17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        ...[33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
        ...[49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
      ],
    },
  ],
] as [string, BracketValidationTest][];

describe('Bracket decoder', () => {
  test.each(tests)('should return right with bracket for valid %p', (name, test) => {
    test.validNumbers.forEach((number) => {
      const testBracket = test.propSetter(number);
      const decoded = BracketValidation.decode(testBracket);
      if (E.isRight(decoded)) {
        expect(decoded.right).toEqual(testBracket);
      } else {
        fail(`${name} should be decoded to right with value ${number}`);
      }
    });
  });

  test.each(tests)('should return left with error for invalid %p', (name, test) => {
    const otherValues = [undefined, 0, 65, { obj: 'bad obj' }, 'string'];
    [...teamVals.filter((num) => test.validNumbers.indexOf(num) === -1), ...otherValues].forEach((invalidVal) => {
      const testBracket = test.propSetter(invalidVal);
      const decoded = BracketValidation.decode(testBracket);

      if (E.isLeft(decoded)) {
        const err = draw(decoded.left);

        test.validNumbers.forEach((validNum) => {
          expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be ${validNum}`);
        });
      } else {
        fail(`${name} should be decoded to left with value ${invalidVal}`);
      }
    });
  });

  it('should return left with error for object totalPointsScored', () => {
    const invalidVal = { some: 'object' };
    const decoded = BracketValidation.decode({ ...bracket, totalPointsScored: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be number`);
    } else {
      fail(`totalPointsScored should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for non number totalPointsScored', () => {
    const invalidVal = true;
    const decoded = BracketValidation.decode({ ...bracket, totalPointsScored: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be number`);
    } else {
      fail(`totalPointsScored should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for undefined totalPointsScored', () => {
    const invalidVal = undefined;
    const decoded = BracketValidation.decode({ ...bracket, totalPointsScored: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be number`);
    } else {
      fail(`totalPointsScored should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return right with bracket for numeric totalPointsScored', () => {
    const decoded = BracketValidation.decode({ ...bracket, totalPointsScored: 500 });

    if (E.isRight(decoded)) {
      expect(decoded.right).toEqual({ ...bracket, totalPointsScored: 500 });
    } else {
      fail(`totalPointsScored should be decoded to right with value 500`);
    }
  });
});

describe('BracketEntry decoder', () => {
  it('should return left with error for object name', () => {
    const invalidVal = { some: 'object' };
    const decoded = BracketEntry.decode({ name: invalidVal, bracket: bracket });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be string`);
    } else {
      fail(`name should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for non string name', () => {
    const invalidVal = 123;
    const decoded = BracketEntry.decode({ name: invalidVal, bracket: bracket });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be string`);
    } else {
      fail(`name should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for undefined name', () => {
    const invalidVal = undefined;
    const decoded = BracketEntry.decode({ name: invalidVal, bracket: bracket });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be string`);
    } else {
      fail(`name should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return right with bracket entry for string name', () => {
    const decoded = BracketEntry.decode({ name: 'name', bracket: bracket });

    if (E.isRight(decoded)) {
      expect(decoded.right).toEqual({ name: 'name', bracket: bracket });
    } else {
      fail(`name should be decoded to right with value name`);
    }
  });

  it('should return left with error for invalid object bracket', () => {
    const invalidVal = { some: 'object' };
    const decoded = BracketEntry.decode({ name: 'name', bracket: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      // tries to decod obj as bracket
      expect(err).toContain('required property "bracket"');
    } else {
      fail(`bracket should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for non object bracket', () => {
    const invalidVal = 123;
    const decoded = BracketEntry.decode({ name: 'name', bracket: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be Record<string, unknown>`);
    } else {
      fail(`bracket should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for undefined bracket', () => {
    const invalidVal = undefined;
    const decoded = BracketEntry.decode({ name: 'name', bracket: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be Record<string, unknown>`);
    } else {
      fail(`bracket should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return right with bracket entry for valid bracket object bracket', () => {
    const decoded = BracketEntry.decode({ name: 'name', bracket: bracket });

    if (E.isRight(decoded)) {
      expect(decoded.right).toEqual({ name: 'name', bracket: bracket });
    } else {
      fail(`bracket should be decoded to right with value valid bracket`);
    }
  });
});
