import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createJiti } from 'jiti';
import { evaluate, parse } from 'groq-js';
const jiti = createJiti(import.meta.url, { alias: { '@': new URL('../src', import.meta.url).pathname } });
const queries = await jiti.import('../src/lib/sanity/queries.ts');
const run = async (query, dataset) => (await evaluate(parse(query), { dataset })).get();
const ref = (_ref) => ({ _type: 'reference', _ref });
const asset = { _id: 'asset', _type: 'sanity.imageAsset', url: 'https://cdn.sanity.io/test-fixture.jpg', metadata: { dimensions: { width: 800, height: 600 }, lqip: 'fixture' } };
const image = { asset: ref('asset'), alt: 'Synthetic fixture' };
const service = { _id: 'svc', _type: 'service', name: 'Fixture service', description: 'Synthetic description', visible: true };
const project = { _id: 'project', _type: 'project', title: 'Fixture project', category: 'phone', featuredImage: image };

test('all six queries parse and return empty defaults with an empty dataset', async () => {
  for (const name of ['settingsQuery', 'homeQuery', 'aboutQuery']) assert.equal(await run(queries[name], []), null);
  for (const name of ['servicesQuery', 'projectsQuery', 'reviewsQuery']) assert.deepEqual(await run(queries[name], []), []);
});

test('homepage references resolve in selected order and exclude missing, hidden and wrong-type targets', async () => {
  const home = { _id: 'homePage', _type: 'homePage', featuredServices: [ref('second'), ref('missing'), ref('hidden'), ref('project'), ref('svc')], featuredProjects: [ref('broken'), ref('missing'), ref('svc'), ref('project')] };
  const data = await run(queries.homeQuery, [home, service, { ...service, _id: 'second' }, { ...service, _id: 'hidden', visible: false }, project, { ...project, _id: 'broken', featuredImage: { asset: ref('missing') } }, asset]);
  assert.deepEqual(data.featuredServices.map(s => s.id), ['second', 'svc']);
  assert.deepEqual(data.featuredProjects.map(p => p.id), ['project']);
  assert.equal(data.featuredProjects[0].featuredImage.url, asset.url);
});

test('missing image assets are omitted and optional query fields have the advertised null/array defaults', async () => {
  const data = await run(queries.projectsQuery, [project, { ...project, _id: 'broken', featuredImage: { asset: ref('missing') } }, asset]);
  assert.equal(data.length, 1);
  assert.equal(data[0].brand, null);
  assert.equal(data[0].beforeImage, null);
  assert.deepEqual(data[0].gallery, []);
  const about = await run(queries.aboutQuery, [{ _id: 'aboutPage', _type: 'aboutPage', ownerPhoto: { asset: ref('missing') }, photos: [image, { asset: ref('missing') }] }, asset]);
  assert.equal(about.ownerPhoto, null);
  assert.equal(about.photos.length, 1);
  const services = await run(queries.servicesQuery, [service, { ...service, _id: 'hidden', visible: false }]);
  assert.equal(services.length, 1);
  assert.equal(services[0].icon, 'tools');
  assert.deepEqual(services[0].categories, []);
  assert.equal(services[0].image, null);
});

test('settings, about and review projections preserve public content and hide invisible reviews', async () => {
  const settings = await run(queries.settingsQuery, [{ _id: 'siteSettings', _type: 'siteSettings', name: 'Fixture', hours: [{ days: 'Fixture days', hours: 'Fixture hours' }], socialLinks: [{ platform: 'Other', url: 'https://example.invalid' }] }]);
  assert.equal(settings.name, 'Fixture');
  assert.equal(settings.hours[0].days, 'Fixture days');
  assert.equal(settings.socialLinks[0].platform, 'Other');
  assert.equal(settings.phone, null);
  const about = await run(queries.aboutQuery, [{ _id: 'aboutPage', _type: 'aboutPage', ownerName: 'Fixture', bio: 'Synthetic bio', values: [{ title: 'Fixture value' }] }]);
  assert.equal(about.bio, 'Synthetic bio');
  assert.equal(about.values[0].description, null);
  const reviews = await run(queries.reviewsQuery, [{ _id: 'review', _type: 'review', customerName: 'Fixture', text: 'Synthetic test only' }, { _id: 'hidden', _type: 'review', visible: false }]);
  assert.equal(reviews.length, 1);
  assert.equal(reviews[0].featured, false);
  assert.equal(reviews[0].rating, null);
  assert.equal(await run(queries.settingsQuery, [{ _id: 'siteSettings', _type: 'wrong' }]), null);
});
