import { Bracket } from '../types/bracket';
import { Rounds, Wins } from '../types/results';

export function sweetSixteenScore(sweetSixteen: Bracket['sweetSixteen'], currentResults: Wins): number {
  const score = [
    currentResults.get(sweetSixteen.favorite)?.find((x) => x.round === Rounds.SecondRound) !== undefined ? 100 : 0,
    currentResults.get(sweetSixteen.sleeper)?.find((x) => x.round === Rounds.SecondRound) !== undefined ? 200 : 0,
    currentResults.get(sweetSixteen.cinderella)?.find((x) => x.round === Rounds.SecondRound) !== undefined ? 300 : 0,
  ].reduceRight((x, y) => x + y, 0);

  return score === 600 ? 800 : score;
}
