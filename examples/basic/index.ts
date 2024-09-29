import { body, query } from "src/validation/arktype";

import { Drift, error } from "src";
import { type } from "arktype";
import {} from "src/core/error";

// import { Drift, json } from "dist";
// import { body, query } from "dist/arktype";

const app = new Drift()
    .get("/", () => {
        if (Math.random() > 0.5) {
            return error({ message: "Random error" }, 500);
        }
        return { message: "Hello, World!" };
    })
    .post(
        "/echo",
        query(
            type({
                page: "string.numeric",
            })
        ),
        body(
            type({
                message: "string",
                file: "File",
            })
        ),
        ({ body, query: { page } }) => {
            return {
                ...body,
                page,
            };
        }
    );

Bun.serve({
    port: 3000,
    fetch: app.fetch,
});

console.log("Server is running on http://localhost:3000");
