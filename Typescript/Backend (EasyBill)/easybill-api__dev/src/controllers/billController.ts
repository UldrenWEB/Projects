import { Request, Response } from "../adapters/expressAdapter";

import BillModel from "../models/billModel";
import message from "../json/messages.json";
import RowModel from "../models/rowModel";
import { IBill } from "../interfaces/IBill";


class BillController {

    static createBill = async (req: Request, res: Response) => {
        const { customer, cashier, time, date } = req.body;
        if (!customer || !cashier) return res.status(400).json({ message: message.error.MissingParameters });

        try {
            const bill = new BillModel({ customer, cashier, time, date });

            const b = await bill.save();
            if (!b) return res.status(400).json({ message: message.error.RequestDBError })

            return res.status(201).json({
                message: message.success.ElementUpdated,
                response: b
            })
        } catch (e: any) {
            return res.status(400).json({ message: message.error.RequestDBError });
        }
    }

    static getBillByCode = async (req: Request, res: Response) => {
        const { code } = req.body;
        if (!code) return res.status(400).json({ message: message.error.MissingParameters });

        try {
            const parsedCode = parseFloat(code);
            if (isNaN(parsedCode)) return res.status(400).json({ message: message.error.InvalidParameters });

            const { bill } = await BillModel.findBillByCode(code)
            if (!bill) return res.status(404).json({ message: message.error.ElementNotFound });

            return res.status(200).json({
                message: message.success.ElementDeleted, bill
            });
        } catch (error) {
            return res.status(400).json({ error: message.error.RequestDBError });
        }
    }

    static resumeBillsAll = async (_req: Request, res: Response) => {
        try {
            const bills = await BillModel.find({ payed: true })
                .populate('customer', 'fullname -_id') as Array<IBill>;
            if (!bills || bills.length < 0) return res.status(404).json({ message: message.error.ElementNotFound });

            const newBills = bills.map(bill => {
                return {
                    _id: bill._id,
                    code: bill.code,
                    customer: bill.customer?.fullname,
                    time: bill.time,
                    date: bill.date,
                    total: bill.total,
                    status: bill.status,
                    created: bill.createdAt,
                    payed: bill.payed
                }
            })

            return res.status(200).json({
                message: message.success.RequestSuccess,
                response: newBills
            });
        } catch (e: any) {
            return res.status(500).json({ message: message.error.RequestDBError });
        }
    }

    static resumeBillsNow = async (_req: Request, res: Response) => {
        try {
            const date = new Date();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            const myDate = `${month}/${day}/${year}`;

            const bills = await BillModel.find({ payed: true, date: myDate })
                .populate('customer', 'fullname -_id') as Array<IBill>;
            if (!bills || bills.length < 0) return res.status(404).json({ message: message.error.ElementNotFound });

            const newBills = bills.map(bill => {
                return {
                    _id: bill._id,
                    code: bill.code,
                    customer: bill.customer?.fullname,
                    time: bill.time,
                    date: bill.date,
                    total: bill.total,
                    status: bill.status,
                    created: bill.createdAt,
                    payed: bill.payed
                }

            })

            const amount = bills.length;
            const balance = bills.reduce((sum, bill) => sum + (bill.total || 0), 0);

            return res.status(200).json({
                message: message.success.RequestSuccess,
                response: {
                    amount,
                    balance,
                    bills: newBills
                }
            });
        } catch (e: any) {
            return res.status(500).json({ message: message.error.RequestDBError });
        }
    }

    static cancelBill = async (req: Request, res: Response) => {
        try {
            const { bill } = req.body;
            if (!bill) return res.status(400).json({ message: message.error.MissingParameters });

            const billUpdate = await BillModel.findByIdAndUpdate(bill, {
                status: 'canceled'
            }, { new: true });
            if (!billUpdate) return res.status(404).json({ message: message.error.ElementNotFound });

            return res.status(200).json({ message: message.success.ElementUpdated, response: billUpdate });
        } catch (e: any) {
            return res.status(500).json({ message: message.error.RequestDBError });
        }
    }

    static changeStatus = async (req: Request, res: Response) => {
        const { bill } = req.body;
        if (!bill) return res.status(400).json({ message: message.error.MissingParameters });

        try {
            const billUpdate = await BillModel.findByIdAndUpdate(bill, {
                payed: true
            }, { new: true });
            if (!billUpdate) return res.status(404).json({ message: message.error.ElementNotFound });

            return res.status(200).json({ message: message.success.ElementUpdated, response: billUpdate });
        } catch (e: any) {
            return res.status(500).json({ message: message.error.RequestDBError });
        }
    }

    static deleteBill = async (req: Request, res: Response) => {
        try {
            const { bill } = req.body;
            if (!bill) return res.status(400).json({ message: message.error.MissingParameters });

            const billDeleted = await BillModel.findByIdAndDelete(bill);
            if (!billDeleted) return res.status(404).json({ message: message.error.ElementNotFound });

            await RowModel.deleteMany({ bill: billDeleted?._id });

            return res.status(200).json({ message: message.success.ElementDeleted });
        } catch (error) {
            return res.status(400).json({ message: message.error.RequestDBError });
        }
    }
}

export default BillController;