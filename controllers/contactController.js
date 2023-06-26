const axios = require('axios');
const contactModel = require('../models/contactModel');

module.exports = {
    createContact: async (req, res) => {
        const {
            first_name,
            last_name,
            email,
            mobile_number,
            data_store
        } = req.body;

        if (data_store === 'DATABASE') {
            const contact = await contactModel.create({
                first_name,
                last_name,
                email,
                mobile_number
            });
            res.json(contact);
        } else if (data_store === 'CRM') {
            const apiKey = 'Kzt7C-t8Qi85zIVESOByrw';
            const body = {
                first_name,
                last_name,
                email,
                mobile_number
            }
            const response = await axios.post('https://student-593431077673854335.myfreshworks.com/crm/sales/api/contacts', body, {
                headers: {
                    'Authorization': `Token token=${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            const contact = response.data.contact;
            res.json(contact);
        } else {
            res.json('Invalid data_store');
        }
    },
    getContact: async (req, res) => {
        const contactId = req.query.contact_id;
        const dataStore = req.query.data_store;

        if (dataStore === 'DATABASE') {
            const contact = await contactModel.findOne({
                where: {
                    id: contactId
                }
            });
            res.json(contact);
        } else if (dataStore === 'CRM') {
            const apiKey = 'Kzt7C-t8Qi85zIVESOByrw';
            const response = await axios.get(`https://student-593431077673854335.myfreshworks.com/crm/sales/api/contacts/${contactId}`, {
                headers: {
                    'Authorization': `Token token=${apiKey}`,
                    'Content-Type': 'application/json'
                },
            });
            const contact = response.data.contact;
            res.json(contact);
        } else {
            res.json('Invalid data_store');
        }
    },
    updateContact: async (req, res) => {
        const {
            contact_id,
            new_email,
            new_mobile_number,
            data_store
        } = req.body;
        if (data_store === 'DATABASE') {
            const contact = await contactModel.findOne({
                where: {
                    id: contact_id
                }
            });
            contact.email = new_email;
            contact.mobile_number = new_mobile_number;

            await contact.save();
            res.json(contact);
        } else if (data_store === 'CRM') {
            const apiKey = 'Kzt7C-t8Qi85zIVESOByrw';
            const body = {
                email: new_email,
                mobile_number: new_mobile_number
            };
            const response = await axios.put(`https://student-593431077673854335.myfreshworks.com/crm/sales/api/contacts/${contact_id}`, body, {
                headers: {
                    'Authorization': `Token token=${apiKey}`,
                    'Content-Type': 'application/json'
                },
            });
            const contact = response.data.contact;
            res.json(contact);
        } else {
            res.json('Invalid data_store');
        }
    },
    deleteContact: async (req, res) => {
        const {
            contact_id,
            data_store
        } = req.body;
        if (data_store === 'DATABASE') {
            const contact = await contactModel.findOne({
                where: {
                    id: contact_id
                }
            });
            contact.destroy();
            res.json('contact deleted');
        } else if (data_store === 'CRM') {
            const apiKey = 'Kzt7C-t8Qi85zIVESOByrw';
            const response = await axios.delete(`https://student-593431077673854335.myfreshworks.com/crm/sales/api/contacts/${contact_id}`, {
                headers: {
                    'Authorization': `Token token=${apiKey}`,
                    'Content-Type': 'application/json'
                },
            });
            res.json('contact successfully deleted');
        } else {
            res.json('Invalid data_store');
        }
    }
};