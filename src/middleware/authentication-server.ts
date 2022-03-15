import { ServerResponse } from 'http';
import Debug from 'debug';
import * as jwt from './json-web-token.js';

import type { IncomingMessage } from 'http';

export interface requestType extends IncomingMessage
{
  user?: {
    name: string;
  };
}

const debug = Debug('auth');
// define plugin using callbacks
export const authFunction = (request: requestType, reply: ServerResponse): requestType =>
{
  const authHeader = request.headers.authorization;
  let token = '';

  // Giv token and secret
  if (authHeader != null)
  {
    // Set token and secret
    token = authHeader.split(' ')[1];
  }
  else
  {
    reply.writeHead(401, { 'Content-Type': 'application/json' });
    debug('401 - User don,t have a token');
    reply.end();
    return request;
  }

  if ((globalThis as any).secreatKey == null)
  {
    reply.writeHead(401, { 'Content-Type': 'application/json' });
    debug('401 - secretkey is not set');
    reply.end();
    return request;
  }

  // Verify token
  try
  {
    request.user = jwt.verify(token, (globalThis as any).secreatKey) as typeof request.user;
    return request;
  }
  catch
  {
    reply.writeHead(403, { 'Content-Type': 'application/json' });
    debug('403 - Bad token');
    reply.end();
    return request;
  }
};
