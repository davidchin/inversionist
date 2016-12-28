import Key from '../key';
import Resolve from './resolve';

export default class ResolveSingleton extends Resolve {
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
