export type Methods = 'get' | 'post' | 'put' | 'delete';

export type StateGlobalUser = { user: object | null };
export type StateGlobalJwt = { jwt: string | null };
export type StateGlobalBill = { bill: string | null };
export type StateGlobalTotals = { totals: object | null };
export type StateGlobalReamining = { remaining: number | null };
