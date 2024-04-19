import { Request, Response } from "express";
import RowModel from "../models/rowModel";
import messages from '../json/messages.json';
import BillModel from "../models/billModel";
import { IRow } from "../interfaces/IRow";

class RowController {
    static async createRow(req: Request, res: Response) {
        const { bill, product, amount } = req.body;
        if (!bill || !product || !amount) {
            return res.status(400).json({ message: messages.error.MissingParameters });
        }
        try {
            const newRow = new RowModel({ bill, product, amount });
            await newRow.save();

            const rowProduct = await newRow.populate('product', 'description price tax -_id') as IRow;
            const total = (rowProduct.product.price * amount) + (amount * rowProduct.product.tax);

            const billUpdate = await BillModel.findByIdAndUpdate(bill, { $inc: { total } }, { new: true })
            if (!billUpdate) return res.status(404).json({ message: messages.error.ElementNotFound });

            return res.status(201).json({
                message: messages.success.ElementUpdated,
                response: newRow
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteRow(req: Request, res: Response) {
        const { row } = req.body;
        if (!row) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const rowDeleted = await RowModel.findByIdAndDelete(row);
            if (!rowDeleted) return res.status(404).json({ message: messages.error.ElementNotFound });

            return res.status(200).json({ message: messages.success.ElementDeleted, response: rowDeleted });
        } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateAmount(req: Request, res: Response) {
        const { row, amount } = req.body;
        if (!row || !amount) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const rowToUpdate = await RowModel.findById(row);
            if (!rowToUpdate) return res.status(404).json({ message: messages.error.ElementNotFound });

            const oldRow = await rowToUpdate.populate('product', 'description price tax -_id') as IRow;
            const oldTax = oldRow.product.tax;
            const oldTotal = (oldRow.product.price * (rowToUpdate?.amount ?? 1)) + (oldTax * amount);

            const billUp = await BillModel.findByIdAndUpdate(rowToUpdate?.bill, { $inc: { total: -oldTotal } }, { new: true })
            if (!billUp) return res.status(404).json({ message: messages.error.RequestDBError });

            rowToUpdate.amount = amount;
            const newRow = await rowToUpdate.save() as IRow;

            const tax = newRow.product.tax;
            const total = (newRow.product.price * newRow?.amount) + (tax * amount);

            const billUpdate = await BillModel.findByIdAndUpdate(newRow?.bill, { $inc: { total } }, { new: true })
            if (!billUpdate) return res.status(404).json({ message: messages.error.ElementNotFound });

            return res.status(200).json({ message: messages.success.ElementUpdated, response: rowToUpdate });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateProduct(req: Request, res: Response) {
        const { row, product } = req.body;
        if (!row || !product) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const rowToUpdate = await RowModel.findById(row);
            if (!rowToUpdate) return res.status(404).json({ message: messages.error.ElementNotFound });

            const oldRow = await rowToUpdate.populate('product', 'description price tax -_id') as IRow;
            const oldTax = oldRow.product.tax;
            const oldTotal = (oldRow.product.price * (rowToUpdate?.amount ?? 1)) + (oldTax * oldRow.amount);

            const billUp = await BillModel.findByIdAndUpdate(rowToUpdate?.bill, { $inc: { total: -oldTotal } }, { new: true })
            if (!billUp) return res.status(404).json({ message: messages.error.RequestDBError });

            rowToUpdate.product = product;
            const newRow = await rowToUpdate.save();

            const rowProduct = await newRow.populate('product', 'description price tax -_id') as IRow;
            const tax = rowProduct.product.tax;
            const total = (rowProduct.product.price * rowProduct?.amount) + (tax * rowProduct.amount);

            const billUpdate = await BillModel.findByIdAndUpdate(newRow?.bill, { $inc: { total } }, { new: true })
            if (!billUpdate) return res.status(404).json({ message: messages.error.ElementNotFound });

            return res.status(200).json({ message: messages.success.ElementUpdated, response: rowToUpdate });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default RowController;