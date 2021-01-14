import { AssertionError } from './assertion-error';
import { TypeCheck } from './types';

export const onlyIf = <T, TIn>( v: TIn, check: TypeCheck<T> ): T & TIn => {
	try {
		if( !check( v ) ){
			throw new AssertionError( v, check );
		}
	} catch( e ){
		throw e instanceof AssertionError ? e : new AssertionError( v, check, e );
	}
	return v;
};

export const assertThat = <T, TIn>( v: TIn, check: TypeCheck<T> ): asserts v is T & TIn => {
	onlyIf( v, check );
};
