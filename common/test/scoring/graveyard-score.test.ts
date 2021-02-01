import { graveyardScore } from 'scoring/graveyard-score';
import { OneSeed } from 'types/bracket';
import { Game, Wins } from 'types/results';

describe('graveyardScore', () => {
  const selection: OneSeed = 1;
  const game: Game = {
    type: 'regional',
    round: 1,
    winner: 2,
    loser: 3,
    winningTeamScore: 87,
    losingTeamScore: 72,
    finished: new Date(),
    overtime: false,
    buzzerBeater: false,
  };
  it('should return 300 when the selected one seed has the first one seed loss', () => {
    const wins: Wins = new Map([
      [selection, [{ ...game, winner: selection, finished: new Date(2020, 3, 1) }]],
      [2, [{ ...game, winner: 2, loser: 15, finished: new Date(2020, 3, 2) }]],
      [8, [{ ...game, winner: 8, loser: selection, finished: new Date(2020, 3, 3) }]],
      [
        17,
        [
          { ...game, winner: 17, loser: 32, finished: new Date(2020, 3, 1) },
          { ...game, winner: 17, loser: 9, finished: new Date(2020, 3, 3) },
        ],
      ],
      [21, [{ ...game, winner: 21, loser: 17, finished: new Date(2020, 3, 4) }]],
    ]);
    const score = graveyardScore(selection, wins);

    expect(score).toBe(300);
  });
  it('should return 0 when no one seed has lost', () => {
    const wins: Wins = new Map([
      [selection, [{ ...game, winner: selection, finished: new Date(2020, 3, 1) }]],
      [2, [{ ...game, winner: 2, loser: 15, finished: new Date(2020, 3, 2) }]],
      [8, [{ ...game, winner: 8, loser: 9, finished: new Date(2020, 3, 3) }]],
      [
        17,
        [
          { ...game, winner: 17, loser: 32, finished: new Date(2020, 3, 1) },
          { ...game, winner: 17, loser: 9, finished: new Date(2020, 3, 3) },
        ],
      ],
      [21, [{ ...game, winner: 21, loser: 18, finished: new Date(2020, 3, 1) }]],
    ]);
    const score = graveyardScore(selection, wins);

    expect(score).toBe(0);
  });
  it('should return 0 when the selected one seed loses after another one seed', () => {
    const wins: Wins = new Map([
      [selection, [{ ...game, winner: selection, finished: new Date(2020, 3, 1) }]],
      [2, [{ ...game, winner: 2, loser: 15, finished: new Date(2020, 3, 2) }]],
      [8, [{ ...game, winner: 8, loser: selection, finished: new Date(2020, 3, 3) }]],
      [
        17,
        [
          { ...game, winner: 17, loser: 32, finished: new Date(2020, 3, 1) },
          { ...game, winner: 17, loser: 9, finished: new Date(2020, 3, 3) },
        ],
      ],
      [21, [{ ...game, winner: 21, loser: 17, finished: new Date(2020, 3, 1) }]],
    ]);
    const score = graveyardScore(selection, wins);

    expect(score).toBe(0);
  });
  it('should return 0 when the selected one seed has not lost', () => {
    const wins: Wins = new Map([
      [selection, [{ ...game, winner: selection, finished: new Date(2020, 3, 1) }]],
      [2, [{ ...game, winner: 2, loser: 15, finished: new Date(2020, 3, 2) }]],
      [8, [{ ...game, winner: 8, loser: 9, finished: new Date(2020, 3, 3) }]],
      [
        17,
        [
          { ...game, winner: 17, loser: 32, finished: new Date(2020, 3, 1) },
          { ...game, winner: 17, loser: 9, finished: new Date(2020, 3, 3) },
        ],
      ],
      [21, [{ ...game, winner: 21, loser: 17, finished: new Date(2020, 3, 1) }]],
    ]);
    const score = graveyardScore(selection, wins);

    expect(score).toBe(0);
  });
});
