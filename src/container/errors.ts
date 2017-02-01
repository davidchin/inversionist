import Key from './key';

/**
 * Create a circular dependency error.
 * @param paths - The offending dependency paths
 * @return The error instance
 */
export function circularDependencyError(paths: Key[]): Error {
    return new Error(`Circular dependency: ${paths.join(' -> ')}`);
}

/**
 * Create a "not found" error
 * @param key - The key used for retrieving a service
 * @return The error instance
 */
export function notFoundError(key: Key): Error {
    return new Error(`Failed to resolve ${key}`);
}
