import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { corsOptions } from 'src/config/cors';

import { middleware } from 'src/middleware/middleware';

import registerRoutes from 'src/routes/index';

import { createFileStream } from 'src/util/file';
import Console from 'src/util/logger/console';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ debug: true });
}

const PORT: number = parseInt(process.env.PORT!, 10) || 3000;
const HOST: string = process.env.HOST!;

const app = express();

app.use('/static', express.static(path.join(__dirname, 'images')));
app.use(middleware.credentials);
app.use(cors(corsOptions));

app.use(
  morgan('combined', { stream: createFileStream('logs', 'request.log') })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

registerRoutes(app);

app.use(middleware.error);

app.listen(PORT, HOST, () => {
  Console.info(`Server running at http://${HOST}:${PORT}/`);
});
