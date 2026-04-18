import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { PROJECT_COPY } from './gameData.js';
import { getDocumentMeta, renderSiteHeader } from './appShell.js';

test('site header markup is derived from project copy', () => {
  const markup = renderSiteHeader(PROJECT_COPY, {
    compact: false
  });

  assert.match(markup, new RegExp(PROJECT_COPY.title));
  assert.match(markup, new RegExp(PROJECT_COPY.subtitle));
  assert.match(markup, new RegExp(PROJECT_COPY.eyebrow));
});

test('document metadata is derived from project copy', () => {
  const meta = getDocumentMeta(PROJECT_COPY);

  assert.deepEqual(meta, {
    title: PROJECT_COPY.title,
    description: PROJECT_COPY.oneLiner
  });
});

test('index html keeps only the shell and app mount, not a hardcoded site header', () => {
  const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');

  assert.match(html, /id="app"/);
  assert.doesNotMatch(html, /<header class="site-header">/);
  assert.doesNotMatch(html, /深夜食堂外：请放柜，谢谢/);
});
