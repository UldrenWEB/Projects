import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        _id: false,
        versionKey: false,
        timestamps: true,
    }
})
export class AccountData {

    @prop({ type: String })
    phoneNumber?: string;

    @prop({ type: String })
    document?: string;

    @prop({ type: String })
    accountNumber?: string;

    @prop({ type: String })
    owner?: string;

    @prop({ type: String })
    email?: string;
}
