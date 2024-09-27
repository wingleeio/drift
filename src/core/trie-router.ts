export class TrieNode<Handler, MapKey> {
    children: Map<string | symbol, TrieNode<Handler, MapKey>> = new Map();
    handlers: Map<MapKey, Handler> = new Map();
    paramName: string | null = null;
}

export class TrieRouter<Handler, MapKey> {
    private root = new TrieNode<Handler, MapKey>();
    private static DYNAMIC_KEY = Symbol(":dynamic");

    public add(path: string, method: MapKey, handler: Handler) {
        let current = this.root;
        const parts = path.split("/");

        for (const part of parts) {
            if (part.startsWith(":")) {
                if (!current.children.has(TrieRouter.DYNAMIC_KEY)) {
                    current.children.set(TrieRouter.DYNAMIC_KEY, new TrieNode());
                }
                current = current.children.get(TrieRouter.DYNAMIC_KEY)!;
                current.paramName = part.slice(1);
            } else {
                if (!current.children.has(part)) {
                    current.children.set(part, new TrieNode());
                }
                current = current.children.get(part)!;
            }
        }

        current.handlers.set(method, handler);
    }

    public lookup(path: string, method: MapKey) {
        const parts = path.split("/");
        let current = this.root;
        const parameters: { [key: string]: string } = {};

        for (const part of parts) {
            if (current.children.has(part)) {
                current = current.children.get(part)!;
            } else if (current.children.has(TrieRouter.DYNAMIC_KEY)) {
                current = current.children.get(TrieRouter.DYNAMIC_KEY)!;
                parameters[current.paramName!] = part;
            } else {
                return { parameters: {}, value: undefined };
            }
        }

        return {
            parameters,
            value: current.handlers.get(method),
        };
    }

    public merge(trie: TrieRouter<Handler, MapKey>) {
        const stack: [TrieNode<Handler, MapKey>, TrieNode<Handler, MapKey>][] = [[this.root, trie.root]];

        while (stack.length) {
            const [current, other] = stack.pop()!;

            for (const [key, value] of other.handlers) {
                current.handlers.set(key, value);
            }

            for (const [key, otherChild] of other.children) {
                if (!current.children.has(key)) {
                    const clonedChild = this.clone(otherChild);
                    current.children.set(key, clonedChild);
                } else {
                    stack.push([current.children.get(key)!, otherChild]);
                }
            }
        }
    }

    private clone(node: TrieNode<Handler, MapKey>): TrieNode<Handler, MapKey> {
        const newNode = new TrieNode<Handler, MapKey>();
        newNode.paramName = node.paramName;
        for (const [key, handler] of node.handlers) {
            newNode.handlers.set(key, handler);
        }
        for (const [key, child] of node.children) {
            newNode.children.set(key, this.clone(child));
        }
        return newNode;
    }
}
