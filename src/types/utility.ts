import { RequireAtLeastOne } from 'type-fest';

import { ArrayIsh } from './array-ish';

/* eslint-disable @typescript-eslint/ban-types */
export type TypeCheck<T extends TParam, TParam = any> =
	| ( ( v: TParam ) => v is T )
	| ( ( v: TParam ) => boolean );
export type TypeCheckRet<T> = T extends TypeCheck<infer TRet> ? TRet : never;

type Fn = () => any;
export type FnWithDesc<T extends Fn = Fn> = T & {desc: string};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type GuardedType<T> = T extends ( v: any, ...args: any[] ) => v is infer TGuarded ? TGuarded : never;

/** @see https://stackoverflow.com/a/58778817 */
export type NonEmptyArray<T> = T extends ArrayIsh<infer U> ? ArrayIsh.Tuple<U> : never;
export type NonEmptyObject<T> = RequireAtLeastOne<T>;
export type NonEmpty<T> = keyof T extends number ? T extends {[key: number]: infer U} ? NonEmptyArray<U> : RequireAtLeastOne<T> : RequireAtLeastOne<T>;

// const attachDesc = <T extends Fn>( fn: T, desc: string ): FnWithDesc<T> => {
// 	const f = fn as FnWithDesc<T>;
// 	f.desc = desc;
// 	return f;
// };
