import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Currency } from "./currencyModel";
import { Bank } from "./bankModel";

export class PaymentMethod {

    @prop({ required: true, unique: true, type: String })
    description?: string;

    @prop({ required: true, unique: true, type: String })
    srcImage?: string;

    @prop({ required: false, ref: () => Bank, type: () => Bank })
    bank?: Ref<Bank>;

    @prop({ required: true, type: () => Currency, ref: () => Currency })
    currency?: Ref<Currency>;
}

const PaymentMethodModel = getModelForClass(PaymentMethod);
export default PaymentMethodModel;