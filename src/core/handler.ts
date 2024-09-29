import { ContextWithMiddleware } from "./context";
import { Middleware } from "./middleware";

export type Handler<TContext = {}, TData = {}> = (context: TContext) => Promise<TData> | TData;

export type HandlerWithMiddleware<TContext = {}, TData = {}, TMiddlewares extends Middleware<any>[] = []> = Handler<
    ContextWithMiddleware<TContext, TMiddlewares>,
    TData
>;
