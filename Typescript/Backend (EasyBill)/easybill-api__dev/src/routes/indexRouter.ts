import ExpressAdapter from "../adapters/expressAdapter";
import authRouter from "./authRouter";
import personRouter from "./personRouter";
import productRouter from "./productRouter";
import billRouter from "./billRouter";
import rowRouter from "./rowRouter";
import paymentRouter from "./paymentRouter";
import bankRouter from "./bankRouter";
// import authMiddleware from "../middlewares/authMiddleware";

const adapter = new ExpressAdapter();

const indexRouter = () => {
    const iRouter = adapter.createRouter();

    adapter.setRouter({
        route: '/auth',
        router: iRouter,
        callbackRouter: authRouter()
    });

    adapter.setRouter({
        route: '/person',
        router: iRouter,
        callbackRouter: personRouter()
    });

    // adapter.middlewarePersonalized({
    //     middleware: authMiddleware,
    //     router: iRouter
    // })


    adapter.setRouter({
        route: '/products',
        router: iRouter,
        callbackRouter: productRouter()
    })

    adapter.setRouter({
        route: '/bill',
        router: iRouter,
        callbackRouter: billRouter()
    })

    adapter.setRouter({
        route: '/row',
        router: iRouter,
        callbackRouter: rowRouter()
    })

    adapter.setRouter({
        route: '/payment',
        router: iRouter,
        callbackRouter: paymentRouter()
    })

    adapter.setRouter({
        route: '/bank',
        router: iRouter,
        callbackRouter: bankRouter()
    })

    return iRouter;
}

export default indexRouter;