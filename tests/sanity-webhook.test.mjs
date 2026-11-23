import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mock, test } from 'node:test';
import { createJiti } from 'jiti';
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
const require = createRequire(import.meta.url);
const cache = require('next/cache');
const invalidate = mock.method(cache, 'revalidateTag', () => {});
const jiti = createJiti(import.meta.url, { alias: { '@': new URL('../src', import.meta.url).pathname } });
const { POST } = await jiti.import('../src/app/api/revalidate/route.ts');
const body = JSON.stringify({ _type: 'homePage' });
const secret = 'synthetic-local-test-only';
const request = (value, signature) => new Request('http://localhost/api/revalidate', { method: 'POST', body: value, headers: signature ? { [SIGNATURE_HEADER_NAME]: signature } : {} });

test('webhook fails closed without configuration or valid authentication', async () => {
  delete process.env.SANITY_REVALIDATE_SECRET;
  assert.equal((await POST(request(body))).status, 500);
  process.env.SANITY_REVALIDATE_SECRET = secret;
  const log = mock.method(console, 'error', () => {});
  assert.equal((await POST(request(body))).status, 401);
  log.mock.restore();
  const signature = await encodeSignatureHeader(body, Date.now(), secret);
  assert.equal((await POST(request(body + ' ', signature))).status, 401);
  assert.ok((await POST(request(body, 'malformed'))).status >= 400);
  assert.equal(invalidate.mock.callCount(), 0);
});

test('authentic signature expires the shared tag using the two-argument API', async () => {
  process.env.SANITY_REVALIDATE_SECRET = secret;
  const signature = await encodeSignatureHeader(body, Date.now(), secret);
  const response = await POST(request(body, signature));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { revalidated: true });
  assert.deepEqual(invalidate.mock.calls[0].arguments, ['sanity', { expire: 0 }]);
});

test('signed invalid JSON is rejected without invalidating content', async () => {
  const signature = await encodeSignatureHeader('{', Date.now(), secret);
  assert.equal((await POST(request('{', signature))).status, 400);
  assert.equal(invalidate.mock.callCount(), 1);
});
