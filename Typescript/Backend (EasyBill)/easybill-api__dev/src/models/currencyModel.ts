import { getModelForClass, prop } from "@typegoose/typegoose";

export class Currency {

    @prop({ required: true, unique: true, type: String, maxlength: 100 })
    description?: string;

    @prop({ required: true, type: String })
    representation?: string;

    @prop({ required: false, type: String })
    srcImage?: string;


}

const CurrencyModel = getModelForClass(Currency);
export default CurrencyModel;