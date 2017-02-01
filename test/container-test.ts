import 'mocha';
import { Container } from '../src';
import { expect } from 'chai';
import { HttpService, OrderService, ProductService, UserService } from './mocks';

describe('Container', () => {
    it('returns an instance of registered injectable', () => {
        const container = Container.create();

        container.register('httpService', () => {
            return new HttpService();
        });

        expect(container.get<HttpService>('httpService')).to.be.an.instanceof(HttpService);
    });

    it('throws an error if resolving an unregistered injectable', () => {
        const container = Container.create();

        expect(() => container.get<HttpService>('httpService')).to.throw(Error);
    });

    it('resolves the sub-dependencies of an injectable\'s dependencies', () => {
        const container = Container.create();

        container
            .register('httpService', () => {
                return new HttpService();
            })
            .register('userService', container => {
                return new UserService(container.get<HttpService>('httpService'));
            });

        expect(container.get<UserService>('userService')).to.be.an.instanceof(UserService);
    });

    it('throws an error if resolving circular dependencies', () => {
        const container = Container.create();

        container
            .register('productService', container => {
                return new ProductService(container.get<OrderService>('orderService'));
            })
            .register('orderService', container => {
                return new OrderService(container.get<ProductService>('productService'));
            });

        expect(() => container.get<OrderService>('orderService')).to.throw(Error);
    });

    it('returns an injectable instance as a new instance by default', () => {
        const container = Container.create();

        container.register('httpService', () => {
            return new HttpService();
        });

        const outputA = container.get<HttpService>('httpService');
        const outputB = container.get<HttpService>('httpService');

        expect(outputA).to.not.equal(outputB);
    });

    it('returns an injectable instance as a singleton if its scope is configured to be singleton', () => {
        const container = Container.create();

        container.registerSingleton('httpService', () => {
            return new HttpService();
        });

        const outputA = container.get<HttpService>('httpService');
        const outputB = container.get<HttpService>('httpService');

        expect(outputA).to.equal(outputB);
    });

    it('deregisters an injectable provider', () => {
        const container = Container.create();

        container.register('httpService', () => new HttpService());
        container.deregister('httpService');

        expect(() => container.get('httpService')).to.throw(Error);
    });
});
