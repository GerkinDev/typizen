/* eslint-disable @typescript-eslint/ban-types */
import { expectTypeOf } from 'expect-type';

import { GuardedType } from '~/types';

import { AnyTypeOf, ofType } from './of-type';
// describe( 'Return value', () => {
// } );
describe( 'Types', () => {
	it( 'string', () => {
		const testOfType = ofType( 'string' );
		type TMatched = string;
		const sample = 'foo';
		const testValue: typeof sample | Exclude<ofType<AnyTypeOf>, TMatched> = sample;

		expectTypeOf<GuardedType<typeof testOfType>>().toEqualTypeOf<TMatched>();
		expectTypeOf<typeof testOfType>().parameter( 0 ).toEqualTypeOf<TMatched>();
		if( testOfType( testValue ) ){
			expectTypeOf( testValue ).toEqualTypeOf<typeof sample>();
		} else {
			expectTypeOf( testValue ).toBeNever();
		}
	} );
	it( 'number', () => {
		const testOfType = ofType( 'number' );
		type TMatched = number;
		const sample = 42;
		const testValue: typeof sample | Exclude<ofType<AnyTypeOf>, TMatched> = sample;

		expectTypeOf<GuardedType<typeof testOfType>>().toEqualTypeOf<TMatched>();
		expectTypeOf<typeof testOfType>().parameter( 0 ).toEqualTypeOf<TMatched>();
		if( testOfType( testValue ) ){
			expectTypeOf( testValue ).toEqualTypeOf<typeof sample>();
		} else {
			expectTypeOf( testValue ).toBeNever();
		}
	} );
	it( 'bigint', () => {
		const testOfType = ofType( 'bigint' );
		type TMatched = bigint | BigInt
		const sample = 42n;
		const testValue: typeof sample | Exclude<ofType<AnyTypeOf>, TMatched> = sample;

		expectTypeOf<GuardedType<typeof testOfType>>().toEqualTypeOf<TMatched>();
		expectTypeOf<typeof testOfType>().parameter( 0 ).toEqualTypeOf<TMatched>();
		if( testOfType( testValue ) ){
			expectTypeOf( testValue ).toEqualTypeOf<typeof sample>();
		} else {
			expectTypeOf( testValue ).toBeNever();
		}
	} );
	it( 'boolean', () => {
		const testOfType = ofType( 'boolean' );
		type TMatched = boolean
		const sample = true;
		const testValue: typeof sample | Exclude<ofType<AnyTypeOf>, TMatched> = sample;

		expectTypeOf<GuardedType<typeof testOfType>>().toEqualTypeOf<TMatched>();
		expectTypeOf<typeof testOfType>().parameter( 0 ).toEqualTypeOf<TMatched>();
		if( testOfType( testValue ) ){
			expectTypeOf( testValue ).toEqualTypeOf<typeof sample>();
		} else {
			expectTypeOf( testValue ).toBeNever();
		}
	} );
	it( 'symbol', () => {
		const testOfType = ofType( 'symbol' );
		type TMatched = Symbol | symbol
		const sample = Symbol.match;
		const testValue: typeof sample | Exclude<ofType<AnyTypeOf>, TMatched> = sample;

		expectTypeOf<GuardedType<typeof testOfType>>().toEqualTypeOf<TMatched>();
		expectTypeOf<typeof testOfType>().parameter( 0 ).toEqualTypeOf<TMatched>();
		if( testOfType( testValue ) ){
			expectTypeOf( testValue ).toEqualTypeOf<typeof sample>();
		} else {
			expectTypeOf( testValue ).toBeNever();
		}
	} );
	it( 'undefined', () => {
		const testOfType = ofType( 'undefined' );
		type TMatched = undefined
		const sample = undefined;
		const testValue: typeof sample | Exclude<ofType<AnyTypeOf>, TMatched> = sample;

		expectTypeOf<GuardedType<typeof testOfType>>().toEqualTypeOf<TMatched>();
		expectTypeOf<typeof testOfType>().parameter( 0 ).toEqualTypeOf<TMatched>();
		if( testOfType( testValue ) ){
			expectTypeOf( testValue ).toEqualTypeOf<typeof sample>();
		} else {
			expectTypeOf( testValue ).toBeNever();
		}
	} );
	it( 'function', () => {
		const testOfType = ofType( 'function' );
		type TMatched = ( ( ...args: any[] ) => any );
		const sample = ( _foo: 1 ) => 2 as const;
		const testValue: typeof sample | Exclude<ofType<AnyTypeOf>, TMatched | Object> = sample;

		expectTypeOf<GuardedType<typeof testOfType>>().toEqualTypeOf<TMatched>();
		expectTypeOf<typeof testOfType>().parameter( 0 ).toEqualTypeOf<TMatched>();
		if( testOfType( testValue ) ){
			expectTypeOf( testValue ).toEqualTypeOf<typeof sample>();
		} else {
			expectTypeOf( testValue ).toBeNever();
		}
	} );
	it( 'object', () => {
		const testOfType = ofType( 'object' );
		type TMatched = Record<any, unknown> | null;
		const sample = { foo: 'bar' };
		const testValue: typeof sample | Exclude<ofType<AnyTypeOf>, TMatched> = sample;

		expectTypeOf<GuardedType<typeof testOfType>>().toEqualTypeOf<TMatched>();
		expectTypeOf<typeof testOfType>().parameter( 0 ).toEqualTypeOf<TMatched>();
		if( testOfType( testValue ) ){
			expectTypeOf( testValue ).toEqualTypeOf<typeof sample>();
		} else {
			expectTypeOf( testValue ).toBeNever();
		}
	} );

	const testOther = ofType( 'other' as AnyTypeOf );
	expectTypeOf<GuardedType<typeof testOther>>().not.toBeAny();

	// @ts-expect-error Out of range literals are invalid
	expectTypeOf( ofType( 'other' ) );

	// @ts-expect-error String are invalid
	expectTypeOf( ofType( 'other' as string ) );
} );
