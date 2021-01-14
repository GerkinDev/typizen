import { N, Y, matchersTestMatrix } from '~/test-utils';

import { empty } from './empty';

describe( 'empty', () => {
	describe( 'Return value', () => {
		matchersTestMatrix(
			{
				e: empty,
			},
			[
				[[],                     { e: Y } ],
				[ {},                    { e: Y } ],
				[ new Map(),             { e: Y } ],
				[ new Set(),             { e: Y } ],
				[ '',                    { e: Y } ],
				// [ new WeakMap(),     { 'e': N } ],
				// [ new WeakSet(),     { 'e': N } ],
				[[ 1 ],                  { e: N } ],
				[ { foo: 'bar' },        { e: N } ],
				[ new Map( [[ 1, 1 ]] ), { e: N } ],
				[ new Set( [ 1 ] ),      { e: N } ],
				[ 'foo',                 { e: N } ],
			] );
	} );
} );
