import express from 'express';
import session from 'express-session';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { environment } from './lib/environment.js';
import { handler404, handlerError } from './lib/handlers.js';
import { logger } from './lib/logger.js';

const env = environment(process.env, logger);

if (!env) {
  process.exit(1);
}

const { port, sessionSecret } = env;
const path = dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

app.use(handler404);
app.use(handlerError);

app.listen(port, () => {
  console.info(`🚀 Server running at http://localhost:${port}/`);
});