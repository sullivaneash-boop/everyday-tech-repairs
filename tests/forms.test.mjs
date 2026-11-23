import assert from 'node:assert/strict';
import { File } from 'node:buffer';
import { test } from 'node:test';
import { createJiti } from 'jiti';
const jiti = createJiti(import.meta.url, { alias: { '@': new URL('../src', import.meta.url).pathname } });
const { repairSchema, sellSchema } = await jiti.import('../src/lib/forms/schemas.ts');
const { buildRepairPayload, buildSellPayload, buildFormData } = await jiti.import('../src/lib/forms/payloads.ts');

// Synthetic fixtures only; these tests never send a submission or contact anyone.
const contact = { firstName: 'Test', lastName: 'Fixture', phone: '2025550100', email: 'test@example.invalid', street: 'Test address', city: 'Test city', state: 'NY', zip: '10001', deviceType: 'phone' };

test('repair preserves required data and puts device/issue ahead of address', () => {
  const v = repairSchema.parse({ ...contact, model: 'iPhone 13', issue: 'Synthetic screen issue' });
  const p = buildRepairPayload(v);
  assert.equal(p.subject, 'New repair request: iPhone 13, Test F.');
  const data = buildFormData(p, [], '');
  assert.deepEqual([...data.keys()].slice(0, 4), ['First Name', 'Last Name', 'Phone', 'email']);
  assert.ok([...data.keys()].indexOf('Description of Issue') < [...data.keys()].indexOf('Street Address'));
  for (const value of Object.values(contact).filter(v => v !== 'phone')) assert.ok([...data.values()].includes(value));
  assert.equal(data.get('Description of Issue'), v.issue);
  assert.equal(data.get('subject'), p.subject);
  assert.equal(data.get('_subject'), null);
  assert.equal(data.get('Photos Included'), '0');
  assert.equal(data.get('Additional Information'), null);
});

test('sell preserves ownership and files with readable labels and order', () => {
  const v = sellSchema.parse({ ...contact, brand: 'Test brand', model: 'Test model', condition: 'Synthetic condition', ownership: 'on', askingPrice: '$100', storage: '128 GB', accessories: 'Test accessory', damage: 'Test damage', missingParts: 'Test part', details: 'Test detail', powersOn: 'Yes', functionalCondition: 'Fully working', cosmeticCondition: 'Light wear' });
  const files = Array.from({ length: 5 }, (_, i) => new File(['synthetic'], `test-${i + 1}.jpg`, { type: 'image/jpeg' }));
  const p = buildSellPayload(v);
  const data = buildFormData(p, files, 'bot-fixture');
  assert.equal(data.get('subject'), 'New sell request: Test brand Test model, Test F.');
  assert.ok([...data.keys()].indexOf('Condition / Issues') < [...data.keys()].indexOf('Street Address'));
  assert.match(data.get('Ownership Confirmed'), /authorized to sell/);
  assert.equal(data.get('_gotcha'), 'bot-fixture');
  assert.equal(data.get('Photos Included'), '5');
  files.forEach((file, i) => assert.equal(data.get(`Photo ${i + 1}`).name, file.name));
  for (const key of ['condition', 'askingPrice', 'storage', 'accessories', 'damage', 'missingParts', 'details', 'powersOn', 'functionalCondition', 'cosmeticCondition']) assert.ok([...data.values()].includes(v[key]));
  assert.equal(sellSchema.safeParse({ ...v, ownership: undefined }).success, false);
});

test('subjects fall back to device category/other description and remain bounded and single-line', () => {
  const v = repairSchema.parse({ ...contact, issue: 'Synthetic issue text' });
  assert.match(buildRepairPayload(v).subject, /Phone, Test F\./);
  assert.equal(repairSchema.safeParse({ ...v, deviceType: 'other' }).success, false);
  assert.match(buildRepairPayload({ ...v, deviceType: 'other', deviceTypeOther: 'Test camera' }).subject, /Other: Test camera/);
  const p = buildRepairPayload({ ...v, model: '{{email}}\n' + 'x'.repeat(2000), firstName: 'Test\r\nName' });
  assert.doesNotMatch(p.subject, /[{}\r\n]/);
  assert.ok(p.subject.length <= 116);
});
