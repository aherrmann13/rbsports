import { Bracket, Team } from "./bracket";

export type Game = {
  winner: Team;
  loser: Team;
  winningTeamScore: number;
  losingTeamScore: number;
  finished: Date;
  overtime: boolean;
  buzzerBeater: boolean;
};

export type CurrentResults = Game[];

export type BracketScore = (b: Bracket, r: CurrentResults) => number;
