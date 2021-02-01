import { tournamentChoiceScore } from 'scoring/tournament-choice-score';
import { Team } from 'types/bracket';
import { Game, Wins } from 'types/results';

describe('tournamentChoiceScore', () => {
  const selection: Team = 13;
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
  it('should return 500 when the selection wins a round 6 game', () => {
    const wins: Wins = new Map([
      [selection, [{ ...game, winner: selection, type: 'final', round: 6, finished: new Date(2020, 3, 1) }]],
      [2, [{ ...game, winner: 2, loser: 15, finished: new Date(2020, 3, 2) }]],
      [8, [{ ...game, winner: 8, loser: 9, finished: new Date(2020, 3, 3) }]],
      [21, [{ ...game, winner: 21, loser: 17, finished: new Date(2020, 3, 4) }]],
    ]);

    const score = tournamentChoiceScore(selection, wins);

    expect(score).toBe(500);
  });
  it('should return 0 when the selection does not win a round 6 game', () => {
    const wins: Wins = new Map([
      [selection, [{ ...game, winner: selection, finished: new Date(2020, 3, 4) }]],
      [2, [{ ...game, winner: 2, loser: 15, finished: new Date(2020, 3, 2) }]],
      [8, [{ ...game, winner: 8, loser: 9, finished: new Date(2020, 3, 1) }]],
      [21, [{ ...game, winner: 21, loser: 17, type: 'final', round: 6, finished: new Date(2020, 3, 2) }]],
    ]);

    const score = tournamentChoiceScore(selection, wins);

    expect(score).toBe(0);
  });
  it('should return 0 when the selection does not win any game', () => {
    const wins: Wins = new Map([
      [2, [{ ...game, winner: 2, loser: 15, finished: new Date(2020, 3, 2) }]],
      [8, [{ ...game, winner: 8, loser: 9, finished: new Date(2020, 3, 1) }]],
      [21, [{ ...game, winner: 21, loser: 17, type: 'final', round: 6, finished: new Date(2020, 3, 2) }]],
    ]);

    const score = tournamentChoiceScore(selection, wins);

    expect(score).toBe(0);
  });
});
