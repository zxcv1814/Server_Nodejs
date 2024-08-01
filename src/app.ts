import * as express from 'express';
const routerAuth = require('../src/routers/auth');
import * as db from'../config/dbconnect'

const app = express()

db.connect();

app.use(express.json());
app.use('/', routerAuth);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}`);
});
