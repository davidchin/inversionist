import Container from '../container';
import Key from '../key';
import Path from './path';
import Registry from '../registry/registry';
import Resolve from './resolve';
import ResolveSingleton from './resolve-singleton';
import Scope from '../scope';

/**
 * A class responsible for resolving registered services.
 */
export default class Resolver {
    private path = new Path();

    /**
     * Resolve a registered service with a key.
     * @param container - The container used for resolving services
     * @param registry - The registry of services
     * @param key - The key to resolve with
     */
    resolve<T>(container: Container, registry: Registry, key: Key): T {
        const registration = registry.get(key);
        let strategy: Resolve;

        if (registration && registration.scope === Scope.Singleton) {
            strategy = new ResolveSingleton(container, registry, this.path);
        } else {
            strategy = new Resolve(container, registry, this.path);
        }

        return strategy.execute<T>(key);
    }
}
