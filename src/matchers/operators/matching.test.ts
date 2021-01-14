import { N, Y, matchersTestMatrix } from '~/test-utils';

import { matching } from './matching';

describe( 'matching', () => {
	describe( 'Return value', () => {
		matchersTestMatrix(
			{
				'/.*/': matching( /.*/ ),
				'/.+/': matching( /.+/ ),
				'/^$/': matching( /^$/ ),
			},
			[
				[ 'abc', { '/.*/': Y, '/.+/': Y, '/^$/': N } ],
				[ '',    { '/.*/': Y, '/.+/': N, '/^$/': Y } ],
			] );
	} );
} );
