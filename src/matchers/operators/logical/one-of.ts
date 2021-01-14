import { TypeCheck } from '~/types';

type TC<T> = TypeCheck<T>;
export const oneOf: {
	<T1, T2>( a: TC<T1>, b: TC<T2> ): ( v: any ) => v is T1 | T2;
	<T1, T2, T3>( a: TC<T1>, b: TC<T2>, c: TC<T3> ): ( v: any ) => v is T1 | T2 | T3;
	<T1, T2, T3, T4>( a: TC<T1>, b: TC<T2>, c: TC<T3>, d: TC<T4> ): ( v: any ) => v is T1 | T2 | T3 | T4;
	<T1, T2, T3, T4, T5>( a: TC<T1>, b: TC<T2>, c: TC<T3>, d: TC<T4>, e: TC<T5> ): ( v: any ) => v is T1 | T2 | T3 | T4 | T5;
	<T1, T2, T3, T4, T5, T6>( a: TC<T1>, b: TC<T2>, c: TC<T3>, d: TC<T4>, e: TC<T5>, f: TC<T6> ): ( v: any ) => v is T1 | T2 | T3 | T4 | T5 | T6;
} = ( ...asserts: Array<TC<any>> ): any => ( v: any ) => asserts.filter( a => a( v ) ).length === 0;
