import ExpressAdapter from "../adapters/expressAdapter";
import BillController from "../controllers/billController";

const adapter = new ExpressAdapter();

const billRouter = () => {
    const router = adapter.createRouter();

    adapter.setRouteRouter({
        method: 'post',
        route: '/create',
        router,
        callback: [BillController.createBill]
    })

    adapter.setRouteRouter({
        method: 'get',
        route: '/resume',
        router,
        callback: [BillController.resumeBillsNow]
    })

    adapter.setRouteRouter({
        method: 'get',
        route: '/all',
        router,
        callback: [BillController.resumeBillsAll]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/byCode',
        router,
        callback: [BillController.getBillByCode]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/delete',
        router,
        callback: [BillController.deleteBill]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/status',
        router,
        callback: [BillController.changeStatus]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/cancel',
        router,
        callback: [BillController.cancelBill]
    })

    return router;
}

export default billRouter