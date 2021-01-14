import { expectTypeOf } from 'expect-type';

import { N, Y, matchersTestMatrix } from '~/test-utils';
import { GuardedType } from '~/types';

import { array_, null_, number_, string_, undefined_ } from './type-checks';

describe( 'asserts', () => {
	matchersTestMatrix(
		{ null_, undefined_, string_, number_ },
		[
			[ null,      { null_: Y, undefined_: N, string_: N, number_: N } ],
			[ undefined, { null_: N, undefined_: Y, string_: N, number_: N } ],
			[ '',        { null_: N, undefined_: N, string_: Y, number_: N } ],
			[ 'foo',     { null_: N, undefined_: N, string_: Y, number_: N } ],
			[ 42,        { null_: N, undefined_: N, string_: N, number_: Y } ],
		] );
} );
it( 'Types', () => {
	expectTypeOf<[]>().toMatchTypeOf<GuardedType<typeof array_>>();
	expectTypeOf<readonly []>().toMatchTypeOf<GuardedType<typeof array_>>();
	expectTypeOf<any[]>().toMatchTypeOf<GuardedType<typeof array_>>();
	expectTypeOf<readonly unknown[]>().toMatchTypeOf<GuardedType<typeof array_>>();
	expectTypeOf<[string, never]>().toMatchTypeOf<GuardedType<typeof array_>>();
	expectTypeOf<readonly [string]>().toMatchTypeOf<GuardedType<typeof array_>>();
	// expectTypeOf<Record<number, never>>().toMatchTypeOf<GuardedType<typeof array_>>(); // FIXME
	// expectTypeOf<Record<number, string>>().toMatchTypeOf<GuardedType<typeof array_>>(); // FIXME
} );
