const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    //listando ONGs
    async index(req, res) {
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    },

    //criando ONGs
    async create(req, res) {

        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypto.randomBytes(4).toString('hex');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        //return res.send('Hello World');
        return res.json({ id });
    }
}