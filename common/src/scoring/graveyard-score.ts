import { Bracket, Team } from '../types/bracket';
import { Game, Wins } from '../types/results';

export function graveyardScore(graveyard: Bracket['graveyard'], currentResults: Wins): number {
  const oneSeeds: Set<Team> = new Set([1, 17, 33, 49] as Team[]);

  const losingOneSeeds = Array.from(currentResults.values())
    .reduce((x, y) => [...x, ...y], [] as Game[])
    .filter((x) => oneSeeds.has(x.loser))
    // two one seeds lose at *exactly* the same time what happens
    .sort((x, y) => x.finished.getTime() - y.finished.getTime());

  return losingOneSeeds[0]?.loser === graveyard ? 300 : 0;
}
