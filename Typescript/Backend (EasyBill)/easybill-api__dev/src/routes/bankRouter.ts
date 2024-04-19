import ExpressAdapter from "../adapters/expressAdapter";
import BankController from "../controllers/bankController";

const adapter = new ExpressAdapter();

const bankRouter = () => {
    const router = adapter.createRouter();

    adapter.setRouteRouter({
        method: 'post',
        route: '/create',
        router,
        callback: [BankController.createBank]
    })

    adapter.setRouteRouter({
        method: 'get',
        route: '/resume',
        router,
        callback: [BankController.resumeBank]
    })

    return router;
}

export default bankRouter;