import { DefaultContext } from "./context";
import { Handler } from "./handler";
import { MethodHandler, CustomMethodHandler } from "./method-handler";
import { Middleware } from "./middleware";
import { DriftResponse, JSON_RESPONSE, HTML_RESPONSE } from "./response";
import { TrieRouter } from "./trie-router";
import { Unwrap } from "./utils";

export class Drift<TContext = DefaultContext, TRoutes = {}> {
    private trie = new TrieRouter<Handler<any, any>, string>();
    private map = new Map<string, Handler<any, any>>();

    public middleware: Middleware<any>[] = [];

    private handle = async (context: any, middlewares: Middleware<any, any>[], handler: Handler<any, any>) => {
        let index = -1;
        const set = (key: string, value: any) => {
            context[key] = value;
        };
        const next = async (): Promise<DriftResponse<any, any>> => {
            index++;
            if (index < middlewares.length) {
                const mw = middlewares[index];
                return mw({ ...context, next, set });
            }

            return handler(context);
        };

        return next();
    };

    private convertToResponse = <TData>(response: Response | DriftResponse<TData, number>) => {
        if (response instanceof Response) {
            return response;
        }

        switch (response.type) {
            case JSON_RESPONSE: {
                return new Response(JSON.stringify(response.data), {
                    status: response.code,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
            case HTML_RESPONSE: {
                return new Response(response.data, {
                    status: response.code,
                    headers: {
                        "Content-Type": "text/html",
                    },
                });
            }
        }
    };

    private createHandler = (method: string, path: string, ...handlers: any) => {
        const handler: Handler<any, any> = handlers.pop() as any;
        const middlewares: Middleware<any, any>[] = [...this.middleware, ...handlers] as any[];

        const fn = async (context: any) => {
            return this.handle(context, middlewares, handler);
        };
        this.map.set(`${method}:${path}`, fn);
        this.trie.add(path, method, fn);

        return this;
    };

    public use = <const TNewContext = {}, const TNewRoutes = {}>(
        middleware:
            | Middleware<TContext, TNewContext>
            | Drift<TNewContext, TNewRoutes>
            | Promise<Drift<TNewContext, TNewRoutes>>
    ) => {
        if (middleware instanceof Drift) {
            this.middleware.push(...middleware.middleware);
            this.trie.merge(middleware.trie);
            return this as Drift<TNewContext & Unwrap<Omit<TContext, keyof TNewContext>>, TRoutes & TNewRoutes>;
        } else if (middleware instanceof Promise) {
            middleware.then((m) => {
                this.middleware.push(...m.middleware);
                this.trie.merge(m.trie);
            });
            return this as Drift<TNewContext & Unwrap<Omit<TContext, keyof TNewContext>>, TRoutes & TNewRoutes>;
        } else {
            this.middleware.push(middleware);
            return this as Drift<TNewContext & Unwrap<Omit<TContext, keyof TNewContext>>, TRoutes>;
        }
    };

    public get: MethodHandler<"GET", TContext, TRoutes> = (path: string, ...handlers: any) => {
        return this.createHandler("GET", path, ...handlers);
    };

    public post: MethodHandler<"POST", TContext, TRoutes> = (path: string, ...handlers: any) => {
        return this.createHandler("POST", path, ...handlers);
    };

    public put: MethodHandler<"PUT", TContext, TRoutes> = (path: string, ...handlers: any) => {
        return this.createHandler("PUT", path, ...handlers);
    };

    public patch: MethodHandler<"PATCH", TContext, TRoutes> = (path: string, ...handlers: any) => {
        return this.createHandler("PATCH", path, ...handlers);
    };

    public delete: MethodHandler<"DELETE", TContext, TRoutes> = (path: string, ...handlers: any) => {
        return this.createHandler("DELETE", path, ...handlers);
    };

    public all: MethodHandler<"ALL", TContext, TRoutes> = (path: string, ...handlers: any) => {
        return this.createHandler("ALL", path, ...handlers);
    };

    public custom: CustomMethodHandler<TContext, TRoutes> = (method: string, path: string, ...handlers: any) => {
        return this.createHandler(method, path, ...handlers);
    };

    public fetch = async (request: Request) => {
        const url = new URL(request.url);
        const key = `${request.method}-${url.pathname}`;

        let match = { value: this.map.get(key), parameters: {} };

        if (!match.value) {
            match = this.trie.lookup(url.pathname, request.method as any);
        }
        if (!match.value) {
            match = this.trie.lookup(url.pathname, "ALL");
        }
        if (!match.value) {
            match = this.trie.lookup("*", request.method as any);
        }
        if (!match.value) {
            match = this.trie.lookup("*", "ALL");
        }

        const handler = match.value;

        if (handler) {
            return this.convertToResponse(await handler({ request, body: {}, query: {}, params: match.parameters }));
        }

        return new Response("Not found", { status: 404 });
    };
}
