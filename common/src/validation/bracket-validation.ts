import { Bracket, Cinderella, Favorite, Sleeper } from '../types/bracket';
import { pipe, flow } from 'fp-ts/lib/function';
import { getSemigroup, NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { sequenceT } from 'fp-ts/lib/Apply';
import * as E from 'fp-ts/lib/Either';

/**
 * TODO: new place for these
 *
 * fp notes:
 * either provides a function `getValidation` that returns an alternate instance of either that can accumulate errors
 * on the left side using the provided semigroup instance
 *
 * `sequenceT` takes a list of "monadic operations" (monad instances?) that it combines into a tuple.
 * `sequenceT(O.option)(O.none, O.some("a"), O.some(2))` equals O.none
 * `sequenceT(O.option)(O.some("a"), O.some(2))` equals O.some(["a", 2])
 *
 * in the case of either, `left` short circuts so the first left encountered will be returned. in the case of the
 * validation either, left will accumulate all `left` values and combine them with the semigroup instance for that type
 */

export type DuplicateFavoriteError = {
  type: 'duplicateFavorite';
  message: 'duplicate favorite in bonus region';
  favorite: Favorite;
};
export type DuplicateSleeperError = {
  type: 'duplicateSleeper';
  message: 'duplicate sleeper in bonus region';
  sleeper: Sleeper;
};
export type DuplicateCinderellaError = {
  type: 'duplicateCinderella';
  message: 'duplicate cinderella in bonus region';
  cinderella: Cinderella;
};
export type BracketError = DuplicateFavoriteError | DuplicateSleeperError | DuplicateCinderellaError;

export const DuplicateFavoriteError: (favorite: Favorite) => DuplicateFavoriteError = (favorite: Favorite) => ({
  type: 'duplicateFavorite',
  message: 'duplicate favorite in bonus region',
  favorite,
});
export const DuplicateSleeperError: (sleeper: Sleeper) => DuplicateSleeperError = (sleeper: Sleeper) => ({
  type: 'duplicateSleeper',
  message: 'duplicate sleeper in bonus region',
  sleeper,
});
export const DuplicateCinderellaError: (cinderella: Cinderella) => DuplicateCinderellaError = (
  cinderella: Cinderella
) => ({
  type: 'duplicateCinderella',
  message: 'duplicate cinderella in bonus region',
  cinderella,
});
const applicativeValidation = E.getValidation(getSemigroup<BracketError>());

const checkBonusFavoriteNotSelectedAlready: (b: Bracket) => E.Either<NonEmptyArray<BracketError>, Bracket> = flow(
  E.fromPredicate(
    (bracket) =>
      [
        bracket.regional.region1Favorite,
        bracket.regional.region2Favorite,
        bracket.regional.region3Favorite,
        bracket.regional.region4Favorite,
      ].find((x) => x === bracket.regional.bonusFavorite) === undefined,
    (bracket) => DuplicateFavoriteError(bracket.regional.bonusFavorite)
  ),
  E.mapLeft((x) => [x])
);

const checkBonusSleeperNotSelectedAlready: (b: Bracket) => E.Either<NonEmptyArray<BracketError>, Bracket> = flow(
  E.fromPredicate(
    (bracket) =>
      [
        bracket.regional.region1Sleeper,
        bracket.regional.region2Sleeper,
        bracket.regional.region3Sleeper,
        bracket.regional.region4Sleeper,
      ].find((x) => x === bracket.regional.bonusSleeper) === undefined,
    (bracket) => DuplicateSleeperError(bracket.regional.bonusSleeper)
  ),
  E.mapLeft((x) => [x])
);

const checkBonusCinderellaNotSelectedAlready: (b: Bracket) => E.Either<NonEmptyArray<BracketError>, Bracket> = flow(
  E.fromPredicate(
    (bracket) =>
      [
        bracket.regional.region1Cinderella,
        bracket.regional.region2Cinderella,
        bracket.regional.region3Cinderella,
        bracket.regional.region4Cinderella,
      ].find((x) => x === bracket.regional.bonusCinderella) === undefined,
    (bracket) => DuplicateCinderellaError(bracket.regional.bonusCinderella)
  ),
  E.mapLeft((x) => [x])
);

export function validateBracket(bracket: Bracket): E.Either<NonEmptyArray<BracketError>, Bracket> {
  return pipe(
    sequenceT(applicativeValidation)(
      checkBonusFavoriteNotSelectedAlready(bracket),
      checkBonusSleeperNotSelectedAlready(bracket),
      checkBonusCinderellaNotSelectedAlready(bracket)
    ),
    E.map(() => bracket)
  );
}
