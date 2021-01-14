import { RangeOf, TypeCheck } from '~/types';

/**
 * Prepare a typeguard checking if the tested argument is in [[[from]], [[to]]].
 *
 * @see intInRange for type-safe equivalent to work on int.
 * @param from - Inclusive start of range.
 * @param to - Inclusive end of range.
 * @returns a {@link TypeCheck} function that takes a number and check if it is in range.
 */
export const inRange = ( from: number, to: number ) =>
	( v: number ): v is number => from <= v && to >= v;

/**
 * Prepare a type-safe typeguard checking if the tested **int** is in [[[from]], [[to]]].
 * This method behaves exactly like {@link inRange}, but with types specialized for ints.
 *
 * @see inRange for equivalent to work on floats or (float | int).
 * @param from - Inclusive start of range. **Must be an int**
 * @param to - Inclusive end of range. **Must be an int**
 * @returns a {@link TypeCheck} function that takes a number and check if it is in the possible int range values. (eg: 1|2|3|4)
 */
export const intInRange: <From extends number, To extends number>( from: From, to: To ) => TypeCheck<RangeOf<From, To>> = inRange as any;
