import Key from './key';

export function circularDependencyError(paths: Key[]): Error {
    return new Error(`Circular dependency: ${paths.join(' -> ')}`);
}

export function notFoundError(key: Key): Error {
    return new Error(`Failed to resolve ${key}`);
}
