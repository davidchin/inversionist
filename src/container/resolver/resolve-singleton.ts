import Key from '../key';
import Resolve from './resolve';

/**
 * A strategy for resolving services registered as singletons.
 */
export default class ResolveSingleton extends Resolve {
    /**
     * Resolve a service registered as a singleton. If the service has not been
     * created yet, create it and store it in memory so it can be retrieved in
     * the future.
     * @param key - The key to resolve with
     * @return The resolved service.
     */
    execute<T>(key: Key): T {
        const cachedInstance = this.registry.getInstance<T>(key);

        if (cachedInstance) {
            return cachedInstance;
        }

        const instance = super.execute<T>(key);

        this.registry.registerInstance(key, instance);

        return instance;
    }
}
