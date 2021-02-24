import { Item } from 'validation/item';
import * as E from 'fp-ts/lib/Either';
import { draw } from 'io-ts/lib/Decoder';

describe('Item decoder', () => {
  it('should return left with error for object id', () => {
    const invalidVal = { some: 'object' };
    const decoded = Item.decode({ id: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be string`);
    } else {
      fail(`name should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for non number id', () => {
    const invalidVal = false;
    const decoded = Item.decode({ id: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be string`);
    } else {
      fail(`name should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for undefined id', () => {
    const invalidVal = undefined;
    const decoded = Item.decode({ id: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be string`);
    } else {
      fail(`name should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return left with error for string id that cannot be converted to number', () => {
    const invalidVal = 'a string';
    const decoded = Item.decode({ id: invalidVal });

    if (E.isLeft(decoded)) {
      const err = draw(decoded.left);

      expect(err).toContain(`cannot decode ${JSON.stringify(invalidVal)}, should be StringToNumber`);
    } else {
      fail(`name should be decoded to left with value ${invalidVal}`);
    }
  });
  it('should return right with numberic id for string id that can be converted to number', () => {
    const decoded = Item.decode({ id: '123' });

    if (E.isRight(decoded)) {
      expect(decoded.right).toEqual({ id: 123 });
    } else {
      fail(`id should be decoded to right with value 123`);
    }
  });
  it('should return right with id for numeric id', () => {
    const decoded = Item.decode({ id: 123 });

    if (E.isRight(decoded)) {
      expect(decoded.right).toEqual({ id: 123 });
    } else {
      fail(`id should be decoded to right with value 123`);
    }
  });
});
