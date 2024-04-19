import { Request, Response } from "express";
import BillModel from "../models/billModel";
import PaymentModel from "../models/paymentModel";
import messages from '../json/messages.json';
import PaymentReferenceModel from "../models/paymentReferenceModel";
import CurrencyModel from "../models/currencyModel";
import PaymentMethodModel from "../models/paymentMethodModel";
import { IPayMethods } from "../interfaces/IPayMethods";
import { IPayment } from "../interfaces/IPayment";
import { IPaymentGroup } from "../interfaces/IPaymentGroup";
import PersonModel from "../models/personModel";
import { IPerson } from "../interfaces/IPerson";
import { TYPE_PERSON } from "../enum/TYPE_PERSON";

class PaymentController {
    static async createPayment(req: Request, res: Response) {
        const { amount, bill, paymentMethod, reference } = req.body;

        if (!amount || !bill || !paymentMethod || !reference)
            return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const billPayment = await BillModel.findById(bill);
            if (!billPayment) return res.status(404).json({ message: messages.error.ElementNotFound });

            const paymentMethodPayment = await PaymentMethodModel.findById(paymentMethod);
            if (!paymentMethodPayment) return res.status(404).json({ message: messages.error.ElementNotFound });

            const payment = new PaymentModel({ amount, bill, paymentMethod });
            await payment.save();
            if (!payment) return res.status(400).json({ message: messages.error.RequestDBError });

            const newPaymentReference = new PaymentReferenceModel({
                payment: payment._id,
                reference
            })
            await newPaymentReference.save()
            if (!newPaymentReference) return res.status(400).json({ message: messages.error.RequestDBError });

            return res.status(201).json({ message: messages.success.RequestSuccess, response: payment });
        } catch (error: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async createCurrency(req: Request, res: Response) {
        const { description, representation, srcImage } = req.body;
        if (!description || !representation || !srcImage)
            return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const currency = new CurrencyModel({
                description,
                representation,
                srcImage
            });
            if (!currency) return res.status(400).json({ message: messages.error.RequestDBError });

            await currency.save();

            return res.status(201).json({ message: messages.success.ElementUpdated, response: currency });
        } catch (e: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async createPaymentMethod(req: Request, res: Response) {
        const { description, bank, currency, srcImage } = req.body;
        if (!description || !currency || !srcImage)
            return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const paymentMethod = new PaymentMethodModel({
                description,
                bank: !bank ? null : bank,
                currency,
                srcImage
            });
            await paymentMethod.save();

            return res.status(201).json({ message: messages.success.ElementUpdated, response: paymentMethod });
        } catch (e: any) {
            console.log(e.message)
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async deletePayment(req: Request, res: Response) {
        const { payment } = req.body;
        if (!payment) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const oldPayment = await PaymentModel.findByIdAndDelete(payment);
            if (!oldPayment) return res.status(404).json({ message: messages.error.ElementNotFound });

            await PaymentReferenceModel.deleteMany({ payment });

            return res.status(200).json({ message: messages.success.ElementDeleted });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async resumeAllPayments(_req: Request, res: Response) {
        try {
            const totalAmount = await PaymentModel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount"
                        }
                    }
                }
            ]);
            if (!totalAmount || totalAmount.length <= 0) return res.status(404).json({ message: messages.warning.NoData });
            const total = totalAmount[0].total;
            if (total === 0) return res.status(404).json({ message: messages.warning.NoData });

            const allPersons = await PersonModel.find()
                .populate('type_person', 'description -_id') as Array<IPerson>;

            const customers = allPersons.filter(customer =>
                customer.type_person?.some(type =>
                    type.description === TYPE_PERSON.CUSTOMER))
                .length;

            const cashiers = allPersons.filter(cashier =>
                cashier.type_person?.some(type =>
                    type.description === TYPE_PERSON.CASHIER))
                .length;

            return res.status(200).json({
                message: messages.success.RequestSuccess,
                response: {
                    total,
                    customers,
                    cashiers,
                }
            })

        } catch (e: any) {
            return res.status(400).json({ message: messages.error.RequestDBError })
        }
    }

    static async resumePaymentsNow(_req: Request, res: Response) {
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
                .populate('paymentMethod', 'description srcImage -_id')
                .populate('bill', 'total date -_id') as Array<IPayment>;
            if (!payments || payments.length < 0) return res.status(404).json({ message: messages.warning.NoData });

            const groupedPayments = payments.reduce((acc: Record<string, IPaymentGroup>, payment) => {
                if (acc[payment.paymentMethod.description]) {
                    acc[payment.paymentMethod.description].logo = payment.paymentMethod.srcImage;
                    acc[payment.paymentMethod.description].total += payment.amount;
                    acc[payment.paymentMethod.description].payments += 1;
                } else {
                    acc[payment.paymentMethod.description] = {
                        logo: payment.paymentMethod.srcImage,
                        description: payment.paymentMethod.description,
                        total: payment.amount,
                        payments: 1
                    };
                }

                return acc;
            }, {});
            const result = Object.values(groupedPayments);

            return res.status(200).json({
                message: messages.success.RequestSuccess,
                response: result
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async getPaymentsMethods(_req: Request, res: Response) {
        try {
            const methods = await PaymentMethodModel.find({})
                .populate('currency', 'description representation srcImage -_id')
                .populate('bank', 'description accountData name -_id') as Array<IPayMethods>;
            if (!methods || methods.length < 0) return res.status(404).json({ message: messages.warning.NoData });

            const transformedMethods = methods.map((method) => ({
                _id: method._id,
                description: method.description,
                srcImage: method.srcImage,
                account: method.description.match(/(pago movil)/i) ? {
                    document: method.bank?.accountData.document,
                    phoneNumber: method.bank?.accountData.phoneNumber,
                    owner: method.bank?.accountData.owner,
                    bank: method.bank?.name
                } : method.description.match(/(zelle)/i) ? {
                    email: method.bank?.accountData.email,
                    owner: method.bank?.accountData.owner,
                    bank: method.bank?.name
                } : method.description.match(/(transferencia)/i) ? {
                    accountNumber: method.bank?.accountData.accountNumber,
                    owner: method.bank?.accountData.owner,
                    bank: method.bank?.name
                } : {},
                currency: method.currency
            }));

            return res.status(200).json({ message: messages.success.RequestSuccess, response: transformedMethods });
        } catch (e: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    static async getPaymentsByBill(req: Request, res: Response) {
        const { bill } = req.body;
        if (!bill) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const billPayments = await PaymentModel.findById(bill);
            if (!billPayments) return res.status(404).json({ message: messages.error.ElementNotFound });

            const payments = await PaymentModel.find({ bill });

            return res.status(200).json({ payments });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getPaymentById(req: Request, res: Response) {
        const { payment } = req.body;
        if (!payment) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const pay = await PaymentModel.findById(payment)
                .populate('paymentMethod', 'description srcImage bank currency -_id)');
            if (!pay) return res.status(404).json({ message: messages.error.ElementNotFound });

            return res.status(200).json({ message: messages.success.RequestSuccess, response: pay });
        } catch (e: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }
}

export default PaymentController;