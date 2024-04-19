export interface IPayment {
    _id: string;
    amount: number;
    paymentMethod: {
        description: string;
        srcImage: string;
    };
    bill: {
        total: number,
        date: string;
    };
}