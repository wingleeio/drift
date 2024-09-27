import { ContextWithMiddleware } from "./context";
import { Middleware } from "./middleware";
import { DriftResponse } from "./response";

export type Handler<TContext = {}, TData = {}> = (
    context: TContext
) => Promise<DriftResponse<TData, number>> | DriftResponse<TData, number>;

export type HandlerWithMiddleware<TContext = {}, TData = {}, TMiddlewares extends Middleware<any>[] = []> = Handler<
    ContextWithMiddleware<TContext, TMiddlewares>,
    TData
>;
