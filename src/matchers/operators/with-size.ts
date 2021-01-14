import { TupleOf } from '~/types';

import { array_ } from '../type-checks';

export interface withSize {
	<Size extends number>( size: Size ): withSize.forArray<Size>;
	(): void;
}
export namespace withSize {
	export interface forArray<Size extends number> {
		// <TElem, TInspected = [TElem, ...TElem[]]>( v: TElem[] ): v is MinSizedArray<TElem, Size, TInspected>;
		// eslint-disable-next-line @typescript-eslint/prefer-function-type
		<T>( v: T[] | readonly T[] ): v is TupleOf<T, Size>;
		// <TElem>( v: readonly TElem[] ): v is TupleOf<TElem, Size>;
	}
}
const getSizeOf = ( v: unknown ): number | null => {
	if(
		array_( v ) ||
		typeof v === 'string'
	) {
		return v.length;
	}
	if( v instanceof Map || v instanceof Set ){
		return v.size;
	}
	if( typeof v === 'object' ){
		return Object.getOwnPropertyNames( v ).length;
	}

	return null;
};
export const withSize = <Size extends number>( size: Size ): withSize.forArray<Size> =>
	( ( param: unknown ): boolean => {
		const actualSize = getSizeOf( param );
		if( actualSize === null ){
			return false;
		}
		return size === actualSize;
	} ) as any;
