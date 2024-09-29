import { createMiddleware } from "../core/middleware";
import { type, Type } from "arktype";

export const params = <const TSchema extends Type>(schema: TSchema) => {
    return createMiddleware<{ params: TSchema["infer"] }>(async ({ query, set, next }) => {
        const out = schema(query);
        if (out instanceof type.errors) {
            return new Response(
                JSON.stringify({
                    message: "Invalid parameters",
                    errors: out.map((err) => ({
                        path: err.path,
                        code: err.code,
                        message: err.message,
                    })),
                }),
                { status: 400 }
            );
        }
        set("params", out);
        return next();
    });
};

export const query = <const TSchema extends Type>(schema: TSchema) => {
    return createMiddleware<{ query: TSchema["infer"] }>(async ({ query, set, next }) => {
        const out = schema(query);
        if (out instanceof type.errors) {
            return new Response(
                JSON.stringify({
                    message: "Invalid query",
                    errors: out.map((err) => ({
                        path: err.path,
                        code: err.code,
                        message: err.message,
                    })),
                }),
                { status: 400 }
            );
        }
        set("query", out);
        return next();
    });
};

export const body = <const TSchema extends Type>(schema: TSchema) => {
    return createMiddleware<{ body: TSchema["infer"] }>(async ({ body, set, next }) => {
        const out = schema(body);
        if (out instanceof type.errors) {
            return new Response(
                JSON.stringify({
                    message: "Invalid body",
                    errors: out.map((err) => ({
                        path: err.path,
                        code: err.code,
                        message: err.message,
                    })),
                }),
                { status: 400 }
            );
        }
        set("body", out);
        return next();
    });
};
