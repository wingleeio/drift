export type Unwrap<T> = T extends object ? { [K in keyof T]: Unwrap<T[K]> } : T;
