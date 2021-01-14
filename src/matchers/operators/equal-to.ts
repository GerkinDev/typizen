import { TypeCheck } from '~/types';

// export const equalTo = <T>(v1: T): TypeCheck<T> =>
// 	attachDesc((v2: any): v2 is T => v1 === v2, `equal to ${v1}`);
export const equalTo: {
	<T extends string>( v1: T ): TypeCheck<T>;
	<T extends number>( v1: T ): TypeCheck<T>;
	<T extends boolean>( v1: T ): TypeCheck<T>;
	<T extends bigint>( v1: T ): TypeCheck<T>;
	<T>( v1: T ): TypeCheck<T>;
} = <T>( v1: T ): TypeCheck<T> => ( v2: any ): v2 is T => v1 === v2;
