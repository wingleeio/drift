import { Middleware } from "./middleware";

export type DefaultContext = {
    request: Request;
};

export type ExtractContext<TMiddlewares extends Middleware<any, any>[]> = TMiddlewares extends [
    infer TFirstMiddleware,
    ...infer TRestMiddlewares
]
    ? TFirstMiddleware extends Middleware<any, infer TFirstContext>
        ? TRestMiddlewares extends Middleware<any, any>[]
            ? ExtractContext<TRestMiddlewares> & Omit<TFirstContext, keyof ExtractContext<TRestMiddlewares>>
            : TFirstContext
        : {}
    : {};

export type ExtractPathParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof ExtractPathParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
    ? { [k in Param]: string }
    : {};

export type ContextWithPath<TContext, TPath extends string> = {
    params: ExtractPathParams<TPath>;
} & Omit<TContext, "params">;

export type ContextWithMiddleware<
    TContext,
    TMiddlewares extends Middleware<any, any>[]
> = ExtractContext<TMiddlewares> & Omit<TContext, keyof ExtractContext<TMiddlewares>>;
