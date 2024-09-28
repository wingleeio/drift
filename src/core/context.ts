import { Middleware } from "./middleware";

export type DefaultContext = {
    request: Request;
    body: any;
    query: any;
    params: any;
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

type ExtractPathParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractPathParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
    ? { [K in Param]: string }
    : {};

export type ContextWithPath<TContext, TPath extends string> = {
    params: ExtractPathParams<TPath>;
} & Omit<TContext, "params">;

export type ContextWithMiddleware<
    TContext,
    TMiddlewares extends Middleware<any, any>[]
> = ExtractContext<TMiddlewares> & Omit<TContext, keyof ExtractContext<TMiddlewares>>;
