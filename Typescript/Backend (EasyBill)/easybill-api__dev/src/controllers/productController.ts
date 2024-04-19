import { Request, Response } from "../adapters/expressAdapter";
import ProductModel from "../models/productModel";
import messages from '../json/messages.json';

class ProductController {
    static async createProduct(req: Request, res: Response) {
        const { description, urlImage, type_product, tax, price } = req.body;
        if (!description || !tax || !price) {
            return res.status(400).json({ message: messages.error.MissingParameters });
        }
        if (isNaN(parseFloat(tax))) {
            return res.status(400).json({ message: messages.error.InvalidParameters });
        }

        if (isNaN(parseFloat(price))) {
            return res.status(400).json({ message: messages.error.InvalidParameters });
        }

        const taxReal = parseFloat(tax) / 100;
        const priceReal = parseFloat(price);
        const taxPrice = parseFloat((taxReal * priceReal).toFixed(3));
        try {
            const newProduct = new ProductModel({
                description,
                urlImage,
                type_product,
                tax: taxPrice,
                price: priceReal
            });

            await newProduct.save();

            return res.status(201).json({ newProduct, message: messages.success.RegisterSuccessfull });
        } catch (error: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async getAllProducts(_req: Request, res: Response) {
        try {
            const products = await ProductModel.find({});
            return res.status(200).json({
                message: messages.success.RequestSuccess,
                response: products
            });
        } catch (error: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        const { product } = req.body;
        if (!product) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            await ProductModel.findByIdAndDelete(product);
            return res.status(200).json({ message: messages.success.ElementDeleted });
        } catch (error: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async getProductsByDescription(req: Request, res: Response) {
        const { description } = req.body;
        if (!description) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const products = await ProductModel.findOne({ description: { $regex: description, $options: 'i' } });

            return res.status(200).json({
                message: messages.success.RequestSuccess,
                response: products
            });
        } catch (error: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async getProductBySku(req: Request, res: Response) {
        const { sku } = req.body;
        if (!sku) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const product = await ProductModel.findOne({ sku: { $regex: `${sku}`, $options: 'i' } });
            return res.status(200).json({
                message: messages.success.RequestSuccess,
                response: product
            });
        } catch (error: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async updateProduct(req: Request, res: Response) {
        const { product, sku, description, urlImage, type_product, tax, price } = req.body;
        if (
            !product && (!sku || !description || !urlImage || !type_product || !tax || !price)
        ) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const productToUpdate = await ProductModel.findById(product);
            if (!productToUpdate) return res.status(404).json({ message: messages.error.ElementNotFound });

            if (sku) productToUpdate.sku = sku;
            if (description) productToUpdate.description = description;
            if (urlImage) productToUpdate.urlImage = urlImage;
            if (type_product) productToUpdate.type_product = type_product;
            if (tax) productToUpdate.tax = tax;
            if (price) productToUpdate.price = price;

            await productToUpdate.save();

            return res.status(200).json({
                message: messages.success.ElementUpdated,
                product: productToUpdate
            });
        } catch (error: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }
}

export default ProductController;