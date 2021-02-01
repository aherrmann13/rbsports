import { regionalScore } from 'scoring/regional-score';
import { Bracket, Region1Favorite, Region2Sleeper, Region3Cinderella } from 'types/bracket';
import { Game, Wins } from 'types/results';

// TODO: lot of copy-paste, can these tests be generated with some input?
describe('regionalScore', () => {
  const regional: Bracket['regional'] = {
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
  };

  // the numbers here are hard to keep track of it doesnt actually matter who won and lost each 'game' for the purposes
  // of scoring.  Just need them to appear in the map of wins under a team.
  // TODO: this is good reason to refactor 'Wins' type, to guarantee the winner actually matches the team who won
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

  describe('favorite selection', () => {
    const selection: Region1Favorite = regional.region1Favorite;
    describe('regional win', () => {
      it('should return 50 for each win', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(100);
      });
      it('should return 100 for each win by buzzer beater', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, buzzerBeater: true, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(150);
      });
      it('should return 100 for each win by overtime', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, overtime: true, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(150);
      });
      it('should return 150 for each win by overtime buzzer beater', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, overtime: true, buzzerBeater: true, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(200);
      });
      it('should return 100 more for getting to the final four', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, type: 'regional', round: 2 },
              { ...game, winner: selection, type: 'regional', round: 3 },
              { ...game, winner: selection, type: 'regional', round: 4 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(300);
      });
      it('should return 0 for no wins', () => {
        const wins: Wins = new Map([
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(0);
      });
    });
    describe('semifinal win', () => {
      it('should return 100 for each win', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, type: 'semifinal', round: 5 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(100);
      });
      it('should return 200 for each win by buzzer beater', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, buzzerBeater: true, type: 'semifinal', round: 5 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(200);
      });
      it('should return 200 for each win by overtime', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, overtime: true, type: 'semifinal', round: 5 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(200);
      });
      it('should return 300 for each win by overtime buzzer beater', () => {
        const wins: Wins = new Map([
          [
            selection,
            [{ ...game, winner: selection, overtime: true, buzzerBeater: true, type: 'semifinal', round: 5 }],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(300);
      });
      it('should return 0 for no wins', () => {
        const wins: Wins = new Map([
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(0);
      });
    });
    describe('final win', () => {
      it('should return 200 for each win', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(200);
      });
      it('should return 400 for each win by buzzer beater', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, buzzerBeater: true, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(400);
      });
      it('should return 400 for each win by overtime', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, overtime: true, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(400);
      });
      it('should return 600 for each win by overtime buzzer beater', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, overtime: true, buzzerBeater: true, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(600);
      });
      it('should return 0 for no wins', () => {
        const wins: Wins = new Map([
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(0);
      });
    });

    it('should aggregate all win scores', () => {
      const wins: Wins = new Map([
        [
          selection,
          [
            { ...game, winner: selection, type: 'regional', round: 1 },
            { ...game, winner: selection, overtime: true, type: 'regional', round: 2 },
            { ...game, winner: selection, buzzerBeater: true, type: 'regional', round: 3 },
            { ...game, winner: selection, type: 'regional', round: 4 },
            { ...game, winner: selection, type: 'semifinal', round: 5 },
            { ...game, winner: selection, type: 'final', round: 6 },
          ],
        ],
        [2, [{ ...game, winner: 2, loser: 15 }]],
        [8, [{ ...game, winner: 8, loser: 9 }]],
        [21, [{ ...game, winner: 21, loser: 17 }]],
      ]);

      const score = regionalScore(regional, wins);

      expect(score).toBe(700);
    });
  });
  describe('sleeper selection', () => {
    const selection: Region2Sleeper = regional.region2Sleeper;
    describe('regional win', () => {
      it('should return 75 for each win', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(150);
      });
      it('should return 175 for each win by buzzer beater', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, buzzerBeater: true, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(250);
      });
      it('should return 150 for each win by overtime', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, overtime: true, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(225);
      });
      it('should return 250 for each win by overtime buzzer beater', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, overtime: true, buzzerBeater: true, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(325);
      });
      it('should return 200 more for getting to the final four', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, type: 'regional', round: 2 },
              { ...game, winner: selection, type: 'regional', round: 3 },
              { ...game, winner: selection, type: 'regional', round: 4 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(500);
      });
      it('should return 0 for no wins', () => {
        const wins: Wins = new Map([
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(0);
      });
    });
    describe('semifinal win', () => {
      it('should return 200 for each win', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, type: 'semifinal', round: 5 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(200);
      });
      it('should return 400 for each win by buzzer beater', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, buzzerBeater: true, type: 'semifinal', round: 5 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(400);
      });
      it('should return 400 for each win by overtime', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, overtime: true, type: 'semifinal', round: 5 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(400);
      });
      it('should return 600 for each win by overtime buzzer beater', () => {
        const wins: Wins = new Map([
          [
            selection,
            [{ ...game, winner: selection, overtime: true, buzzerBeater: true, type: 'semifinal', round: 5 }],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(600);
      });
      it('should return 0 for no wins', () => {
        const wins: Wins = new Map([
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(0);
      });
    });
    describe('final win', () => {
      it('should return 400 for each win', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(400);
      });
      it('should return 800 for each win by buzzer beater', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, buzzerBeater: true, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(800);
      });
      it('should return 800 for each win by overtime', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, overtime: true, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(800);
      });
      it('should return 1200 for each win by overtime buzzer beater', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, overtime: true, buzzerBeater: true, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(1200);
      });
      it('should return 0 for no wins', () => {
        const wins: Wins = new Map([
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(0);
      });
    });

    it('should aggregate all win scores', () => {
      const wins: Wins = new Map([
        [
          selection,
          [
            { ...game, winner: selection, type: 'regional', round: 1 },
            { ...game, winner: selection, overtime: true, type: 'regional', round: 2 },
            { ...game, winner: selection, buzzerBeater: true, type: 'regional', round: 3 },
            { ...game, winner: selection, type: 'regional', round: 4 },
            { ...game, winner: selection, type: 'semifinal', round: 5 },
            { ...game, winner: selection, type: 'final', round: 6 },
          ],
        ],
        [2, [{ ...game, winner: 2, loser: 15 }]],
        [8, [{ ...game, winner: 8, loser: 9 }]],
        [21, [{ ...game, winner: 21, loser: 17 }]],
      ]);

      const score = regionalScore(regional, wins);

      expect(score).toBe(1275);
    });
  });
  describe('cinderella selection', () => {
    const selection: Region3Cinderella = regional.region3Cinderella;
    describe('regional win', () => {
      it('should return 100 for each win', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(200);
      });
      it('should return 300 for each win by buzzer beater', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, buzzerBeater: true, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(400);
      });
      it('should return 200 for each win by overtime', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, overtime: true, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(300);
      });
      it('should return 400 for each win by overtime buzzer beater', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, overtime: true, buzzerBeater: true, type: 'regional', round: 2 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(500);
      });
      it('should return 300 more for getting to the final four', () => {
        const wins: Wins = new Map([
          [
            selection,
            [
              { ...game, winner: selection, type: 'regional', round: 1 },
              { ...game, winner: selection, type: 'regional', round: 2 },
              { ...game, winner: selection, type: 'regional', round: 3 },
              { ...game, winner: selection, type: 'regional', round: 4 },
            ],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(700);
      });
      it('should return 0 for no wins', () => {
        const wins: Wins = new Map([
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(0);
      });
    });
    describe('semifinal win', () => {
      it('should return 300 for each win', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, type: 'semifinal', round: 5 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(300);
      });
      it('should return 600 for each win by buzzer beater', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, buzzerBeater: true, type: 'semifinal', round: 5 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(600);
      });
      it('should return 600 for each win by overtime', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, overtime: true, type: 'semifinal', round: 5 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(600);
      });
      it('should return 900 for each win by overtime buzzer beater', () => {
        const wins: Wins = new Map([
          [
            selection,
            [{ ...game, winner: selection, overtime: true, buzzerBeater: true, type: 'semifinal', round: 5 }],
          ],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(900);
      });
      it('should return 0 for no wins', () => {
        const wins: Wins = new Map([
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(0);
      });
    });
    describe('final win', () => {
      it('should return 600 for each win', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(600);
      });
      it('should return 1200 for each win by buzzer beater', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, buzzerBeater: true, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(1200);
      });
      it('should return 1200 for each win by overtime', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, overtime: true, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(1200);
      });
      it('should return 1800 for each win by overtime buzzer beater', () => {
        const wins: Wins = new Map([
          [selection, [{ ...game, winner: selection, overtime: true, buzzerBeater: true, type: 'final', round: 6 }]],
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(1800);
      });
      it('should return 0 for no wins', () => {
        const wins: Wins = new Map([
          [2, [{ ...game, winner: 2, loser: 15 }]],
          [8, [{ ...game, winner: 8, loser: 9 }]],
          [21, [{ ...game, winner: 21, loser: 17 }]],
        ]);

        const score = regionalScore(regional, wins);

        expect(score).toBe(0);
      });
    });

    it('should aggregate all win scores', () => {
      const wins: Wins = new Map([
        [
          selection,
          [
            { ...game, winner: selection, type: 'regional', round: 1 },
            { ...game, winner: selection, overtime: true, type: 'regional', round: 2 },
            { ...game, winner: selection, buzzerBeater: true, type: 'regional', round: 3 },
            { ...game, winner: selection, type: 'regional', round: 4 },
            { ...game, winner: selection, type: 'semifinal', round: 5 },
            { ...game, winner: selection, type: 'final', round: 6 },
          ],
        ],
        [2, [{ ...game, winner: 2, loser: 15 }]],
        [8, [{ ...game, winner: 8, loser: 9 }]],
        [21, [{ ...game, winner: 21, loser: 17 }]],
      ]);

      const score = regionalScore(regional, wins);

      expect(score).toBe(1900);
    });
  });
  it('should aggregate all selections win scores', () => {
    const wins: Wins = new Map([
      [
        regional.region1Favorite,
        [
          { ...game, winner: regional.region1Favorite, type: 'regional', round: 1 }, // 50
          { ...game, winner: regional.region1Favorite, overtime: true, type: 'regional', round: 2 }, // 100
          { ...game, winner: regional.region1Favorite, buzzerBeater: true, type: 'regional', round: 3 }, // 100
          { ...game, winner: regional.region1Favorite, type: 'regional', round: 4 }, // 150
          { ...game, winner: regional.region1Favorite, type: 'semifinal', round: 5 }, // 100
          { ...game, winner: regional.region1Favorite, type: 'final', round: 6 }, // 200
        ],
      ], // 700
      [
        regional.region2Sleeper,
        [
          { ...game, winner: regional.region2Sleeper, type: 'regional', round: 1 }, // 75
          { ...game, winner: regional.region2Sleeper, overtime: true, type: 'regional', round: 2 }, // 150
          { ...game, winner: regional.region2Sleeper, buzzerBeater: true, type: 'regional', round: 3 }, // 175
          { ...game, winner: regional.region2Sleeper, type: 'regional', round: 4 }, // 275
        ],
      ], // 675
      [
        regional.region3Cinderella,
        [
          { ...game, winner: regional.region3Cinderella, type: 'regional', round: 1 }, // 100
          { ...game, winner: regional.region3Cinderella, overtime: true, type: 'regional', round: 2 }, // 200
          { ...game, winner: regional.region3Cinderella, buzzerBeater: true, type: 'regional', round: 3 }, // 300
          { ...game, winner: regional.region3Cinderella, type: 'regional', round: 4 }, // 400
          { ...game, winner: regional.region3Cinderella, type: 'semifinal', round: 5 }, // 300
        ],
      ], // 1300
      [
        regional.region4Sleeper,
        [
          { ...game, winner: regional.region4Sleeper, type: 'regional', round: 1 }, // 75
          { ...game, winner: regional.region4Sleeper, overtime: true, type: 'regional', round: 2 }, // 150
          { ...game, winner: regional.region4Sleeper, buzzerBeater: true, type: 'regional', round: 3 }, // 175
          { ...game, winner: regional.region4Sleeper, type: 'regional', round: 4 }, // 275
          { ...game, winner: regional.region4Sleeper, type: 'semifinal', round: 5 }, // 200
        ],
      ], // 875
      [
        regional.bonusFavorite,
        [
          { ...game, winner: regional.bonusFavorite, type: 'regional', round: 1 }, // 50
          { ...game, winner: regional.bonusFavorite, overtime: true, type: 'regional', round: 2 }, // 100
          { ...game, winner: regional.bonusFavorite, buzzerBeater: true, type: 'regional', round: 3 }, // 100
        ],
      ], // 250
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = regionalScore(regional, wins);

    expect(score).toBe(3800);
  });

  it('should return 0 for invalid team', () => {
    const selection: Region1Favorite = 65 as Region1Favorite;

    const wins: Wins = new Map([
      [
        selection,
        [
          { ...game, winner: selection, type: 'regional', round: 1 },
          { ...game, winner: selection, overtime: true, type: 'regional', round: 2 },
          { ...game, winner: selection, buzzerBeater: true, type: 'regional', round: 3 },
          { ...game, winner: selection, type: 'regional', round: 4 },
          { ...game, winner: selection, type: 'semifinal', round: 5 },
          { ...game, winner: selection, type: 'final', round: 6 },
        ],
      ],
      [2, [{ ...game, winner: 2, loser: 15 }]],
      [8, [{ ...game, winner: 8, loser: 9 }]],
      [21, [{ ...game, winner: 21, loser: 17 }]],
    ]);

    const score = regionalScore({ ...regional, region1Favorite: selection }, wins);

    expect(score).toBe(0);
  });
});
