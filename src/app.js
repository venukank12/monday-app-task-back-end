require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { createTunnel } = require('./helpers/tunnel');
const cors = require('cors');
const connectDb = require('./db');

const { PORT: port } = process.env;
const app = express();

app.use(cors())
app.use(connectDb);
app.use(bodyParser.json());
app.use(routes);
app.listen(port, () => {
  createTunnel(port);
});

module.exports = app;
