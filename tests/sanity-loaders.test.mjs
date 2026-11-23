import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mock, test } from 'node:test';
import { createJiti } from 'jiti';
const require = createRequire(import.meta.url);
const cache = require('next/cache');
// Execute loader logic outside Next's cache runtime; real runtime is checked separately.
const tags = mock.method(cache, 'cacheTag', () => {});
const life = mock.method(cache, 'cacheLife', () => {});
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'localtest';
const jiti = createJiti(import.meta.url, { alias: { '@': new URL('../src', import.meta.url).pathname } });
const { client } = await jiti.import('../src/lib/sanity/client.ts');
const loaders = await jiti.import('../src/lib/sanity/content.ts');
const { defaultHome, defaultServices } = await jiti.import('../src/config/default-content.ts');
const fetchMock = mock.method(client, 'fetch', async () => null);
mock.method(globalThis, 'fetch', async () => { throw new Error('Tests must not use the network'); });

async function checkFallbacks() {
  assert.equal((await loaders.getSettings()).phone, null);
  assert.deepEqual(await loaders.getServices(), defaultServices);
  assert.deepEqual(await loaders.getProjects(), []);
  assert.deepEqual(await loaders.getReviews(), []);
  assert.equal((await loaders.getHome()).heroHeadline, defaultHome.heroHeadline);
  assert.equal((await loaders.getAbout()).ownerName, null);
}

test('all six loaders fall back for empty data and rejected API requests', async () => {
  await checkFallbacks();
  fetchMock.mock.mockImplementation(async () => { throw new Error('Synthetic outage'); });
  const logs = mock.method(console, 'error', () => {});
  await checkFallbacks();
  assert.equal(logs.mock.callCount(), 6);
  logs.mock.restore();
  assert.equal(tags.mock.callCount(), 12);
  assert.ok(tags.mock.calls.every(call => call.arguments[0] === 'sanity'));
  assert.ok(life.mock.calls.every(call => call.arguments[0] === 'hours'));
  assert.equal(client.config().timeout, 8000);
  assert.equal(client.config().maxRetries, 0);
  assert.equal(client.config().perspective, 'published');
  assert.equal(client.config().useCdn, false);
  assert.equal(client.config().token, undefined);
});

test('partial singleton documents use safe defaults without inventing contact information', async () => {
  fetchMock.mock.mockImplementation(async () => ({ heroHeadline: '  ', heroText: 'Fixture content', featuredServices: null, featuredProjects: null }));
  const home = await loaders.getHome();
  assert.equal(home.heroHeadline, defaultHome.heroHeadline);
  assert.equal(home.heroText, 'Fixture content');
  assert.deepEqual(home.featuredServices, []);
  assert.deepEqual(home.featuredProjects, []);
});


test('published homepage headline is used instead of a hardcoded override', async () => {
  fetchMock.mock.mockImplementation(async () => ({ heroHeadline: 'Repair. Buy. Sell.' }));
  assert.equal((await loaders.getHome()).heroHeadline, 'Repair. Buy. Sell.');
});
