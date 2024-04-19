import { Request, Response } from "express";
import messages from '../json/messages.json';
import PersonModel from "../models/personModel";
import TypePersonModel from "../models/typePersonModel";
import { TYPE_PERSON } from "../enum/TYPE_PERSON";
import TypeDocumentModel from "../models/typeDocumentModel";

class PersonController {

    typeDocuments = async (_req: Request, res: Response) => {
        try {
            const typesDocuments = await TypeDocumentModel.find({});

            if (typesDocuments.length === 0) {
                return res.status(404).json({ message: messages.warning.NoData });
            }

            const arrayDocuments = typesDocuments.map(typeDocument => {
                return {
                    id: typeDocument._id,
                    description: typeDocument.description,
                    type: typeDocument.type
                }
            })
            // console.log(arrayDocuments)
            return res.status(200).json({
                message: messages.success.RequestSuccess,
                response: arrayDocuments
            });
        } catch (error: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    async createCustomer(req: Request, res: Response) {
        const { document, idTypeDocument, fullname, phoneNumber, address } = req.body;
        if (!document || !idTypeDocument || !fullname || !phoneNumber || !address) {
            return res.status(400).json({ message: messages.error.MissingParameters });
        }

        try {
            const { person } = await PersonModel.findPersonByDocument(document);
            if (person) {
                const isCustomer = person?.type_person?.some((type) => type.description === TYPE_PERSON.CUSTOMER)

                if (isCustomer) {
                    return res.status(200).json({
                        message: messages.warning.PersonExists,
                        response: person
                    });
                }

                const idType = await TypePersonModel.findOne({ description: TYPE_PERSON.CUSTOMER });
                const newPerson = await PersonModel.findByIdAndUpdate(person?._id,
                    { $push: { type_person: idType?._id } },
                    { new: true }
                );
                return res.status(201).json({
                    message: messages.success.RegisterSuccessfull,
                    response: newPerson
                })
            }

            const idTypePerson = await TypePersonModel.findOne({ description: TYPE_PERSON.CUSTOMER });
            const newPerson = new PersonModel({
                document,
                type_document: idTypeDocument,
                fullname,
                phoneNumber,
                address,
                type_person: [idTypePerson?._id]
            });

            const result = await newPerson.save();
            return res.status(201).json({
                message: messages.success.RegisterSuccessfull,
                response: result
            });
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    getCustomerByDocument = async (req: Request, res: Response) => {
        try {
            const { document } = req.body;
            if (!document) return res.status(400).json({ message: messages.error.MissingParameters });

            const { person } = await PersonModel.findPersonByDocument(document)
            if (!person) return res.status(404).json({ message: messages.warning.NoData });

            return res.status(200).json({
                message: messages.success.RequestSuccess,
                response: person
            });

        } catch (e: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }
}

export default PersonController;