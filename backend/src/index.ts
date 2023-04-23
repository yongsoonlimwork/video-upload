import express from 'express';
import dotenv from 'dotenv';

import baseRoutes from '@/routes';
import testRoutes from '@/routes/test';
import uploadRoutes from '@/routes/upload';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT;

app.use('/', baseRoutes);

app.use('/test', testRoutes);

app.use('/upload', uploadRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
