import assert from 'node:assert/strict';
import { File } from 'node:buffer';
import { mock, test } from 'node:test';
import { createJiti } from 'jiti';
const jiti = createJiti(import.meta.url);
const { submitToFormspree } = await jiti.import('../src/lib/forms/submit.ts');

test('upload-plan rejection preserves the payload and never silently retries without photos', async () => {
  const data = new FormData();
  data.append('Photo 1', new File(['synthetic fixture'], 'fixture.jpg', { type: 'image/jpeg' }));
  const fetchMock = mock.method(globalThis, 'fetch', async () => Response.json({ errors: [{ message: 'File Uploads Not Permitted' }] }, { status: 403 }));
  try {
    const result = await submitToFormspree('test-only', data);
    assert.equal(result.ok, false);
    assert.equal(result.retryable, false);
    assert.match(result.message, /Photo uploads are unavailable/);
    assert.equal(fetchMock.mock.callCount(), 1);
    const [url, options] = fetchMock.mock.calls[0].arguments;
    assert.equal(url, 'https://formspree.io/f/test-only');
    assert.equal(options.body, data);
    assert.equal(options.headers['Content-Type'], undefined); // fetch supplies the multipart boundary
    assert.equal(data.get('Photo 1').name, 'fixture.jpg');
  } finally { fetchMock.mock.restore(); }
});

test('error-string variant is handled while successful and rate-limited responses stay distinct', async () => {
  const fetchMock = mock.method(globalThis, 'fetch', async () => Response.json({ error: 'File Uploads Not Permitted' }, { status: 400 }));
  try {
    assert.equal((await submitToFormspree('test-only', new FormData())).retryable, false);
    fetchMock.mock.mockImplementation(async () => Response.json({ ok: true }));
    assert.deepEqual(await submitToFormspree('test-only', new FormData()), { ok: true });
    fetchMock.mock.mockImplementation(async () => Response.json({}, { status: 429 }));
    const limited = await submitToFormspree('test-only', new FormData());
    assert.equal(limited.ok, false);
    assert.equal(limited.retryable, true);
  } finally { fetchMock.mock.restore(); }
});
