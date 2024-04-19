export interface IBill {
    _id: string;
    code: number;
    time: string;
    date: string;
    customer: {
        fullname: string
    };
    total: number;
    status: string;
    payed: boolean;
    createdAt: Date;
    updatedAt: Date;
}