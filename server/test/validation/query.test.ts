import { BracketQuery } from 'validation/query';
import * as E from 'fp-ts/lib/Either';
import { draw } from 'io-ts/lib/Decoder';

describe('BracketQuery decoder', () => {
  it('should return left with error for object userBrackets', () => {
    const invalidVal = { some: 'object' };
    const decoded = BracketQuery.decode({ userBrackets: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be boolean`);
    } else {
      fail(`name should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for non boolean userBrackets', () => {
    const invalidVal = '123';
    const decoded = BracketQuery.decode({ userBrackets: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be boolean`);
    } else {
      fail(`name should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return right with bracket query for undefined userBrackets', () => {
    const decoded = BracketQuery.decode({ userBrackets: true });

    if (E.isRight(decoded)) {
      expect(decoded.right).toEqual({ userBrackets: true });
    } else {
      fail(`userBrackets should be decoded to right with value true`);
    }
  });
  it('should return right with bracket query for boolean userBrackets', () => {
    const decoded = BracketQuery.decode({ userBrackets: undefined });

    if (E.isRight(decoded)) {
      expect(decoded.right).toEqual({ userBrackets: undefined });
    } else {
      fail(`userBrackets should be decoded to right with value undefined`);
    }
  });
});
