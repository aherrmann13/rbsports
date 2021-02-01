import { Bracket, isCinderella, isFavorite, isSleeper } from '../types/bracket';
import { FinalGame, GameResults, RegionalGame, Rounds, SemifinalGame, Wins } from '../types/results';

function winValue(
  game: GameResults,
  values: {
    victory: number;
    overtime: number;
    buzzerBeater: number;
  }
): number {
  const score = [values.victory, game.overtime ? values.overtime : 0, game.buzzerBeater ? values.buzzerBeater : 0];
  return score.reduce((x, y) => x + y, 0);
}

function regionalWinValue(game: RegionalGame): number {
  if (isFavorite(game.winner)) {
    const finalFourBonus = game.round === Rounds.EliteEight ? 100 : 0;
    return winValue(game, { victory: 50, overtime: 50, buzzerBeater: 50 }) + finalFourBonus;
  } else if (isSleeper(game.winner)) {
    const finalFourBonus = game.round === Rounds.EliteEight ? 200 : 0;
    return winValue(game, { victory: 75, overtime: 75, buzzerBeater: 100 }) + finalFourBonus;
  } else if (isCinderella(game.winner)) {
    const finalFourBonus = game.round === Rounds.EliteEight ? 300 : 0;
    return winValue(game, { victory: 100, overtime: 100, buzzerBeater: 200 }) + finalFourBonus;
  } else {
    return 0;
  }
}

function semifinalWinValue(game: SemifinalGame): number {
  if (isFavorite(game.winner)) {
    return winValue(game, { victory: 100, overtime: 100, buzzerBeater: 100 });
  } else if (isSleeper(game.winner)) {
    return winValue(game, { victory: 200, overtime: 200, buzzerBeater: 200 });
  } else if (isCinderella(game.winner)) {
    return winValue(game, { victory: 300, overtime: 300, buzzerBeater: 300 });
  } else {
    return 0;
  }
}

function finalWinValue(game: FinalGame): number {
  if (isFavorite(game.winner)) {
    return winValue(game, { victory: 200, overtime: 200, buzzerBeater: 200 });
  } else if (isSleeper(game.winner)) {
    return winValue(game, { victory: 400, overtime: 400, buzzerBeater: 400 });
  } else if (isCinderella(game.winner)) {
    return winValue(game, { victory: 600, overtime: 600, buzzerBeater: 600 });
  } else {
    return 0;
  }
}

export function regionalScore(regional: Bracket['regional'], currentResults: Wins): number {
  return Object.values(regional)
    .map(
      (team) =>
        currentResults
          .get(team)
          ?.map((game) => {
            switch (game.type) {
              case 'regional':
                return regionalWinValue(game);
              case 'semifinal':
                return semifinalWinValue(game);
              case 'final':
                return finalWinValue(game);
            }
          })
          .reduce((x, y) => x + y, 0) ?? 0
    )
    .reduce((x, y) => x + y, 0);
}
