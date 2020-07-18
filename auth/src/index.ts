import { json } from 'body-parser';
import express from 'express';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there');
});

app.listen(3000, () => console.log('Server is up at 3000... V1 '));
