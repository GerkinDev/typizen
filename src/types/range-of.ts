import { TupleOf } from './tuple-of';

// https://github.com/microsoft/TypeScript/issues/15480#issuecomment-754770670
export type RangeOf<ToOrFrom extends number, To extends number | undefined = undefined> = _RangeOf<ToOrFrom, To> extends never ? number : _RangeOf<ToOrFrom, To>;
type _RangeOf<ToOrFrom extends number, To extends number | undefined = undefined> = To extends number ? _RangeOf2<ToOrFrom, To> : _RangeOf2<1, ToOrFrom>;
// https://github.com/microsoft/TypeScript/issues/15480#issuecomment-754795473
type _RangeOf2<From extends number, To extends number> = Exclude<__RangeOf<To>, __RangeOf<From>> | From;
type __RangeOf<N extends number> = Partial<TupleOf<unknown, N>>['length'];
