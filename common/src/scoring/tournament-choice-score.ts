import { Bracket } from '../types/bracket';
import { Rounds, Wins } from '../types/results';

export function tournamentChoiceScore(choice: Bracket['tournamentChoice'], currentResults: Wins): number {
  return currentResults.get(choice)?.find((x) => x.round === Rounds.Championship) !== undefined ? 500 : 0;
}
