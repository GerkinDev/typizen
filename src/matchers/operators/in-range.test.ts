/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-expressions */
import { expectTypeOf } from 'expect-type';

import { N, Y, matchersTestMatrix } from '~/test-utils';

import { inRange, intInRange } from './in-range';

describe( 'Return value', () => {
	matchersTestMatrix(
		{
			'[1,2]': inRange( 1, 2 ),
			'[4,9]': inRange( 4, 9 ),
			'[9,4]': inRange( 9, 4 ),
		},
		[
			[ 0, { '[1,2]': N, '[4,9]': N, '[9,4]': N } ],
			[ 1, { '[1,2]': Y, '[4,9]': N, '[9,4]': N } ],
			[ 2, { '[1,2]': Y, '[4,9]': N, '[9,4]': N } ],
			[ 3, { '[1,2]': N, '[4,9]': N, '[9,4]': N } ],
			[ 4, { '[1,2]': N, '[4,9]': Y, '[9,4]': N } ],
			[ 5, { '[1,2]': N, '[4,9]': Y, '[9,4]': N } ],
			[ 6, { '[1,2]': N, '[4,9]': Y, '[9,4]': N } ],
			[ 7, { '[1,2]': N, '[4,9]': Y, '[9,4]': N } ],
			[ 8, { '[1,2]': N, '[4,9]': Y, '[9,4]': N } ],
			[ 9, { '[1,2]': N, '[4,9]': Y, '[9,4]': N } ],
		] );
} );
describe( 'Types', () => {
	it( 'inRange', () => {
		const intgRange = intInRange( 1, 2 );
		const numRange1 = inRange( 1, 2 );
		const numRange2 = inRange( 2, 1 );

		const intg1C = 1 as const;
		const intg1L = 1;
		const intg2C = 3 as const;
		const intg2L = 3;
		const floatC = 1.5 as const;
		const floatL = 1.5;
		const numbrL = 3 as number;
		const epsiln = Number.EPSILON;

		if( intgRange( intg1C ) ){
			expectTypeOf( intg1C ).toEqualTypeOf<1>();
			expectTypeOf<typeof intg1C>().toEqualTypeOf<1>();
		} else {
			expectTypeOf( intg1C ).toBeNever();
		}
		if( intgRange( intg1L ) ){
			expectTypeOf<typeof intg1L>().toEqualTypeOf<1>();
		} else {
			expectTypeOf( intg1L ).toBeNever();
		}

		if( intgRange( intg2C ) ){
			expectTypeOf( intg2C ).toBeNever();
		} else {
			expectTypeOf( intg2C ).toEqualTypeOf<3>();
			expectTypeOf<typeof intg2C>().toEqualTypeOf<3>();
		}
		if( intgRange( intg2L ) ){
			expectTypeOf( intg2L ).toBeNever();
		} else {
			expectTypeOf<typeof intg2L>().toEqualTypeOf<3>();
		}

		/** TODO: This can't work since TS dont make the difference between int & number
		if( intgRange( floatC ) ){
			expectTypeOf( floatC ).toEqualTypeOf<1.5>();
			expectTypeOf<typeof floatC>().toEqualTypeOf<1.5>();
		} else {
			expectTypeOf( floatC ).toBeNever();
		}
		if( intgRange( floatL ) ){
			expectTypeOf<typeof floatL>().toEqualTypeOf<1.5>();
		} else {
			expectTypeOf( floatL ).toBeNever();
		} */

		// TODO: Other cases
	} );
} );
