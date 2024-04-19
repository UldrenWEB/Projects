export interface TransformedMethod {
    _id: string;
    description: string;
    bank: string;
    account: {
        document?: string;
        phoneNumber?: string;
        email?: string;
        cuenta?: string;
    };
    representation: string;
    srcImage: string;
}