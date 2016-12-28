import Key from '../key';
import { circularDependencyError } from '../errors';

export default class Path {
    private data: Key[] = [];

    push(key: Key): void {
        if (this.has(key)) {
            throw circularDependencyError(this.toArray());
        }

        this.data.push(key);
    }

    pop(): void {
        this.data.pop();
    }

    has(key: Key): Boolean {
        return this.data.indexOf(key) >= 0;
    }

    toArray(): Key[] {
        return this.data.slice() as Key[];
    }
}
