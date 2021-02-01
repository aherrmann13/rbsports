import { sweetSixteenScore } from 'scoring/sweet-sixteen-score';
import { Bracket } from 'types/bracket';
import { Game, Wins } from 'types/results';

describe('sweetSixteenScore', () => {
  const sweetSixteen: Bracket['sweetSixteen'] = {
    favorite: 3,
    sleeper: 7,
    cinderella: 16,
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
  it('should return 100 when favorite wins', () => {
    const wins: Wins = new Map([
      [sweetSixteen.favorite, [{ ...game, winner: sweetSixteen.favorite, type: 'regional', round: 2 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = sweetSixteenScore(sweetSixteen, wins);

    expect(score).toBe(100);
  });
  it('should return 200 when sleeper wins', () => {
    const wins: Wins = new Map([
      [sweetSixteen.sleeper, [{ ...game, winner: sweetSixteen.sleeper, type: 'regional', round: 2 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = sweetSixteenScore(sweetSixteen, wins);

    expect(score).toBe(200);
  });
  it('should return 300 when cinderella wins', () => {
    const wins: Wins = new Map([
      [sweetSixteen.cinderella, [{ ...game, winner: sweetSixteen.cinderella, type: 'regional', round: 2 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = sweetSixteenScore(sweetSixteen, wins);

    expect(score).toBe(300);
  });
  it('should return 800 if all three win', () => {
    const wins: Wins = new Map([
      [sweetSixteen.favorite, [{ ...game, winner: sweetSixteen.favorite, type: 'regional', round: 2 }]],
      [sweetSixteen.sleeper, [{ ...game, winner: sweetSixteen.sleeper, type: 'regional', round: 2 }]],
      [sweetSixteen.cinderella, [{ ...game, winner: sweetSixteen.cinderella, type: 'regional', round: 2 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = sweetSixteenScore(sweetSixteen, wins);

    expect(score).toBe(800);
  });
  it('should return two scores added if two win', () => {
    const wins: Wins = new Map([
      [sweetSixteen.favorite, [{ ...game, winner: sweetSixteen.favorite, type: 'regional', round: 2 }]],
      [sweetSixteen.cinderella, [{ ...game, winner: sweetSixteen.cinderella, type: 'regional', round: 2 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = sweetSixteenScore(sweetSixteen, wins);

    expect(score).toBe(400);
  });
  it('should return 0 if none win sweet sixteen', () => {
    const wins: Wins = new Map([
      [sweetSixteen.favorite, [{ ...game, winner: sweetSixteen.favorite, type: 'regional', round: 3 }]],
      [sweetSixteen.sleeper, [{ ...game, winner: sweetSixteen.sleeper, type: 'regional', round: 1 }]],
      [sweetSixteen.cinderella, [{ ...game, winner: sweetSixteen.cinderella, type: 'regional', round: 4 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = sweetSixteenScore(sweetSixteen, wins);

    expect(score).toBe(0);
  });
  it('should return 0 if none win', () => {
    const wins: Wins = new Map([
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = sweetSixteenScore(sweetSixteen, wins);

    expect(score).toBe(0);
  });
});
