import { Request, Response } from 'express';
import { flow, pipe } from 'fp-ts/function';
import { createBracket, deleteBracket, getBracket, updateBracket, getBrackets } from '../services/bracket';
import { Item } from '../validation/item';
import { BracketEntry } from '../validation/bracket';
import { BracketQuery } from '../validation/query';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { sequenceT } from 'fp-ts/Apply';
import { draw } from 'io-ts/Decoder';

const decodeBracketEntry = flow(
  BracketEntry.decode,
  E.mapLeft((err) => draw(err))
);

const decodeItem = flow(
  Item.decode,
  E.mapLeft((err) => draw(err))
);
const decodeBracketQuery = flow(
  BracketQuery.decode,
  E.mapLeft((err) => draw(err))
);

const post = (req: Request, resp: Response): void => {
  pipe(
    E.fromNullable('empty body')(req.body),
    E.chain(decodeBracketEntry),
    E.chain((entry) => createBracket(entry)),
    E.fold(
      (err) => resp.status(400).send(err),
      (bracket) => resp.status(200).send(bracket)
    )
  );
};

const put = (req: Request, resp: Response): void => {
  pipe(
    sequenceT(E.either)(
      pipe(E.fromNullable('id not in path')(req.params), E.chain(decodeItem)),
      pipe(E.fromNullable('empty body')(req.body), E.chain(decodeBracketEntry))
    ),
    E.map((tuple) => ({ ...tuple[0], ...tuple[1] })),
    E.chain((entry) => updateBracket(entry)),
    E.fold(
      (err) => resp.status(400).send(err),
      (bracket) => resp.status(200).send(bracket)
    )
  );
};

const del = (req: Request, resp: Response): void => {
  pipe(
    E.fromNullable('id not in path')(req.params),
    E.chain(decodeItem),
    E.chain(({ id }) => deleteBracket(id)),
    E.fold(
      (err) => resp.status(400).send(err),
      () => resp.status(200).send()
    )
  );
};

const get = (req: Request, resp: Response): void => {
  pipe(
    E.fromNullable('id not in path')(req.params),
    E.chain(decodeItem),
    E.map(({ id }) => getBracket(id)),
    E.fold(
      (err) => resp.status(400).send(err),
      (optionalBracket) =>
        O.fold(
          () => resp.status(200).send(),
          (bracket) => resp.status(200).send(bracket)
        )(optionalBracket)
    )
  );
};

const getMany = (req: Request, resp: Response): void => {
  pipe(
    E.fromNullable('query not provided')(req.query),
    E.chain(decodeBracketQuery),
    E.map((query) => getBrackets(query)),
    E.fold(
      (err) => resp.status(400).send(err),
      (brackets) => resp.status(200).send(brackets)
    )
  );
};

export const bracket = {
  get,
  post,
  put,
  del,
  getMany,
};
