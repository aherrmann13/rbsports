import { bracketScore } from 'scoring/bracket-score';
import { Bracket } from 'types/bracket';
import { Game, Wins } from 'types/results';
import { fastbreakTrioScore } from 'scoring/fastbreak-trio-score';
import { finalFourScore } from 'scoring/final-four-score';
import { regionalScore } from 'scoring/regional-score';
import { sweetSixteenScore } from 'scoring/sweet-sixteen-score';
import { tournamentChoiceScore } from 'scoring/tournament-choice-score';
import { graveyardScore } from 'scoring/graveyard-score';

jest.mock('scoring/fastbreak-trio-score');
jest.mock('scoring/final-four-score');
jest.mock('scoring/regional-score');
jest.mock('scoring/sweet-sixteen-score');
jest.mock('scoring/tournament-choice-score');
jest.mock('scoring/graveyard-score');

describe('bracketScore', () => {
  const fastbreakTrioScoreMock = fastbreakTrioScore as jest.Mock;
  const finalFourScoreMock = finalFourScore as jest.Mock;
  const regionalScoreMock = regionalScore as jest.Mock;
  const sweetSixteenScoreMock = sweetSixteenScore as jest.Mock;
  const tournamentChoiceScoreMock = tournamentChoiceScore as jest.Mock;
  const graveyardScoreMock = graveyardScore as jest.Mock;

  const mocks = [
    fastbreakTrioScoreMock,
    finalFourScoreMock,
    regionalScoreMock,
    sweetSixteenScoreMock,
    tournamentChoiceScoreMock,
    graveyardScoreMock,
  ];

  beforeEach(() => {
    mocks.forEach((mock) => {
      mock.mockReset();
      mock.mockReturnValue(0);
    });
  });

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
  const wins: Wins = new Map([
    [2, [{ ...game, winner: 2, loser: 15 }]],
    [8, [{ ...game, winner: 8, loser: 9 }]],
    [21, [{ ...game, winner: 21, loser: 17 }]],
  ]);
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

  it('should return results of fastbreakTrioScore', () => {
    const fastbreakTrioScoreValue = 100;
    fastbreakTrioScoreMock.mockReturnValue(fastbreakTrioScoreValue);
    const score = bracketScore(bracket, wins);

    expect(score.score).toBe(fastbreakTrioScoreValue);
    expect(fastbreakTrioScoreMock).toBeCalledWith(bracket.fastbreakTrio, wins);
    expect(fastbreakTrioScoreMock).toHaveBeenCalledTimes(1);
  });
  it('should return results of finalFourScore', () => {
    const finalFourScoreValue = 100;
    finalFourScoreMock.mockReturnValue(finalFourScoreValue);
    const score = bracketScore(bracket, wins);

    expect(score.score).toBe(finalFourScoreValue);
    expect(finalFourScoreMock).toBeCalledWith(bracket.finalFour, wins);
    expect(finalFourScoreMock).toHaveBeenCalledTimes(1);
  });
  it('should return results of regionalScore', () => {
    const regionalScoreValue = 100;
    regionalScoreMock.mockReturnValue(regionalScoreValue);
    const score = bracketScore(bracket, wins);

    expect(score.score).toBe(regionalScoreValue);
    expect(regionalScoreMock).toBeCalledWith(bracket.regional, wins);
    expect(regionalScoreMock).toHaveBeenCalledTimes(1);
  });
  it('should return results of sweetSixteenScore', () => {
    const sweetSixteenScoreValue = 100;
    sweetSixteenScoreMock.mockReturnValue(sweetSixteenScoreValue);
    const score = bracketScore(bracket, wins);

    expect(score.score).toBe(sweetSixteenScoreValue);
    expect(sweetSixteenScoreMock).toBeCalledWith(bracket.sweetSixteen, wins);
    expect(sweetSixteenScoreMock).toHaveBeenCalledTimes(1);
  });
  it('should return results of graveyardScore', () => {
    const graveyardScoreValue = 100;
    graveyardScoreMock.mockReturnValue(graveyardScoreValue);
    const score = bracketScore(bracket, wins);

    expect(score.score).toBe(graveyardScoreValue);
    expect(graveyardScoreMock).toBeCalledWith(bracket.graveyard, wins);
    expect(graveyardScoreMock).toHaveBeenCalledTimes(1);
  });
  it('should return results of tournamentChoiceScore', () => {
    const tournamentChoiceScoreValue = 100;
    tournamentChoiceScoreMock.mockReturnValue(tournamentChoiceScoreValue);
    const score = bracketScore(bracket, wins);

    expect(score.score).toBe(tournamentChoiceScoreValue);
    expect(tournamentChoiceScoreMock).toBeCalledWith(bracket.tournamentChoice, wins);
    expect(tournamentChoiceScoreMock).toHaveBeenCalledTimes(1);
  });
  it('should return aggregrate of all values', () => {
    mocks.forEach((mock, index) => {
      mock.mockReturnValue(index + 1);
    });

    const score = bracketScore(bracket, wins);
    expect(score.score).toBe(21);
  });
  it('should return offset of tournament guess and chamionship', () => {
    const totalPointsScored = 130;
    const chamionship: Wins = new Map([
      [
        1,
        [
          {
            ...game,
            type: 'final',
            round: 6,
            winningTeamScore: 80,
            losingTeamScore: 70,
          },
        ],
      ],
    ]);

    const score = bracketScore({ ...bracket, totalPointsScored }, new Map([...wins, ...chamionship]));
    expect(score.offset).toBe(20);
  });
  it('should return absolute value of offset of tournament guess and chamionship', () => {
    const totalPointsScored = 170;
    const chamionship: Wins = new Map([
      [
        1,
        [
          {
            ...game,
            type: 'final',
            round: 6,
            winningTeamScore: 80,
            losingTeamScore: 70,
          },
        ],
      ],
    ]);

    const score = bracketScore({ ...bracket, totalPointsScored }, new Map([...wins, ...chamionship]));
    expect(score.offset).toBe(20);
  });
  it('should return offset of first championship played (edge case)', () => {
    const totalPointsScored = 200;
    const chamionship: Wins = new Map([
      [
        1,
        [
          {
            ...game,
            type: 'final',
            round: 6,
            winningTeamScore: 80,
            losingTeamScore: 70,
            finished: new Date(2021, 3, 3),
          },
        ],
      ],
      [
        5,
        [
          {
            ...game,
            type: 'final',
            round: 6,
            winningTeamScore: 90,
            losingTeamScore: 80,
            finished: new Date(2021, 3, 1),
          },
        ],
      ],
    ]);

    const score = bracketScore({ ...bracket, totalPointsScored }, new Map([...wins, ...chamionship]));
    expect(score.offset).toBe(30);
  });
  it('should return undefined as offset when championship has not been played', () => {
    const score = bracketScore({ ...bracket }, wins);

    expect(score.offset).toBeUndefined();
  });
});
