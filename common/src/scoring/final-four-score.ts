import { Bracket } from '../types/bracket';
import { Rounds, Wins } from '../types/results';

export function finalFourScore(finalFour: Bracket['finalFour'], currentResults: Wins): number {
  const score = Object.values(finalFour)
    .map((team) =>
      currentResults.get(team)?.find((x) => x.round === Rounds.EliteEight) !== undefined
        ? (200 as number)
        : (0 as number)
    )
    .reduceRight((x, y) => x + y, 0);

  return score === 800 ? 1000 : score;
}
