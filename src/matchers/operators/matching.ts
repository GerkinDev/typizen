import { TypeCheck } from '~/types';

export const matching = ( pattern: RegExp ): TypeCheck<string, string> => v => !!v.match( pattern );
