import Container from '../container';
import Key from '../key';
import Path from './path';
import Registry from '../registry/registry';
import { notFoundError } from '../errors';

/**
 * A strategy for resolving services scoped as prototypes.
 */
export default class Resolve {
    protected container: Container;
    protected registry: Registry;
    protected path: Path;

    /**
     * @param container - The container used for resolving services
     * @param registry - The registry of services
     * @param path - The dependency path of resolving services
     */
    constructor(container: Container, registry: Registry, path: Path) {
        this.container = container;
        this.registry = registry;
        this.path = path;
    }

    /**
     * Resolve a service with key. Throw an error if there is no service
     * registered with the key.
     * @param key - The key to resolve with
     * @return The resolved service.
     */
    execute<T>(key: Key): T {
        const registration = this.registry.get(key);

        if (!registration) {
            throw notFoundError(key);
        }

        try {
            this.path.push(key);

            return registration.provider(this.container) as T;
        } finally {
            this.path.pop();
        }
    }
}
