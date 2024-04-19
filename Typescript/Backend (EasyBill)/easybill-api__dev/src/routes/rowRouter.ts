import ExpressAdapter from "../adapters/expressAdapter";
import RowController from "../controllers/rowController";

const adapter = new ExpressAdapter();

const rowRouter = () => {
    const router = adapter.createRouter();

    adapter.setRouteRouter({
        method: 'post',
        route: '/create',
        router,
        callback: [RowController.createRow]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/updateAmount',
        router,
        callback: [RowController.updateAmount]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/updateProduct',
        router,
        callback: [RowController.updateProduct]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/delete',
        router,
        callback: [RowController.deleteRow]
    })

    return router;
}

export default rowRouter;