type RoRecord<K extends keyof any, T> = {
	readonly [P in K]: T;
};

export type ArrayIsh<T> = ArrayIsh.Empty | ArrayIsh.Tuple<T> | ArrayIsh.Array<T> | ArrayIsh.NumericRecord<T>;
export namespace ArrayIsh {
	export type Empty = [] | readonly [];
	export type Tuple<T> = [T, ...T[]] | readonly [T, ...T[]];
	export type Array<T> = T[] | readonly T[];
	export type NumericRecord<T> = Record<number, T> | RoRecord<number, T>
}
