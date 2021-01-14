import { N, Y, matchersTestMatrix } from '~/test-utils';

import { equalTo } from './equal-to';

describe( 'equalTo', () => {
	describe( 'Return value', () => {
		matchersTestMatrix(
			{
				'1': equalTo( 1 ),
				"'foo'": equalTo( 'foo' ),
				'undefined': equalTo( undefined ),
				'true': equalTo( true ),
				'{}': equalTo( {} ),
			},
			[
				[ 1,         { '1': Y, "'foo'": N, 'undefined': N, 'true': N, '{}': N } ],
				[ 'foo',     { '1': N, "'foo'": Y, 'undefined': N, 'true': N, '{}': N } ],
				[ undefined, { '1': N, "'foo'": N, 'undefined': Y, 'true': N, '{}': N } ],
				[ true,      { '1': N, "'foo'": N, 'undefined': N, 'true': Y, '{}': N } ],
				[ {},        { '1': N, "'foo'": N, 'undefined': N, 'true': N, '{}': N } ],
			] );
	} );
} );
