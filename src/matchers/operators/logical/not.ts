import { TypeCheck } from '~/types';

export const not = <T>( assert: TypeCheck<T> ) => <TIn>( v: TIn ): v is Exclude<TIn, T> => !assert( v );
