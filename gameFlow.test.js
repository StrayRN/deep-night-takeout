import test from 'node:test';
import assert from 'node:assert/strict';

import { GAME_DATA } from './gameData.js';
import { createEventUiState, getPostChoiceTransition } from './gameFlow.js';

test('createEventUiState seeds a phone draft for phone scenes', () => {
  const phoneEvent = GAME_DATA.chapters[0].events[0];
  const lockerEvent = GAME_DATA.chapters[0].events[1];

  const phoneUiState = createEventUiState(phoneEvent);
  const lockerUiState = createEventUiState(lockerEvent);

  assert.equal(phoneUiState.phoneDraft.currentStep, 'menu');
  assert.deepEqual(lockerUiState, {});
});

test('post choice transition advances to the next event inside a chapter', () => {
  const transition = getPostChoiceTransition(GAME_DATA.chapters, 0, 0);

  assert.deepEqual(transition, {
    screen: 'event',
    stageIndex: 0,
    eventIndex: 1
  });
});

test('post choice transition switches to stage summary or ending summary after chapter finals', () => {
  const stageSummaryTransition = getPostChoiceTransition(GAME_DATA.chapters, 0, 1);
  const endingTransition = getPostChoiceTransition(GAME_DATA.chapters, 2, 1);

  assert.deepEqual(stageSummaryTransition, {
    screen: 'stage-summary',
    stageIndex: 0,
    eventIndex: 1
  });
  assert.deepEqual(endingTransition, {
    screen: 'ending',
    stageIndex: 2,
    eventIndex: 1
  });
});
