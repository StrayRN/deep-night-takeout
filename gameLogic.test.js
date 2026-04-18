import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createInitialState,
  applyChoiceEffect,
  getEnding,
  getStageScorecard
} from './gameLogic.js';

test('applyChoiceEffect accumulates hidden stats and records history', () => {
  const state = createInitialState();

  const nextState = applyChoiceEffect(state, {
    id: 'stage1-event1-choice2',
    label: '先截图，再明确要求按备注放入指定柜',
    effect: {
      clarity: 2,
      firmness: 1,
      evidence: 2,
      pressure: 0
    }
  });

  assert.deepEqual(nextState.stats, {
    clarity: 2,
    firmness: 1,
    evidence: 2,
    pressure: 0
  });
  assert.equal(nextState.history.length, 1);
  assert.equal(nextState.history[0].choiceId, 'stage1-event1-choice2');
});

test('getStageScorecard summarizes the stage tone from cumulative stats', () => {
  const scorecard = getStageScorecard({
    stats: {
      clarity: 2,
      firmness: 1,
      evidence: 0,
      pressure: 0
    }
  });

  assert.equal(scorecard.tone, '勉强稳住');
  assert.match(scorecard.summary, /旧秩序/);
});

test('getEnding returns rights-defense success when evidence and pressure are high', () => {
  const ending = getEnding({
    stats: {
      clarity: 2,
      firmness: 2,
      evidence: 5,
      pressure: 5
    }
  });

  assert.equal(ending.id, 'rights-defended');
  assert.match(ending.personalTitle, /维权成功/);
  assert.match(ending.systemTitle, /制度修正/);
});
