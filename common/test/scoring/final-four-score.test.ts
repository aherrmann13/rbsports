import { finalFourScore } from 'scoring/final-four-score';
import { Bracket } from 'types/bracket';
import { Game, Wins } from 'types/results';

describe('finalFourScore', () => {
  const finalFour: Bracket['finalFour'] = {
    region1: 1,
    region2: 19,
    region3: 37,
    region4: 64,
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
  it('should return 200 if one team makes it to the final four', () => {
    const wins: Wins = new Map([
      [finalFour.region1, [{ ...game, winner: finalFour.region1, type: 'regional', round: 4 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = finalFourScore(finalFour, wins);

    expect(score).toBe(200);
  });
  it('should return 400 if two teams make it to the final four', () => {
    const wins: Wins = new Map([
      [finalFour.region2, [{ ...game, winner: finalFour.region2, type: 'regional', round: 4 }]],
      [finalFour.region3, [{ ...game, winner: finalFour.region3, type: 'regional', round: 4 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = finalFourScore(finalFour, wins);

    expect(score).toBe(400);
  });
  it('should return 600 if three teams make it to the final four', () => {
    const wins: Wins = new Map([
      [finalFour.region1, [{ ...game, winner: finalFour.region1, type: 'regional', round: 4 }]],
      [finalFour.region2, [{ ...game, winner: finalFour.region2, type: 'regional', round: 4 }]],
      [finalFour.region3, [{ ...game, winner: finalFour.region3, type: 'regional', round: 4 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = finalFourScore(finalFour, wins);

    expect(score).toBe(600);
  });
  it('should return 1000 if four teams make it to the final four', () => {
    const wins: Wins = new Map([
      [finalFour.region1, [{ ...game, winner: finalFour.region1, type: 'regional', round: 4 }]],
      [finalFour.region2, [{ ...game, winner: finalFour.region2, type: 'regional', round: 4 }]],
      [finalFour.region3, [{ ...game, winner: finalFour.region3, type: 'regional', round: 4 }]],
      [finalFour.region4, [{ ...game, winner: finalFour.region4, type: 'regional', round: 4 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = finalFourScore(finalFour, wins);

    expect(score).toBe(1000);
  });
  it('should return 0 if no team wins any games', () => {
    const wins: Wins = new Map([
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = finalFourScore(finalFour, wins);

    expect(score).toBe(0);
  });
  it('should return 0 if no team makes it to the final four', () => {
    const wins: Wins = new Map([
      [finalFour.region1, [{ ...game, winner: finalFour.region1, type: 'regional', round: 1 }]],
      [finalFour.region2, [{ ...game, winner: finalFour.region2, type: 'regional', round: 2 }]],
      [finalFour.region3, [{ ...game, winner: finalFour.region3, type: 'regional', round: 3 }]],
      [finalFour.region4, [{ ...game, winner: finalFour.region4, type: 'semifinal', round: 5 }]],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = finalFourScore(finalFour, wins);

    expect(score).toBe(0);
  });
});
