import { Team } from './bracket';

export type RegionalRound = 1 | 2 | 3 | 4;
export type SemifinalRound = 5;
export type FinalRound = 6;
export type TournamentRound = RegionalRound | SemifinalRound | FinalRound;

export enum Rounds {
  FirstRound = 1 as RegionalRound,
  SecondRound = 2 as RegionalRound,
  SweetSixteen = 3 as RegionalRound,
  EliteEight = 4 as RegionalRound,
  FinalFour = 5 as SemifinalRound,
  Championship = 6 as FinalRound,
}

export type GameResults = {
  readonly winner: Team;
  readonly loser: Team;
  readonly winningTeamScore: number;
  readonly losingTeamScore: number;
  readonly finished: Date;
  readonly overtime: boolean;
  readonly buzzerBeater: boolean;
};

export type RegionalGame = {
  readonly type: 'regional';
  readonly round: RegionalRound;
} & GameResults;

export type SemifinalGame = {
  readonly type: 'semifinal';
  readonly round: SemifinalRound;
} & GameResults;

export type FinalGame = {
  readonly type: 'final';
  readonly round: FinalRound;
} & GameResults;

export type Game = RegionalGame | SemifinalGame | FinalGame;

export type Wins = Map<Team, Game[]>;

export type BracketScore = {
  readonly score: number;
  readonly offset?: number;
};
