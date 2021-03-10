import type { IO } from 'fp-ts/lib/IO';
import { map as ioMap } from 'fp-ts/lib/IO';
import { chain as oChain, map as oMap, Option } from 'fp-ts/lib/Option';

export const mapIoOption = <A, B>(f: (a: A) => B) => (
  ioa: IO<Option<A>>,
): IO<Option<B>> => {
  return ioMap(oMap(f))(ioa);
};

export const chainIoOption = <A, B>(f: (a: A) => Option<B>) => (ioa: IO<Option<A>>): IO<Option<B>> => {
  return ioMap(oChain(f))(ioa);
}