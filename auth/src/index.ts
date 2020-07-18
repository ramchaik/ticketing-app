import { json } from 'body-parser';
import express from 'express';

const app = express();
app.use(json());

app.get('/', (req, res) => res.send('Hello World'));

app.listen(3000, () => console.log('Server is up at 3000...'));
