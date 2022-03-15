import { App } from '@godgiven/type-server';
import { authFunction } from './middleware/authentication-server.js';
import {
  pageHome,
} from './page/index.js';

(globalThis as any).secreatKey = 'test secretKey';

const app = new App();
app.port = 5000;
app.version = 'v1';
app.middlewareList.push(authFunction);

app.register('GET', '/', pageHome);
app.register('GET', '', pageHome);

app.listen();
