import { Bracket } from 'types/bracket';
import { BracketScore, Game, Rounds, Wins } from 'types/results';
import { fastbreakTrioScore } from 'scoring/fastbreak-trio-score';
import { finalFourScore } from 'scoring/final-four-score';
import { regionalScore } from 'scoring/regional-score';
import { sweetSixteenScore } from 'scoring/sweet-sixteen-score';
import { tournamentChoiceScore } from 'scoring/tournament-choice-score';
import { graveyardScore } from 'scoring/graveyard-score';

function calculateOffset(guess: Bracket['totalPointsScored'], currentResults: Wins): number | undefined {
  // sort in case for some reason there are two 'finals' due
  // to invalid data we always get the same results
  const game = Array.from(currentResults.values())
    .reduce((x, y) => [...x, ...y], [] as Game[])
    .sort((x, y) => x.finished.getTime() - y.finished.getTime())
    .find((x) => x.round === Rounds.Championship);

  if (game !== undefined) {
    const { winningTeamScore, losingTeamScore } = game;
    return Math.abs(winningTeamScore + losingTeamScore - guess);
  } else {
    return undefined;
  }
}

export function bracketScore(bracket: Bracket, currentResults: Wins): BracketScore {
  const score =
    regionalScore(bracket.regional, currentResults) +
    fastbreakTrioScore(bracket.fastbreakTrio, currentResults) +
    sweetSixteenScore(bracket.sweetSixteen, currentResults) +
    finalFourScore(bracket.finalFour, currentResults) +
    graveyardScore(bracket.graveyard, currentResults) +
    tournamentChoiceScore(bracket.tournamentChoice, currentResults);

  const offset = calculateOffset(bracket.totalPointsScored, currentResults);

  return { score, offset };
}
