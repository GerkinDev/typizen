/* eslint-disable no-underscore-dangle */
import { equalTo } from './operators/equal-to';
import { ofType } from './operators/of-type';

export const null_ = equalTo( null );
export const undefined_ = equalTo( undefined );
export const bigint_ = ofType( 'bigint' );
export const boolean_ = ofType( 'boolean' );
export const function_ = ofType( 'function' );
export const number_ = ofType( 'number' );
export const object_ = ofType( 'object' );
export const string_ = ofType( 'string' );
export const symbol_ = ofType( 'symbol' );
export const array_ = <TIn>( v: TIn ): v is TIn & readonly unknown[] =>
	Array.isArray( v );

