import { pipe } from 'fp-ts/lib/function';
import * as D from 'io-ts/lib/Decoder';

const NumberWithStringConversion: D.Decoder<unknown, number> = pipe(
  D.union(D.string, D.number),
  D.parse((s) => {
    const n = parseInt(s.toString());
    return isNaN(n) ? D.failure(s, 'StringToNumber') : D.success(n);
  })
);
export const Item = D.type({
  id: NumberWithStringConversion,
});
