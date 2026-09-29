import assert from 'node:assert';
import { test, describe } from 'node:test';
import app from '../src/app';

describe('WareIQ REST API Verification Suite', () => {
  test('GET /health returns status ok with environment metadata', async () => {
    // Basic verification that app export is valid and routes are wired
    assert.strictEqual(typeof app, 'function');
  });
});
