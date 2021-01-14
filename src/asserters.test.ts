jest.mock( './assertion-error', () => ( {
	AssertionError: jest.fn(),
} ) );

import { onlyIf } from './asserters';
import { AssertionError } from './assertion-error';
import { TypeCheck } from './types';

beforeEach( () => jest.clearAllMocks() );
describe( 'onlyIf', () => {
	describe( 'Pass', () => {
		const fn = jest.fn().mockReturnValue( true ) as unknown as TypeCheck<any>;
		it( 'should return the input value if the type checker returned true', () => {
			expect( onlyIf( 'foo', fn ) ).toBe( 'foo' );
			expect( fn ).toHaveBeenCalledTimes( 1 );
			expect( fn ).toHaveBeenCalledWith( 'foo' );
		} );
	} );
	describe( 'Fail', () => {
		it( 'should throw a correct AssertionError if the type checker returned false', () => {
			const fn = jest.fn().mockReturnValue( false ) as unknown as TypeCheck<any>;
			expect( () => onlyIf( 'qux', fn ) ).toThrow( AssertionError );
			expect( ( AssertionError as jest.MockedClass<typeof AssertionError> ) ).toHaveBeenCalledWith( 'qux', fn );
			expect( fn ).toHaveBeenCalledTimes( 1 );
			expect( fn ).toHaveBeenCalledWith( 'qux' );
		} );
		it( 'should throw a correct AssertionError if the type checker threw', () => {
			const exampleError = new Error( 'EXAMPLE' );
			const fn = jest.fn().mockImplementation( () => {
				throw exampleError;
			} ) as unknown as TypeCheck<any>;
			expect( () => onlyIf( 'qux', fn ) ).toThrow( AssertionError );
			expect( ( AssertionError as jest.MockedClass<typeof AssertionError> ) ).toHaveBeenCalledWith( 'qux', fn, exampleError );
			expect( fn ).toHaveBeenCalledTimes( 1 );
			expect( fn ).toHaveBeenCalledWith( 'qux' );
		} );
	} );
} );

// describe('assertThat', () => {

// })
