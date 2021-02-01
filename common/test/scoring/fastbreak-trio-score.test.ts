import { fastbreakTrioScore } from 'scoring/fastbreak-trio-score';
import { Bracket } from 'types/bracket';
import { Game, Wins } from 'types/results';

describe('fastbreakTrioScpre', () => {
  const fastbreakTrio: Bracket['fastbreakTrio'] = {
    favorite: 1,
    sleeper: 20,
    cinderella: 59,
  };

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
  it('should return 150 if all teams win first round', () => {
    const wins: Wins = new Map([
      [fastbreakTrio.favorite, [{ ...game, winner: fastbreakTrio.favorite, type: 'regional', round: 1 }]],
      [fastbreakTrio.sleeper, [{ ...game, winner: fastbreakTrio.sleeper, type: 'regional', round: 1 }]],
      [fastbreakTrio.cinderella, [{ ...game, winner: fastbreakTrio.cinderella, type: 'regional', round: 1 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = fastbreakTrioScore(fastbreakTrio, wins);

    expect(score).toBe(150);
  });
  it('should return 0 if two teams win first round', () => {
    const wins: Wins = new Map([
      [fastbreakTrio.sleeper, [{ ...game, winner: fastbreakTrio.sleeper, type: 'regional', round: 1 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = fastbreakTrioScore(fastbreakTrio, wins);

    expect(score).toBe(0);
  });
  it('should return 0 if one team wins first round', () => {
    const wins: Wins = new Map([
      [fastbreakTrio.favorite, [{ ...game, winner: fastbreakTrio.favorite, type: 'regional', round: 1 }]],
      [fastbreakTrio.cinderella, [{ ...game, winner: fastbreakTrio.cinderella, type: 'regional', round: 1 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = fastbreakTrioScore(fastbreakTrio, wins);

    expect(score).toBe(0);
  });
  it('should return 0 if no team wins first round', () => {
    const wins: Wins = new Map([
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = fastbreakTrioScore(fastbreakTrio, wins);

    expect(score).toBe(0);
  });
});
