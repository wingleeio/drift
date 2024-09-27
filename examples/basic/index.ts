import { type } from "arktype";
import { Drift, json } from "dist";
import { body } from "dist/arktype";

const app = new Drift()
    .get("/", () => {
        return json({ message: "Hello, World!" });
    })
    .post(
        "/echo",
        body(
            type({
                message: "string",
            })
        ),
        ({ body }) => {
            return json(body);
        }
    );

Bun.serve({
    port: 3000,
    fetch: app.fetch,
});
