import ExpressAdapter from "../adapters/expressAdapter";
import ProductController from "../controllers/productController";

const adapter = new ExpressAdapter();

const productRouter = () => {
    const router = adapter.createRouter();

    adapter.setRouteRouter({
        method: 'post',
        route: '/createProduct',
        router,
        callback: [ProductController.createProduct]
    });

    adapter.setRouteRouter({
        method: 'get',
        route: '/all',
        router,
        callback: [ProductController.getAllProducts]
    });

    adapter.setRouteRouter({
        method: 'post',
        route: '/byDescription',
        router,
        callback: [ProductController.getProductsByDescription]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/bySku',
        router,
        callback: [ProductController.getProductBySku]
    })

    adapter.setRouteRouter({
        method: 'delete',
        route: '/deleteProduct',
        router,
        callback: [ProductController.deleteProduct]
    });


    return router;
}

export default productRouter