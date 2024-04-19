import {
    Request,
    Response
} from "../adapters/expressAdapter";
import BankModel from "../models/bankModel";
import BillModel from "../models/billModel";
import messages from '../json/messages.json'
import PaymentModel from "../models/paymentModel";
import { IPaysLigth } from "../interfaces/IPaysLigth";

class BankController {
    static createBank = async (req: Request, res: Response) => {
        const { description, account, name } = req.body
        if (!description || !account || !name)
            return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const bank = new BankModel({
                description,
                name,
                accountData: account
            });
            if (!bank) return res.status(400).json({ message: messages.error.RequestDBError });

            await bank.save();

            return res.status(201).json({ message: messages.success.ElementUpdated, response: bank });
        } catch (e: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static resumeBank = async (_req: Request, res: Response) => {
        try {
            const date = new Date();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            const myDate = `${month}/${day}/${year}`;

            const bills = await BillModel.find({ date: myDate }).select('_id');
            const billIds = bills.map(bill => bill._id);

            const payments = await PaymentModel.find({
                'bill': { $in: billIds }
            })
                .populate({
                    path: 'paymentMethod',
                    populate: { path: 'bank' }
                }) as Array<IPaysLigth>;

            if (!payments) return res.status(404).json({ message: messages.error.ElementNotFound });

            const groupedPayments = payments.reduce((acc: Record<string, { bank: string, total: number }>, payment) => {
                const bankName = payment.paymentMethod.bank.description;

                if (acc[bankName]) {
                    acc[bankName].total += payment.amount;
                } else {
                    acc[bankName] = {
                        bank: bankName,
                        total: payment.amount
                    };
                }

                return acc;
            }, {});

            const result = Object.values(groupedPayments);

            return res.status(200).json({
                message: messages.success.RequestSuccess,
                response: result
            });

        } catch (e: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }
}

export default BankController;

