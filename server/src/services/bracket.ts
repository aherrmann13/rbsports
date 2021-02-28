/* istanbul ignore file */

import { BracketQuery, SavedItem, BracketEntry } from '@rbsports/common';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';

/* eslint-disable @typescript-eslint/no-unused-vars */

type Error = string;

export const createBracket = (entry: BracketEntry): E.Either<Error, SavedItem<BracketEntry>> => {
  return E.right({ ...entry, id: 1 });
};
export const updateBracket = (entry: SavedItem<BracketEntry>): E.Either<Error, SavedItem<BracketEntry>> => {
  return E.right(entry);
};

export const deleteBracket = (id: number): E.Either<Error, void> => {
  return E.right(undefined);
};

export const getBracket = (id: number): O.Option<SavedItem<BracketEntry>> => {
  return O.none;
};

export const getBrackets = (query: BracketQuery): Array<SavedItem<BracketEntry>> => {
  return [];
};
