import { type } from "arktype";
import { json } from "src";
import { Drift } from "src";
import { body } from "src/validation/arktype";
// import { Drift, json } from "dist";
// import { body } from "dist/arktype";

const app = new Drift()
    .get("/", () => {
        return json({ message: "Hello, World!" });
    })
    .post(
        "/echo",
        body(
            type({
                message: "string",
                file: "File",
            })
        ),
        ({ body }) => {
            console.log(body);
            return json(body);
        }
    );

Bun.serve({
    port: 3000,
    fetch: app.fetch,
});

console.log("Server is running on http://localhost:3000");
