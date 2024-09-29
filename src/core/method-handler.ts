import { DRIFT_ERROR } from "src/core/error";
import { DefaultContext, ContextWithPath, ContextWithMiddleware } from "./context";
import { Drift } from "./framework";
import { Handler, HandlerWithMiddleware } from "./handler";
import { Middleware } from "./middleware";
import { Unwrap } from "./utils";

export type NewRoute<
    TContext = DefaultContext,
    TPath extends string = "",
    TMethod extends string = "",
    TData = any,
    TMiddlewares extends Middleware<any, any>[] = [Middleware<any, any>]
> = {
    [key in TPath]: {
        [key in TMethod]: {
            // @ts-ignore
            input: ContextWithMiddleware<TContext, TMiddlewares>["body"];
            // @ts-ignore
            query: ContextWithMiddleware<TContext, TMiddlewares>["query"];
            // @ts-ignore
            params: ContextWithMiddleware<TContext, TMiddlewares>["params"];
            output: TData extends {
                [DRIFT_ERROR]: any;
                code: number;
                data: infer TErrorData;
            }
                ? {
                      [key in TData["code"]]: TErrorData;
                  }
                : {
                      200: TData;
                  };
        };
    };
};

export interface MethodHandler<TMethod extends string, TContext = {}, TRoutes = {}> {
    <const TPath extends string, TData = any>(
        path: TPath,
        handler: Handler<ContextWithPath<TContext, TPath>, TData>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, []>>>;

    <const TPath extends string, TData = any, TM1 extends Middleware<any, any> = Middleware<any, any>>(
        path: TPath,
        middleware1: TM1,
        handler: HandlerWithMiddleware<TContext, TData, [TM1]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1]>>>;

    <
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>
    >(
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2]>>>;

    <
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>
    >(
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3]>>>;

    <
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>
    >(
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4]>>>;

    <
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>
    >(
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5]>>>;

    <
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>,
        TM6 extends Middleware<any, any> = Middleware<any, any>
    >(
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        middleware6: TM6,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5, TM6]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5, TM6]>>>;

    <
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>,
        TM6 extends Middleware<any, any> = Middleware<any, any>,
        TM7 extends Middleware<any, any> = Middleware<any, any>
    >(
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        middleware6: TM6,
        middleware7: TM7,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7]>
    ): Drift<
        TContext,
        TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7]>>
    >;

    <
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>,
        TM6 extends Middleware<any, any> = Middleware<any, any>,
        TM7 extends Middleware<any, any> = Middleware<any, any>,
        TM8 extends Middleware<any, any> = Middleware<any, any>
    >(
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        middleware6: TM6,
        middleware7: TM7,
        middleware8: TM8,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7, TM8]>
    ): Drift<
        TContext,
        TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7, TM8]>>
    >;

    <
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>,
        TM6 extends Middleware<any, any> = Middleware<any, any>,
        TM7 extends Middleware<any, any> = Middleware<any, any>,
        TM8 extends Middleware<any, any> = Middleware<any, any>,
        TM9 extends Middleware<any, any> = Middleware<any, any>
    >(
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        middleware6: TM6,
        middleware7: TM7,
        middleware8: TM8,
        middleware9: TM9,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7, TM8, TM9]>
    ): Drift<
        TContext,
        TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7, TM8, TM9]>>
    >;
}

export interface CustomMethodHandler<TContext = {}, TRoutes = {}> {
    <const TMethod extends string, const TPath extends string, TData = any>(
        method: TMethod,
        path: TPath,
        handler: Handler<ContextWithPath<TContext, TPath>, TData>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, []>>>;

    <
        const TMethod extends string,
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>
    >(
        method: TMethod,
        path: TPath,
        middleware1: TM1,
        handler: HandlerWithMiddleware<TContext, TData, [TM1]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1]>>>;

    <
        const TMethod extends string,
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>
    >(
        method: TMethod,
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2]>>>;

    <
        const TMethod extends string,
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>
    >(
        method: TMethod,
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3]>>>;

    <
        const TMethod extends string,
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>
    >(
        method: TMethod,
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4]>>>;

    <
        const TMethod extends string,
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>
    >(
        method: TMethod,
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5]>>>;

    <
        const TMethod extends string,
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>,
        TM6 extends Middleware<any, any> = Middleware<any, any>
    >(
        method: TMethod,
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        middleware6: TM6,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5, TM6]>
    ): Drift<TContext, TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5, TM6]>>>;

    <
        const TMethod extends string,
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>,
        TM6 extends Middleware<any, any> = Middleware<any, any>,
        TM7 extends Middleware<any, any> = Middleware<any, any>
    >(
        method: TMethod,
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        middleware6: TM6,
        middleware7: TM7,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7]>
    ): Drift<
        TContext,
        TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7]>>
    >;

    <
        const TMethod extends string,
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>,
        TM6 extends Middleware<any, any> = Middleware<any, any>,
        TM7 extends Middleware<any, any> = Middleware<any, any>,
        TM8 extends Middleware<any, any> = Middleware<any, any>
    >(
        method: TMethod,
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        middleware6: TM6,
        middleware7: TM7,
        middleware8: TM8,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7, TM8]>
    ): Drift<
        TContext,
        TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7, TM8]>>
    >;

    <
        const TMethod extends string,
        const TPath extends string,
        TData = any,
        TM1 extends Middleware<any, any> = Middleware<any, any>,
        TM2 extends Middleware<any, any> = Middleware<any, any>,
        TM3 extends Middleware<any, any> = Middleware<any, any>,
        TM4 extends Middleware<any, any> = Middleware<any, any>,
        TM5 extends Middleware<any, any> = Middleware<any, any>,
        TM6 extends Middleware<any, any> = Middleware<any, any>,
        TM7 extends Middleware<any, any> = Middleware<any, any>,
        TM8 extends Middleware<any, any> = Middleware<any, any>,
        TM9 extends Middleware<any, any> = Middleware<any, any>
    >(
        method: TMethod,
        path: TPath,
        middleware1: TM1,
        middleware2: TM2,
        middleware3: TM3,
        middleware4: TM4,
        middleware5: TM5,
        middleware6: TM6,
        middleware7: TM7,
        middleware8: TM8,
        middleware9: TM9,
        handler: HandlerWithMiddleware<TContext, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7, TM8, TM9]>
    ): Drift<
        TContext,
        TRoutes & Unwrap<NewRoute<TContext, TPath, TMethod, TData, [TM1, TM2, TM3, TM4, TM5, TM6, TM7, TM8, TM9]>>
    >;
}
