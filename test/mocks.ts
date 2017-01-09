export class HttpService {}

export class UserService {
    private httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }
}

export class OrderService {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }
}

export class ProductService {
    private orderService: OrderService;

    constructor(orderService: OrderService) {
        this.orderService = orderService;
    }
}
