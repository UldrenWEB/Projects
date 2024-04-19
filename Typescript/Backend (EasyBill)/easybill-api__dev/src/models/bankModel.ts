import { getModelForClass, prop } from "@typegoose/typegoose";
import { AccountData } from "./types/AccountData";

export class Bank {

    @prop({ required: true, unique: true, type: String })
    description?: string;

    @prop({ required: true, unique: true, type: String })
    name?: string;

    @prop({ required: true, unique: true, type: () => AccountData })
    accountData?: AccountData;
}

const BankModel = getModelForClass(Bank);
export default BankModel;