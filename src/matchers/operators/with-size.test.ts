/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-expressions */

import { expectTypeOf } from 'expect-type';
import { range } from 'lodash';

import { N, Y, matchersTestMatrix } from '~/test-utils';

import { withSize } from './with-size';
import { MinSizedArray } from './with-size-types';

describe( 'Return value', () => {
	const testData = range( 0, 9 ).map( i => [ String.fromCharCode( 'a'.charCodeAt( 0 ) + i ), i ] as const );
	const makeObj = ( size: number ) => Object.fromEntries( testData.slice( 0, size ) );
	const makeArr = ( size: number ) => testData.slice( 0, size ).map( t => t[0] );
	const makeStr = ( size: number ) => makeArr( size ).join( '' );
	const makeSet = ( size: number ) => new Set( makeArr( size ) );
	const makeMap = ( size: number ) => new Map( Object.entries( makeObj( size ) ) );
	matchersTestMatrix(
		{
			0: withSize( 0 ),
			1: withSize( 1 ),
			9: withSize( 9 ),
		},
		[
			[ makeObj( 0 ), { 0: Y, 1: N, 9: N } ],
			[ makeArr( 0 ), { 0: Y, 1: N, 9: N } ],
			[ makeStr( 0 ), { 0: Y, 1: N, 9: N } ],
			[ makeSet( 0 ), { 0: Y, 1: N, 9: N } ],
			[ makeMap( 0 ), { 0: Y, 1: N, 9: N } ],
			[ makeObj( 1 ), { 0: N, 1: Y, 9: N } ],
			[ makeArr( 1 ), { 0: N, 1: Y, 9: N } ],
			[ makeStr( 1 ), { 0: N, 1: Y, 9: N } ],
			[ makeSet( 1 ), { 0: N, 1: Y, 9: N } ],
			[ makeMap( 1 ), { 0: N, 1: Y, 9: N } ],
			[ makeObj( 9 ), { 0: N, 1: N, 9: Y } ],
			[ makeArr( 9 ), { 0: N, 1: N, 9: Y } ],
			[ makeStr( 9 ), { 0: N, 1: N, 9: Y } ],
			[ makeSet( 9 ), { 0: N, 1: N, 9: Y } ],
			[ makeMap( 9 ), { 0: N, 1: N, 9: Y } ],
		] );
} );
describe( 'Types', () => {
	it( 'MinSizedArray', () => {
		// Disable because of awkward type checking.
		// expectTypeOf<MinSizedArray<string, 2>>().toEqualTypeOf( [ 'a', 'b' ] );
		// expectTypeOf( [ 'a', 'b' ] ).toEqualTypeOf<MinSizedArray<string, 2>>();
		// expectTypeOf<MinSizedArray<string, 2>>().toMatchTypeOf( [ 'a', 'b' ] );
		// expectTypeOf( [ 'a', 'b' ] ).toMatchTypeOf<MinSizedArray<string, 2>>();

		// With exact typing
		// In range
		expectTypeOf<MinSizedArray<string, 0>[0]>().toEqualTypeOf<string | undefined>();
		expectTypeOf<MinSizedArray<string, 2>[1]>().toBeString();
		expectTypeOf<MinSizedArray<string, 2>[1 | 0]>().toBeString();
		// Out of range
		expectTypeOf<MinSizedArray<string, 2>[2]>().toEqualTypeOf<string | undefined>();
		expectTypeOf<MinSizedArray<string, 2>[number]>().toEqualTypeOf<string | undefined>();

		// With approx typing
		expectTypeOf<MinSizedArray<string, 65>[number]>().toEqualTypeOf<string>();
	} );
	it( 'withSize', () => {
		const size2 = withSize( 2 );
		const size0 = withSize( 0 );

		const arrStr = ( [] as string[] );
		const arrCst = [ 'a', 'b' ] as const;

		if( size2( arrStr ) ){
			expectTypeOf( arrStr ).toEqualTypeOf<[string, string]>();
			expectTypeOf( arrStr ).not.toEqualTypeOf<string[]>();
		} else {
			expectTypeOf( arrStr ).toEqualTypeOf<string[]>();
		}
		if( size2( arrCst ) ){
			expectTypeOf( arrCst ).toMatchTypeOf<['a', 'b']>();
			expectTypeOf( arrCst ).not.toEqualTypeOf<string[]>();
		} else {
			// @ts-expect-error TODO: Fix it
			expectTypeOf( arrCst ).toBeNever();
		}


		if( size0( arrStr ) ){
			expectTypeOf( arrStr ).toEqualTypeOf<[]>();
		} else {
			expectTypeOf( arrStr ).toEqualTypeOf<string[]>();
		}
		if( size0( arrCst ) ){
			expectTypeOf( arrCst ).toEqualTypeOf<never>();
		} else {
			expectTypeOf( arrCst ).toEqualTypeOf<readonly ['a', 'b']>();
		}
	} );
} );
