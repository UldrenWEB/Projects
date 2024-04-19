import { Ref, prop, getModelForClass, pre, modelOptions, ReturnModelType } from "@typegoose/typegoose";
import { User } from "./userModel";
import PersonModel, { Person } from "./personModel";
import { Document } from "mongoose";
import CounterModel from "./counterModel";
import { Status } from "../types";



@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
@pre<Bill>('save', async function (next) {

    //No entiendo porque entra dos veces, puse o.5 y asi solo es 1
    const counter = await CounterModel.findByIdAndUpdate('billCounter',
        { $inc: { count: 1 } },
        { new: true, upsert: true });

    (this as Bill).code = counter?.count;

    next();
})
export class Bill extends Document {

    @prop({ unique: true, type: Number })
    public code?: number;

    @prop({ required: true, default: 'completed', type: String })
    status?: Status;

    @prop({ default: new Date().toLocaleTimeString(), type: String })
    time?: string;

    @prop({ default: new Date().toLocaleDateString(), type: String })
    date?: string;

    @prop({ required: false, default: 0, type: Number })
    total?: number;

    @prop({ required: true, default: false, type: Boolean })
    payed?: boolean;

    @prop({ required: true, ref: () => Person, type: () => Person })
    customer?: Ref<Person>;

    @prop({ required: true, ref: () => User, type: () => User })
    cashier?: Ref<User>;

    static async findBillByCode(this: ReturnModelType<typeof Bill>, code: number) {
        try {
            const bill = await this.findOne({ code })
                .populate('customer', 'fullname _id')
                .exec();
            if (!bill) return { message: 'Bill not found' };

            const cashier = await PersonModel.findById(bill?.cashier);
            return { bill: { ...bill.toObject(), cashier: { fullname: cashier?.fullname, _id: cashier?._id } } };
        } catch (e: any) {
            return { message: e.message };
        }
    }

    static async findByCodeAndDeleteAll(this: ReturnModelType<typeof Bill>, code: number) {
        try {
            const bill = await this.findOne({ code });
            if (!bill) return { message: false };

            const billDeleted = await this.findByIdAndDelete(bill._id).exec();

            return { bill: billDeleted };
        } catch (e: any) {
            console.error('Error al hacer la consulta', e.message);
            return { message: e.message };
        }
    }


}

const BillModel = getModelForClass(Bill);
export default BillModel;