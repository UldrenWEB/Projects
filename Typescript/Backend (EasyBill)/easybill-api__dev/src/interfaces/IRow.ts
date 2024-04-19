export interface IRow {
    bill: string,
    product: {
        description: string,
        price: number,
        tax: number
    },
    amount: number
}