import * as jwt from './json-web-token.js';
const secret: string = 'test secretKey';
let token2 = '';

try
{
  token2 = jwt.sign('{"name":"test"}', secret);
}
catch
{
  console.log('error');
}

console.log(token2);
