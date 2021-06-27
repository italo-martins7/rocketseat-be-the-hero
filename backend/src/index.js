const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
/*
query params: parametros nomeados enviados na rota após '?'(filtros, paginacao)
route params: parametros usados para identificar recursos
request body: corpo da requisicao, utilizado para criar ou alterar recursos
*/
