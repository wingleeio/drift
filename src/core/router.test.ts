import { describe, expect, it } from "bun:test";

import { TrieRouter } from "./router";

describe("TrieRouter", () => {
    type Handler = () => string;
    type Method = string;

    const GET: Method = "GET";
    const POST: Method = "POST";

    const router = new TrieRouter<Handler, Method>();

    const homeHandler = () => "Home Page";
    const userHandler = () => "User Profile";
    const wildcardHandler = () => "Wildcard Handler";
    const fileHandler = () => "File Handler";
    const postHandler = () => "Post Handler";

    router.add("/", GET, homeHandler);
    router.add("/users/:id", GET, userHandler);
    router.add("/files/*", GET, fileHandler);
    router.add("/posts/:postId/comments/:commentId", GET, postHandler);
    router.add("/api/*", GET, wildcardHandler);
    router.add("/static/*", GET, wildcardHandler);
    router.add("/users", POST, () => "Create User");
    router.add("/posts", GET, () => "List Posts");

    describe("Exact match tests", () => {
        it("should match the home route", () => {
            const result = router.match("/", GET);
            expect(result.value).toBe(homeHandler);
            expect(result.parameters).toEqual({});
        });

        it("should match a static route", () => {
            const result = router.match("/posts", GET);
            expect(result.value!()).toBe("List Posts");
            expect(result.parameters).toEqual({});
        });

        it("should match a static route with different method", () => {
            const result = router.match("/users", POST);
            expect(result.value!()).toBe("Create User");
            expect(result.parameters).toEqual({});
        });
    });

    describe("Dynamic parameter tests", () => {
        it("should match a route with dynamic parameter", () => {
            const result = router.match("/users/123", GET);
            expect(result.value).toBe(userHandler);
            expect(result.parameters).toEqual({ id: "123" });
        });

        it("should match a route with multiple dynamic parameters", () => {
            const result = router.match("/posts/456/comments/789", GET);
            expect(result.value).toBe(postHandler);
            expect(result.parameters).toEqual({ postId: "456", commentId: "789" });
        });
    });

    describe("Wildcard route tests", () => {
        it("should match a wildcard route with additional segments", () => {
            const result = router.match("/files/path/to/file.txt", GET);
            expect(result.value).toBe(fileHandler);
            expect(result.parameters).toEqual({ "*": "path/to/file.txt" });
        });

        it("should match a wildcard route with one segment", () => {
            const result = router.match("/files/readme.md", GET);
            expect(result.value).toBe(fileHandler);
            expect(result.parameters).toEqual({ "*": "readme.md" });
        });
    });

    describe("Non-matching route tests", () => {
        it("should return undefined for non-existent route", () => {
            const result = router.match("/unknown", GET);
            expect(result.value).toBeUndefined();
            expect(result.parameters).toEqual({});
        });

        it("should return undefined for incorrect method", () => {
            const result = router.match("/users/123", POST);
            expect(result.value).toBeUndefined();
            expect(result.parameters).toEqual({
                id: "123",
            });
        });
    });

    describe("Edge case tests", () => {
        it("should handle routes with trailing slashes", () => {
            const result = router.match("/users/123/", GET);
            expect(result.value).toBe(userHandler);
            expect(result.parameters).toEqual({ id: "123" });
        });

        it("should handle multiple slashes", () => {
            const result = router.match("//users//123//", GET);
            expect(result.value).toBe(userHandler);
            expect(result.parameters).toEqual({ id: "123" });
        });

        it("should handle root wildcard", () => {
            router.add("/*", GET, () => "Root Wildcard");
            const result = router.match("/anything/here", GET);
            expect(result.value!()).toBe("Root Wildcard");
            expect(result.parameters).toEqual({ "*": "anything/here" });
        });
    });

    describe("Merge method tests", () => {
        it("should merge another router", () => {
            const otherRouter = new TrieRouter<Handler, Method>();
            otherRouter.add("/merged", GET, () => "Merged Route");

            router.merge(otherRouter);

            const result = router.match("/merged", GET);
            expect(result.value!()).toBe("Merged Route");
            expect(result.parameters).toEqual({});
        });

        it("should preserve existing routes after merge", () => {
            const result = router.match("/users/123", GET);
            expect(result.value).toBe(userHandler);
            expect(result.parameters).toEqual({ id: "123" });
        });
    });
});
