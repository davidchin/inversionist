import Container from '../container';
import Key from '../key';
import Path from './path';
import Registry from '../registry/registry';
import { notFoundError } from '../errors';

class Resolve {
    constructor(
        protected container: Container,
        protected registry: Registry,
        protected path: Path,
    ) {}

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

export default Resolve;
