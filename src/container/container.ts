import Key from './key';
import Provider from './provider';
import Registry from './registry/registry';
import Resolver from './resolver/resolver';
import Scope from './scope';

export default class Container {
    static create(): Container {
        const registry = new Registry();
        const resolver = new Resolver();

        return new Container(registry, resolver);
    }

    constructor(
        private registry: Registry,
        private resolver: Resolver,
    ) {}

    register(key: Key, provider: Provider): Container {
        this.registry.register(key, provider, Scope.Prototype);

        return this;
    }

    registerSingleton(key: Key, provider: Provider): Container {
        this.registry.register(key, provider, Scope.Singleton);

        return this;
    }

    get<T>(key: Key): T {
        return this.resolver.resolve<T>(this, this.registry, key);
    }
}
