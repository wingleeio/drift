import { createMiddleware } from "../core/middleware";
import { type, Type } from "arktype";

export const query = <const TSchema extends Type>(schema: TSchema) => {
    return createMiddleware<{ query: TSchema["infer"] }>(async ({ request, set, next }) => {
        const url = new URL(request.url);
        const queryParams = Object.fromEntries(url.searchParams.entries());
        const query = schema(queryParams);
        if (query instanceof type.errors) {
            return new Response(
                JSON.stringify({
                    message: "Invalid query",
                    errors: query.map((err) => ({
                        path: err.path,
                        code: err.code,
                        message: err.message,
                    })),
                }),
                { status: 400 }
            );
        }
        set("query", query as any);
        return next();
    });
};

export const body = <const TSchema extends Type>(schema: TSchema) => {
    return createMiddleware<{ body: TSchema["infer"] }>(async ({ request, set, next }) => {
        const json = await request.json();
        const body = schema(json);
        if (body instanceof type.errors) {
            return new Response(
                JSON.stringify({
                    message: "Invalid body",
                    errors: body.map((err) => ({
                        path: err.path,
                        code: err.code,
                        message: err.message,
                    })),
                }),
                { status: 400 }
            );
        }
        set("body", body as any);
        return next();
    });
};
