import { ExtendableError } from 'extendable-error';

import { TypeCheck } from './types';

// Expect value
export class AssertionError extends ExtendableError {
	public constructor( public readonly value: unknown, public readonly typechecker: TypeCheck<unknown>, public readonly ancestor?: unknown ) {
		super( `Expected to be ${typechecker}` );
	}
}
