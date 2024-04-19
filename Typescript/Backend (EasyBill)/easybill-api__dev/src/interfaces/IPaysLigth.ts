export interface IPaysLigth {
    _id: string;
    description?: string;
    paymentMethod: {
        _id: string;
        bank: {
            description: string;
            name: string;
        };
    }
    amount: number;
}