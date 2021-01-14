import { expectTypeOf } from 'expect-type';

import { NonEmptyArray, NonEmptyObject } from './utility';

type TestDict = Partial<{foo: string; bar: number; const: 'const'}>;
describe( 'NonEmpty', ()=> {
	// it( 'NonEmpty', () => {
	// 	expectTypeOf<[string]>().toMatchTypeOf<NonEmpty<string[]>>();
	// 	expectTypeOf<[]>().not.toMatchTypeOf<NonEmpty<string[]>>();
	// 	expectTypeOf<[number]>().not.toMatchTypeOf<NonEmpty<string[]>>();
	// 	expectTypeOf<[[string], [string]]>().toMatchTypeOf<Array<NonEmpty<string[]>>>();
	// 	expectTypeOf<[[string, string], []]>().not.toMatchTypeOf<ReadonlyArray<NonEmpty<string[]>>>();

	// 	expectTypeOf( { foo: 'bar' } ).toMatchTypeOf<NonEmpty<TestDict>>();
	// 	expectTypeOf( { const: 'const' as const } ).toMatchTypeOf<NonEmpty<TestDict>>();
	// 	expectTypeOf( { foo: 'hello', bar: 1 } ).toMatchTypeOf<NonEmpty<TestDict>>();
	// 	expectTypeOf( {} ).not.toMatchTypeOf<NonEmpty<TestDict>>();
	// 	expectTypeOf( { outOfRange: 'NOPE' } ).not.toMatchTypeOf<NonEmpty<TestDict>>();
	// } );
	it( 'NonEmptyArray', () => {
		expectTypeOf<[string]>().toMatchTypeOf<NonEmptyArray<string[]>>();
		expectTypeOf<[]>().not.toMatchTypeOf<NonEmptyArray<string[]>>();
		expectTypeOf<[number]>().not.toMatchTypeOf<NonEmptyArray<string[]>>();
		expectTypeOf<[[string], [string]]>().toMatchTypeOf<Array<NonEmptyArray<string[]>>>();
		expectTypeOf<[[string, string], []]>().not.toMatchTypeOf<ReadonlyArray<NonEmptyArray<string[]>>>();
	} );
	it( 'NonEmptyObject', () => {
		expectTypeOf( { foo: 'bar' } ).toMatchTypeOf<NonEmptyObject<TestDict>>();
		expectTypeOf( { const: 'const' as const } ).toMatchTypeOf<NonEmptyObject<TestDict>>();
		expectTypeOf( { foo: 'hello', bar: 1 } ).toMatchTypeOf<NonEmptyObject<TestDict>>();
		expectTypeOf( {} ).not.toMatchTypeOf<NonEmptyObject<TestDict>>();
		expectTypeOf( { outOfRange: 'NOPE' } ).not.toMatchTypeOf<NonEmptyObject<TestDict>>();
	} );
} );
