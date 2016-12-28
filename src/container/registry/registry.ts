import Registration from './registration';
import Key from '../key';
import Provider from '../provider';
import Scope from '../scope';

export default class Registry {
    private registrations = new Map<Key, Registration>();
    private instances = new Map<Key, any>();

    register(key: Key, provider: Provider, scope: Scope): Registration {
        const registration: Registration = { key, provider, scope };

        this.registrations.set(key, registration);

        return registration;
    }

    registerInstance(key: Key, instance: any): void {
        this.instances.set(key, instance);
    }

    get(key: Key): Registration | void {
        return this.registrations.get(key);
    }

    getInstance<T>(key: Key): T | void {
        return this.instances.get(key) as T;
    }
}
