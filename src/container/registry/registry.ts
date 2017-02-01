import Registration from './registration';
import Key from '../key';
import Provider from '../provider';
import Scope from '../scope';

/**
 * A class responsible for registering service providers and instances.
 */
export default class Registry {
    private registrations = new Map<Key, Registration>();
    private instances = new Map<Key, any>();

    /**
     * Register a service provider with a key.
     * @param key - The key to register with
     * @param provider - The provider to register
     * @param scope - The registration scope
     * @return The service provider registration
     */
    register(key: Key, provider: Provider, scope: Scope): Registration {
        const registration: Registration = { key, provider, scope };

        this.registrations.set(key, registration);

        return registration;
    }

    /**
     * Register a service instance with a key.
     * @param key - The key to register with
     * @param instance - The instance to register
     */
    registerInstance(key: Key, instance: any): void {
        this.instances.set(key, instance);
    }

    /**
     * Deregister a service with a key
     * @param key - The key to deregister with
     */
    deregister(key: Key): void {
        this.registrations.delete(key);
        this.instances.delete(key);
    }

    /**
     * Retrieve a service registration with a key
     * @param key - The key used for retrieval
     * @return The service registration
     */
    get(key: Key): Registration | void {
        return this.registrations.get(key);
    }

    /**
     * Retrieve a previously registered instance with a key.
     * @param key - The key used for retrieval
     * @return The registered instance
     */
    getInstance<T>(key: Key): T | void {
        return this.instances.get(key) as T;
    }
}
