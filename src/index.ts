export { assertThat, onlyIf } from './asserters';
export * from './assertion-error';
export * from './matchers';
export const is = <T>( v: T ): T => v;
