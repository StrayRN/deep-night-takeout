import test from 'node:test';
import assert from 'node:assert/strict';

import { GAME_DATA } from './gameData.js';
import {
  buildPhoneOrderDraftSummary,
  createPhoneOrderDraft,
  createResolvedChoice
} from './gameRuntime.js';

test('canonical chapters alternate phone and locker scenes', () => {
  assert.equal(GAME_DATA.chapters.length, 3);

  for (const chapter of GAME_DATA.chapters) {
    assert.equal(chapter.events.length, 2);
    assert.equal(chapter.events[0].sceneType, 'phone_order');
    assert.deepEqual(chapter.events[0].screen.stepOrder, ['menu', 'checkout']);
    assert.ok(Array.isArray(chapter.events[0].screen.addressKeywords));
    assert.ok(Array.isArray(chapter.events[0].screen.noteKeywords));

    assert.equal(chapter.events[1].sceneType, 'locker_scene');
    assert.ok(Array.isArray(chapter.events[1].screen.evidenceHints));
    assert.equal(typeof chapter.events[1].screen.actionLabel, 'string');
  }
});

test('phone order draft starts from menu and can assemble address and note keywords', () => {
  const phoneEvent = GAME_DATA.chapters[0].events[0];
  const draft = createPhoneOrderDraft(phoneEvent);

  assert.equal(draft.currentStep, 'menu');
  assert.deepEqual(draft.selectedMenuItemIds, ['ganjiao-beef']);

  const summary = buildPhoneOrderDraftSummary(phoneEvent, {
    ...draft,
    selectedAddressKeywordIds: [
      'campus-ziping',
      'dorm-11',
      'south-locker-3',
      'east-stairs'
    ],
    selectedNoteKeywordIds: [
      'put-in-locker',
      'use-target-locker',
      'dont-leave-ground',
      'read-note-first'
    ]
  });

  assert.equal(summary.addressText, '紫荆校区 / 梅园 11 舍 / 南门 3 号柜 / 东侧台阶旁');
  assert.equal(
    summary.noteText,
    '请放柜；指定南门 3 号柜；不要放地上；来电前先看备注'
  );
  assert.deepEqual(summary.keywordEffects, {
    clarity: 4,
    firmness: 1,
    evidence: 0,
    pressure: 0
  });
});

test('resolved phone choice merges keyword effects into the selected action effect', () => {
  const phoneEvent = GAME_DATA.chapters[0].events[0];
  const choice = phoneEvent.choices.find((item) => item.id === 'stage1-event1-choice2');
  const draft = {
    ...createPhoneOrderDraft(phoneEvent),
    selectedAddressKeywordIds: [
      'campus-ziping',
      'dorm-11',
      'south-locker-3',
      'east-stairs'
    ],
    selectedNoteKeywordIds: [
      'put-in-locker',
      'use-target-locker',
      'dont-leave-ground',
      'read-note-first'
    ]
  };

  const resolvedChoice = createResolvedChoice(phoneEvent, choice, draft);

  assert.equal(resolvedChoice.label, choice.text);
  assert.deepEqual(resolvedChoice.effect, {
    clarity: 6,
    firmness: 2,
    evidence: 2,
    pressure: 0
  });
  assert.match(resolvedChoice.commentary, /南门 3 号柜/);
});
