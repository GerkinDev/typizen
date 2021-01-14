/* eslint-disable @typescript-eslint/ban-types */

export type AnyTypeOf = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';
export type ofType<T extends AnyTypeOf> =
	T extends 'string' ? string :
	T extends 'number' ? number :
	T extends 'bigint' ? BigInt | bigint :
	T extends 'boolean' ? boolean :
	T extends 'symbol' ? Symbol | symbol:
	T extends 'undefined' ? undefined :
	T extends 'object' ? Record<any, unknown> | null :
	T extends 'function' ? ( ( ...args: any[] ) => any ) : never;
export const ofType = <T extends AnyTypeOf>( type: T ) => <
	T2 extends ofType<T>,
	TOther extends Exclude<T2, any>
>( v: T2 | TOther ):
	v is Record<any, any> extends ofType<T> ? T2 : ( ofType<T> & T2 ) =>
	typeof v === type;
