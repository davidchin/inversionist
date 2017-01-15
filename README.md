# Inversionist

Inversionist is a dependency injection container for JavaScript and TypeScript. It is a simple tool to help you build a loosely coupled and testable system.

[![Build Status](https://travis-ci.org/davidchin/inversionist.svg?branch=master)](https://travis-ci.org/davidchin/inversionist)

## Installation

You can install Inversionist using npm

```
npm install --save inversionist
```

## Example

To create a container

```js
import { Container } from 'inversionist';

const container = Container.create();
```

To register an injectable instance

```js
class HttpService {}
```

```js
class UserService() {
    constructor(httpService) {}
}
```

```js
container
    .register('httpService', container => {
        return new HttpService();
    })
    .register('userService', () => {
        return new UserService(container.get('httpService'));
    });
```

To register a service as a singleton

```js
container.registerSingleton('httpService', container => {
    return new HttpService();
});
```

To get an instance out of the container

```js
container.get('userService');
```

If you are using this library in a TypeScript project, you can specify the return type of a `get` call.

```ts
container.get<UserService>('userService');
```

## Development

The source code is written in TypeScript. To compile to JavaScript, please run

```
npm run build
```

To run tests, please run

```
npm test
```

To see a test coverage report, please run

```
npm run coverage
```

To lint your code, please run

```
npm run lint
```

## Contribution

If you like to contribute, please make a pull request explaining your changes. If you want to make a suggestion or file a bug report, please create a GitHub issue.

## License

MIT
