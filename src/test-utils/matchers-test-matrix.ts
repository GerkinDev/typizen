import { blue, underline, yellow } from 'chalk';
import { identity, sortBy } from 'lodash';

import { TypeCheck } from '~/types';

type MatcherParam<TArgs extends readonly any[] = readonly []> = TypeCheck<any> | readonly [( ...args: TArgs ) => TypeCheck<any>, ...TArgs];

// const extractLabelOf = (fn: Function | FnWithDesc) => 'desc' in fn ? fn.desc : fn.name;

const forFalse = yellow( 'false' );
const forTrue = blue( 'true' );

export const N = false;
export const Y = true;

export const matchersTestMatrix = <T extends Record<string, MatcherParam>>(
	fns: T,
	passes: ReadonlyArray<[value: any, results: {[K in keyof T]: boolean}]>,
) => {
	sortBy( Object.keys( fns ), identity )
		.forEach( fnKey => {
			const fnDesc = fns[fnKey];
			// const name = extractLabelOf( Array.isArray(fnDesc) ? fnDesc[0] : fnDesc);
			const fn = Array.isArray( fnDesc ) ? fnDesc[0]( ...fnDesc.slice( 1 ) as [] ) : fnDesc;
			describe( fnKey, () => {
				it.each( passes
					.map( p => [ p[1][fnKey], p[0] ] as const )
					.map( ( [ e, v ] ) => [ e ? forTrue : forFalse, v, e ] as const ) )(
					`should return %p for ${underline( '%p' )} (%#)`,
					( l, v, expected ) => expect( fn( v ) ).toBe( expected ) );
			} );
		} );
};
