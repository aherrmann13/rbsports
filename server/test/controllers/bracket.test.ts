import { Bracket, BracketEntry } from 'common/src/types/bracket';
import { bracket as bracketController } from 'controllers/bracket';
import { Request, Response } from 'express';
import { createBracket, deleteBracket, getBracket, getBrackets, updateBracket } from 'services/bracket';
import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import { SavedItem } from 'common/src/types/item';

jest.mock('services/bracket');

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

const bracketEntry: BracketEntry = {
  name: 'test bracket',
  bracket,
};

describe('bracket', () => {
  const mockStatus = jest.fn();
  const mockSend = jest.fn();
  const mockCreateBracket = createBracket as jest.Mock;
  const mockUpdateBracket = updateBracket as jest.Mock;
  const mockDeleteBracket = deleteBracket as jest.Mock;
  const mockGetBracket = getBracket as jest.Mock;
  const mockGetBrackets = getBrackets as jest.Mock;

  const mockResponse = ({
    status: mockStatus,
    send: mockSend,
  } as unknown) as Response;

  beforeEach(() => {
    mockStatus.mockReset();
    mockSend.mockReset();
    mockCreateBracket.mockReset();
    mockUpdateBracket.mockReset();
    mockDeleteBracket.mockReset();
    mockGetBracket.mockReset();
    mockGetBrackets.mockReset();

    mockStatus.mockReturnThis();
    mockSend.mockReturnThis();
  });
  describe('post', () => {
    it('should return 400 with error when invalid body sent', () => {
      const req = ({ body: { name: 123, bracket: bracket } } as unknown) as Request;

      bracketController.post(req, mockResponse);

      expect(mockCreateBracket).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith('required property "name"\n└─ cannot decode 123, should be string');
    });
    it('should return 400 with error when no body sent', () => {
      const req = ({ body: undefined } as unknown) as Request;

      bracketController.post(req, mockResponse);

      expect(mockCreateBracket).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith('empty body');
    });
    it('should return 400 with error when createBracket fails', () => {
      mockCreateBracket.mockReturnValue(E.left('error'));
      const req = ({ body: bracketEntry } as unknown) as Request;

      bracketController.post(req, mockResponse);

      expect(mockCreateBracket).toHaveBeenCalledTimes(1);
      expect(mockCreateBracket).toHaveBeenCalledWith(bracketEntry);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith('error');
    });
    it('should return 200 with created bracket when createBracket succeeds', () => {
      const savedBracket: SavedItem<BracketEntry> = { ...bracketEntry, id: 1 };
      mockCreateBracket.mockReturnValue(E.right(savedBracket));

      const req = ({ body: bracketEntry } as unknown) as Request;

      bracketController.post(req, mockResponse);

      expect(mockCreateBracket).toHaveBeenCalledTimes(1);
      expect(mockCreateBracket).toHaveBeenCalledWith(bracketEntry);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(savedBracket);
    });
  });
  describe('put', () => {
    it('should return 400 with error when id not in route', () => {
      const req = ({ body: bracketEntry, params: { notId: 5 } } as unknown) as Request;

      bracketController.put(req, mockResponse);

      expect(mockUpdateBracket).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        'required property "id"\n' +
          '├─ member 0\n' +
          '│  └─ cannot decode undefined, should be string\n' +
          '└─ member 1\n' +
          '   └─ cannot decode undefined, should be number'
      );
    });
    it('should return 400 with error when id in route is not a number', () => {
      const req = ({ body: bracketEntry, params: { id: 'test' } } as unknown) as Request;

      bracketController.put(req, mockResponse);

      expect(mockUpdateBracket).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        'required property "id"\n' + '└─ cannot decode "test", should be StringToNumber'
      );
    });
    it('should return 400 with error when invalid body sent', () => {
      const req = ({ body: { name: 123, bracket: bracket }, params: { id: 5 } } as unknown) as Request;

      bracketController.put(req, mockResponse);

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith('required property "name"\n└─ cannot decode 123, should be string');
    });
    it('should return 400 with error when no body sent', () => {
      const req = ({ body: undefined, params: { id: 5 } } as unknown) as Request;

      bracketController.put(req, mockResponse);

      expect(mockUpdateBracket).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith('empty body');
    });
    it('should return 400 with error when update fails', () => {
      mockUpdateBracket.mockReturnValue(E.left('error'));
      const req = ({ body: bracketEntry, params: { id: 5 } } as unknown) as Request;

      bracketController.put(req, mockResponse);

      expect(mockUpdateBracket).toHaveBeenCalledTimes(1);
      expect(mockUpdateBracket).toHaveBeenCalledWith({ ...bracketEntry, id: 5 });
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith('error');
    });
    it('should return 200 with updated bracket when updateBracket succeeds', () => {
      const savedBracket: SavedItem<BracketEntry> = { ...bracketEntry, id: 5 };
      mockUpdateBracket.mockReturnValue(E.right(savedBracket));

      const req = ({ body: bracketEntry, params: { id: 5 } } as unknown) as Request;

      bracketController.put(req, mockResponse);

      expect(mockUpdateBracket).toHaveBeenCalledTimes(1);
      expect(mockUpdateBracket).toHaveBeenCalledWith({ ...bracketEntry, id: 5 });
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(savedBracket);
    });
  });
  describe('del', () => {
    it('should return 400 with error when id not in route', () => {
      const req = ({ params: { notId: 5 } } as unknown) as Request;

      bracketController.del(req, mockResponse);

      expect(mockDeleteBracket).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        'required property "id"\n' +
          '├─ member 0\n' +
          '│  └─ cannot decode undefined, should be string\n' +
          '└─ member 1\n' +
          '   └─ cannot decode undefined, should be number'
      );
    });
    it('should return 400 with error when id in route is not a number', () => {
      const req = ({ params: { id: 'test' } } as unknown) as Request;

      bracketController.del(req, mockResponse);

      expect(mockDeleteBracket).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        'required property "id"\n' + '└─ cannot decode "test", should be StringToNumber'
      );
    });
    it('should return 400 with error when delete fails', () => {
      mockDeleteBracket.mockReturnValue(E.left('error'));
      const req = ({ params: { id: 5 } } as unknown) as Request;

      bracketController.del(req, mockResponse);

      expect(mockDeleteBracket).toHaveBeenCalledTimes(1);
      expect(mockDeleteBracket).toHaveBeenCalledWith(5);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith('error');
    });
    it('should return 200 with no body when deleteBracket succeeds', () => {
      mockDeleteBracket.mockReturnValue(E.right({}));

      const req = ({ params: { id: 5 } } as unknown) as Request;

      bracketController.del(req, mockResponse);

      expect(mockDeleteBracket).toHaveBeenCalledTimes(1);
      expect(mockDeleteBracket).toHaveBeenCalledWith(5);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith();
    });
  });
  describe('get', () => {
    it('should return 400 with error when id not in route', () => {
      const req = ({ params: { notId: 5 } } as unknown) as Request;

      bracketController.get(req, mockResponse);

      expect(mockGetBracket).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        'required property "id"\n' +
          '├─ member 0\n' +
          '│  └─ cannot decode undefined, should be string\n' +
          '└─ member 1\n' +
          '   └─ cannot decode undefined, should be number'
      );
    });
    it('should return 400 with error when id in route is not a number', () => {
      const req = ({ params: { id: 'test' } } as unknown) as Request;

      bracketController.get(req, mockResponse);

      expect(mockGetBracket).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        'required property "id"\n' + '└─ cannot decode "test", should be StringToNumber'
      );
    });
    it('should return 200 with no params when getBracket returns none', () => {
      const req = ({ params: { id: 5 } } as unknown) as Request;
      mockGetBracket.mockReturnValue(O.none);

      bracketController.get(req, mockResponse);

      expect(mockGetBracket).toHaveBeenCalledTimes(1);
      expect(mockGetBracket).toHaveBeenCalledWith(5);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith();
    });
    it('should return 200 with bracket when getBracket returns some', () => {
      const savedBracket: SavedItem<BracketEntry> = { ...bracketEntry, id: 5 };
      const req = ({ params: { id: 5 } } as unknown) as Request;
      mockGetBracket.mockReturnValue(O.some(savedBracket));

      bracketController.get(req, mockResponse);

      expect(mockGetBracket).toHaveBeenCalledTimes(1);
      expect(mockGetBracket).toHaveBeenCalledWith(5);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(savedBracket);
    });
  });
  describe('getMany', () => {
    it('should return 400 with error when query params are undefined', () => {
      const req = ({ query: undefined } as unknown) as Request;

      bracketController.getMany(req, mockResponse);

      expect(mockGetBrackets).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith('query not provided');
    });
    it('should return 400 with error when query params are invalid', () => {
      const req = ({ query: { userBrackets: '1234' } } as unknown) as Request;

      bracketController.getMany(req, mockResponse);

      expect(mockGetBrackets).toHaveBeenCalledTimes(0);
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        'optional property "userBrackets"\n' +
          '├─ member 0\n' +
          '│  └─ cannot decode "1234", should be null\n' +
          '└─ member 1\n' +
          '   └─ cannot decode "1234", should be boolean'
      );
    });
    it('should return 200 with brackets from getManyBrackets', () => {
      const savedBracket0: SavedItem<BracketEntry> = { ...bracketEntry, id: 1 };
      const savedBracket1: SavedItem<BracketEntry> = { ...bracketEntry, id: 2 };

      const req = ({ query: { userBrackets: true } } as unknown) as Request;
      mockGetBrackets.mockReturnValue([savedBracket0, savedBracket1]);

      bracketController.getMany(req, mockResponse);

      expect(mockGetBrackets).toHaveBeenCalledTimes(1);
      expect(mockGetBrackets).toHaveBeenCalledWith({ userBrackets: true });
      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith([savedBracket0, savedBracket1]);
    });
  });
});
