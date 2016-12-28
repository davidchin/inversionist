import Container from '../container';
import Key from '../key';
import Path from './path';
import Registry from '../registry/registry';
import Resolve from './resolve';
import ResolveSingleton from './resolve-singleton';
import Scope from '../scope';

export default class Resolver {
    private path = new Path();

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
