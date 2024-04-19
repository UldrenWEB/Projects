export interface IPayMethods {
    _id: string;
    description: string;
    srcImage: string;
    bank: {
        description: string;
        name: string;
        accountData: {
            email: string;
            document: string;
            accountNumber: string;
            phoneNumber: string;
            owner: string;

        };
    };
    currency: Array<{
        description: string;
        representation: string;
        srcImage: string;
    }>;
    __v: number;
};