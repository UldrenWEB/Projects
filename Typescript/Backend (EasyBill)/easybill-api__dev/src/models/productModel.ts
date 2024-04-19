import { prop, getModelForClass, Ref, pre } from "@typegoose/typegoose";
import { TypeProduct } from "./typeProductModel";
import skuGenerator from "../utils/skuGenerator";

@pre<Product>("save", async function (next) {
    this.sku = skuGenerator({ productId: this._id.toString(), productName: this.description });
    next();
})
export class Product {
    @prop({ unique: true, type: String })
    sku?: string;

    @prop({ unique: true, required: true, type: String })
    description?: string;

    @prop({ required: true, type: Number })
    price?: number;

    @prop({ required: true, type: Number, default: 0 })
    tax?: number;

    @prop({ required: false, type: String })
    urlImage?: string;

    @prop({ required: false, ref: () => TypeProduct, type: () => TypeProduct })
    type_product?: Ref<TypeProduct>;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;