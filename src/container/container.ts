import Key from './key';
import Provider from './provider';
import Registry from './registry/registry';
import Resolver from './resolver/resolver';
import Scope from './scope';

/**
 * A class responsible for registering and resolving services.
 */
export default class Container {
    /**
     * Create an instance of `Container`
     * @return The `Container` instance
     */
    static create(): Container {
        return new Container();
    }

    private registry: Registry;
    private resolver: Resolver;

    constructor() {
        this.registry = new Registry();
        this.resolver = new Resolver();
    }

    /**
     * Register a service provider with a key. When you register a service
     * provider using this method, such service will be recreated each time
     * it gets retrieved. In other words, a new instance will be returned for
     * a given container.
     * @param key - The key to register with
     * @param provider - The provider to register
     * @return `Container` instance itself
     */
    register(key: Key, provider: Provider): Container {
        this.registry.register(key, provider, Scope.Prototype);

        return this;
    }

    /**
     * Register a service provider with a key as a singleton. When you register
     * a service provider using this method, such service will only be created
     * once. In other words, the same instance will be returned for a given
     * container.
     * @param key - The key to register with
     * @param provider - The provider to register
     * @return `Container` instance itself
     */
    registerSingleton(key: Key, provider: Provider): Container {
        this.registry.register(key, provider, Scope.Singleton);

        return this;
    }

    /**
     * Deregister a service provider with a key. If the provider is registered
     * as a singleton, its cached instance will also get deregistered.
     * @param key - The key to deregister with
     * @return `Container` instance itself
     */
    deregister(key: Key): Container {
        this.registry.deregister(key);

        return this;
    }

    /**
     * Retrieve a service based on a key. If a service cannot be resolved,
     * an error will be thrown.
     * @param key - The key of the registered service
     * @return The resolved service
     */
    get<T>(key: Key): T {
        return this.resolver.resolve<T>(this, this.registry, key);
    }
}
