/* eslint-disable @typescript-eslint/no-unused-vars */
import { RangeOf, TupleOf } from '~/types';

type MAX_EXACT_SIZE = 64;
type EXACT_RANGE = RangeOf<0, MAX_EXACT_SIZE>;

// // type K<P> = (keyof P) | (keyof any[])
// // type K2 = K<any[]>
// type K = keyof any[]

// type Test = Array<Record<any, any>>;

// type Not<Range, Value> = ( Value extends Range ? never : Value ) & ( Range extends Value ? never : Value );

// const a: Not<string, 'foo'> = 'foo';
// const b: Not<string, 'bar'> = 'foo';
// const c: Not<'bar' | 'qux' | 'baz', 'yolo'> = 'yolo';
// const d: Not<'bar' | 'qux' | 'baz', 'baz'> = 'baz';

// type ArrayIndexes<Size extends number> = Exclude<RangeOf<0, Size>, Size>;

// // @ts-expect-error aaa
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const foo: Exclude<ArrayIndexes<50>, ArrayIndexes<42>> = 41;

// // type Foo = ArrayIndexes<12>;
// /** @see https://github.com/sindresorhus/type-fest/blob/master/source/fixed-length-array.d.ts */
// // export type SizedArray<Element, Size extends number, ArrayProto = Element[]> = {
// // // 	[index in ArrayIndexes<Size>]: Element;
// // // } & {
// // // 	[index2 in Not<ArrayIndexes<Size>, index>]: undefined;
// // } & {
// // 	[index in keyof ArrayProto as ArrayIndexes<Size>]: Element;
// // } & {
// // 	[index in keyof ArrayProto]: Not<ArrayIndexes<Size>, index> extends index ? undefined : never;
// // } & {
// // 	// eslint-disable-next-line @typescript-eslint/tslint/config
// // 	[Symbol.iterator](): IterableIterator<Element>;
// // }

type T = MinSizedArrayExact<string, 0>[0];

type MinSizedArrayExact<Element, Size extends number, TArr = [Element, ...Element[]]> = Size extends 0 ?
	Array<undefined | Element> :
	[
		...TupleOf<Element, Size>,
		...Array<undefined | Element>
	] & Pick<
		TArr,
		Exclude<keyof TArr, number>
	>

export type MinSizedArray<Element, Size extends number, TArr = [Element, ...Element[]]> = Size extends EXACT_RANGE
	? MinSizedArrayExact<Element, Size, TArr> : Element[]
