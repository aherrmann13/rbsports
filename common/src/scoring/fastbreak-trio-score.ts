import { Bracket } from '../types/bracket';
import { Rounds, Wins } from '../types/results';

export function fastbreakTrioScore(trio: Bracket['fastbreakTrio'], currentResults: Wins): number {
  const success =
    currentResults.get(trio.favorite)?.find((x) => x.round === Rounds.FirstRound) !== undefined &&
    currentResults.get(trio.sleeper)?.find((x) => x.round === Rounds.FirstRound) !== undefined &&
    currentResults.get(trio.cinderella)?.find((x) => x.round === Rounds.FirstRound) !== undefined;

  return success ? 150 : 0;
}
