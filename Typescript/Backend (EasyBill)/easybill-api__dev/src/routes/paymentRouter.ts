import ExpressAdapter from "../adapters/expressAdapter";
import PaymentController from "../controllers/paymentController";

const adapter = new ExpressAdapter();

const paymentRouter = () => {
    const router = adapter.createRouter();

    adapter.setRouteRouter({
        method: 'post',
        route: '/create',
        router,
        callback: [PaymentController.createPayment]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/byId',
        router,
        callback: [PaymentController.getPaymentById]
    })

    adapter.setRouteRouter({
        method: 'get',
        route: '/methods',
        router,
        callback: [PaymentController.getPaymentsMethods]
    })

    adapter.setRouteRouter({
        method: 'get',
        route: '/resumeAll',
        router,
        callback: [PaymentController.resumeAllPayments]
    })

    adapter.setRouteRouter({
        method: 'get',
        route: '/resume',
        router,
        callback: [PaymentController.resumePaymentsNow]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/currency',
        router,
        callback: [PaymentController.createCurrency]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/methods',
        router,
        callback: [PaymentController.createPaymentMethod]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/byBill',
        router,
        callback: [PaymentController.getPaymentsByBill]
    })

    adapter.setRouteRouter({
        method: 'post',
        route: '/delete',
        router,
        callback: [PaymentController.deletePayment]
    })

    return router;
}

export default paymentRouter;