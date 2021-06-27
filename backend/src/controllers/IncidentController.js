const connection = require('../database/connection');

module.exports = {
    //listando casos
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //agrupando infos com tabela ongs
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        res.header('X-Total-Count', count['count(*)'])

        return res.json(incidents);
    },

    //criando casos
    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return res.json({ id })
    },

    async delete(req, res) {
        const { id } = req.params; //pega o parametro passado pelo URL
        const ong_id = req.headers.authorization; //pega o valor do campo authorization no header

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); //mostra apenas o primeiro resultado

        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
};