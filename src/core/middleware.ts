import { DefaultContext } from "./context";
import { DriftResponse } from "./response";

export type MiddlewareContext<TNewContext> = {
    set: <const TKey extends keyof TNewContext, TValue extends TNewContext[TKey]>(key: TKey, value: TValue) => void;
    next: () => Promise<DriftResponse<any, any>>;
};

export type Middleware<TContext = DefaultContext, TNewContext = {}> = <T extends TNewContext>(
    context: TContext & MiddlewareContext<T>
) => Promise<DriftResponse<any, any>>;

export const createMiddleware = <TContext = {}>(middlewareFn: Middleware<DefaultContext, TContext>) => {
    return middlewareFn;
};
