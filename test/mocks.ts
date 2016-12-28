export class HttpService {}

export class UserService {
    constructor(private httpService: HttpService) {}
}

export class OrderService {
    constructor(private productService: ProductService) {}
}

export class ProductService {
    constructor(private orderService: OrderService) {}
}
