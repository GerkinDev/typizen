import { expectTypeOf } from 'expect-type';

import { ArrayIsh } from './array-ish';

it( 'ArrayIsh', () => {
	// type T<U> = U extends [any, ...any[]] | [] ? 'TUPLE' :
	// 	U extends readonly [any, ...any[]] | readonly [] ? 'READONLY TUPLE' :
	// 	U extends any[] ? 'ARRAY' :
	// 	U extends readonly any[] ? 'READONLY ARRAY' : never;

	// type T2 = T<readonly [1]>;

	expectTypeOf<string[]>().toMatchTypeOf<ArrayIsh<string>>();
	expectTypeOf<readonly string[]>().toMatchTypeOf<ArrayIsh<string>>();
	expectTypeOf<[]>().toMatchTypeOf<ArrayIsh<string>>();
	expectTypeOf<readonly []>().toMatchTypeOf<ArrayIsh<string>>();
	expectTypeOf<['foo']>().toMatchTypeOf<ArrayIsh<string>>();
	expectTypeOf<readonly ['foo']>().toMatchTypeOf<ArrayIsh<string>>();
	expectTypeOf<readonly [1]>().not.toMatchTypeOf<ArrayIsh<string>>();
	expectTypeOf<readonly [any]>().toMatchTypeOf<ArrayIsh<string>>();
	expectTypeOf<readonly [unknown]>().not.toMatchTypeOf<ArrayIsh<string>>();
	expectTypeOf<readonly [unknown]>().toMatchTypeOf<ArrayIsh<unknown>>();
	expectTypeOf<readonly []>().toMatchTypeOf<ArrayIsh<never>>();
	expectTypeOf<[]>().toMatchTypeOf<ArrayIsh<never>>();
	expectTypeOf<ArrayIsh<string>[number]>().toBeString();
	// const a: readonly string[] | string = [] as any;
	// if( array_( a ) ){
	// 	console.log( a );
	// 	console.log( a[0] );
	// } else {
	// 	console.log( a );
	// }

} );
