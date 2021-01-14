import { expectTypeOf } from 'expect-type';

import { array_ } from '~/matchers/type-checks';

import { empty } from '../empty';

import { allOf } from './all-of';
it( 'Types', () => {
	expectTypeOf( allOf( array_, empty ) );
} );
