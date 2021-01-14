import { blue, bold, underline, yellow } from 'chalk';
import { expectTypeOf } from 'expect-type';
import { identity } from 'lodash';

import { N, Y } from '~/test-utils';
import { TypeCheck } from '~/types';

import { AssertionError, allOf, empty, equalTo, inRange, matching, not, null_, ofType, onlyIf, someOf, string_, undefined_, withSize } from '~';

const fail = yellow( 'fail' );
const pass = blue( 'pass' );
const formatResult = ( errorLabel?: string | boolean ) => {
	if( errorLabel ){
		if( errorLabel === true ){
			return fail;
		} else {
			return `${fail} with "${bold( errorLabel )}"}`;
		}
	} else {
		return pass;
	}
};
const formatLabel = ( testLabel?: string, errorLabel?: string | boolean ) => {
	const result = formatResult( errorLabel );
	if( testLabel ){
		return `${result  } on ${underline( testLabel )}`;
	} else {
		return result;
	}
};

const is = identity as <T extends TIn, TIn>( assert: TypeCheck<T, any> ) => TypeCheck<T, TIn>;

describe( 'onlyIf', () => {
	const tests: Array<[assert: ( v: any ) => any, testLabel?: string, error?: ( string | boolean )]> = [
		[ () => onlyIf( 'foo', () => true ),                              'stub',           N ],
		[ () => onlyIf( 'foo', () => false ),                             'stub',           Y ],
		[ () => onlyIf( null, is( null_ ) ),                              'is null',        N ],
		[ () => onlyIf( null, is( equalTo( 'foo' ) ) ),                   'equal to foo',   Y ],
		[ () => onlyIf( 'foo', is( string_ ) ),                           'is string',      N ],
		[ () => onlyIf( 'foo', is( matching( /./ ) ) ),                   'regex',          N ],
		[ () => onlyIf( 'foo', is( allOf( string_, matching( /./ ) ) ) ), 'string + regex', N ],
		[ () => onlyIf( 'foo' as 'foo' | null, is( not( null_ ) ) ),                      'non null',       N ],
		[ () => onlyIf( null, is( someOf( null_, undefined_ ) ) ),        'null | undef',   N ],
		[ () => onlyIf( [], is( not( empty ) ) ),                         'not empty',      Y ],
		[ () => onlyIf( [], is( withSize( 42 ) ) ),                       'with size',      Y ],
		[ () => onlyIf( [ 1 ], is( withSize( 1 ) ) ),                     'with size',      N ],
		[ () => onlyIf( 20, is( inRange( 40, 50 ) ) ),                    'in range',       Y ],
		[ () => onlyIf( 42, is( inRange( 40, 50 ) ) ),                    'in range',       N ],
		[ () => onlyIf( 42, is( ofType( 'number' ) ) ),                   'type number',    N ],
	];
	it.each( tests.map( ( [ assert, label, errorLabel ] ) => [
		formatLabel( label, errorLabel ),
		assert,
		errorLabel,
	] as const ) )( 'should %s: test %#', ( res, factory, errorLabel ) => {
		if( errorLabel ) {
			expect( factory ).toThrowError( AssertionError );
			expect( factory ).toThrowError( errorLabel === true ? undefined : errorLabel );
		} else {
			expect( factory ).not.toThrow();
		}
	} );
	it( 'types', () => {
		return;
		// expectTypeOf( onlyIf( 'foo' as 'foo' | null, is( not( null_ ) ) ) ).toEqualTypeOf( 'foo' ); // FIXME
		expectTypeOf( onlyIf( [], is( not( empty ) ) ) ).toEqualTypeOf<never[]>();
		// expectTypeOf( onlyIf( [] as const, is( not( empty ) ) ) ).toEqualTypeOf<never>(); // FIXME
		expectTypeOf( onlyIf( null as 'null' | null, is( null_ ) ) ).toEqualTypeOf( null );
		expectTypeOf( onlyIf( 'null', is( null_ ) ) ).toBeNever();
		expectTypeOf( onlyIf( null, is( equalTo( 'foo' ) ) ) ).toBeNever();
		expectTypeOf( onlyIf( 'foo', is( equalTo( 'foo' ) ) ) ).toEqualTypeOf<'foo'>();
		expectTypeOf( onlyIf( '' as string, is( equalTo( 'foo' ) ) ) ).toEqualTypeOf<'foo'>();
		// expectTypeOf( onlyIf( [ 1, 2 ], withSize( 2 ) ) ).toMatchTypeOf<[number, number]>(); // FIXME
	} );
} );

// describe('assertThat', () => {

// })
