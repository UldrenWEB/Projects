import { createStore } from 'vuex';

import type {
    StateGlobalUser,
    StateGlobalBill,
    StateGlobalTotals,
    StateGlobalReamining
} from '@/types';

export default createStore({
    state: {
        user: null,
        bill: null,
        totals: null,
        remaining: null,
        tasa: {
            bs: {
                change: 36.5,
                symbol: 'Bs'
            },
            eur: {
                change: 0.93,
                symbol: '€'
            },
            usd: {
                change: 1,
                symbol: '$'
            }
        },
        currentCurrency: 'usd',
    },
    mutations: {
        setRemaining(state: StateGlobalReamining, remaining: number) {
            state.remaining = remaining;
        },
        setUser(state: StateGlobalUser, user: object) {
            state.user = user;
        },
        setBill(state: StateGlobalBill, bill: string) {
            state.bill = bill;
        },
        setTotals(state: StateGlobalTotals, totals: object) {
            state.totals = totals;
        },
        setCurrentCurrency(state: any, currency: Object) {
            state.currentCurrency = currency;
        }
    },
});