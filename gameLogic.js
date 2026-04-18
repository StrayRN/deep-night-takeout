import { ENDINGS, STAGE_SCORECARDS, STAT_DEFS } from './gameData.js';

export const STAT_KEYS = STAT_DEFS.map((item) => item.id);

export function createInitialState() {
  return {
    stats: Object.fromEntries(STAT_KEYS.map((key) => [key, 0])),
    history: []
  };
}

function normalizeEffect(effect = {}) {
  return Object.fromEntries(
    STAT_KEYS.map((key) => [key, Number(effect[key] ?? 0)])
  );
}

export function applyChoiceEffect(state, choice) {
  const effect = normalizeEffect(choice.effect);
  const nextStats = { ...state.stats };

  for (const key of STAT_KEYS) {
    nextStats[key] += effect[key];
  }

  return {
    ...state,
    stats: nextStats,
    history: [
      ...state.history,
      {
        choiceId: choice.id,
        label: choice.label,
        effect
      }
    ]
  };
}

function getBand(total) {
  if (total >= 9) {
    return 'high';
  }

  if (total >= 3) {
    return 'mid';
  }

  return 'low';
}

export function getStageScorecard(state, stage = { id: 'stage-1' }) {
  const total = STAT_KEYS.reduce((sum, key) => sum + state.stats[key], 0);
  const band = getBand(total);
  const stageId = stage.id ?? 'stage-1';
  const toneMap = {
    low: '被动承受',
    mid: '勉强稳住',
    high: '开始反推规则'
  };

  return {
    tone: toneMap[band],
    summary: STAGE_SCORECARDS[stageId][band]
  };
}

export function getEnding(state) {
  const { clarity, firmness, evidence, pressure } = state.stats;

  if (pressure >= 6 && evidence >= 5 && clarity >= 4) {
    return ENDINGS['system-corrected'];
  }

  if (pressure >= 4 && evidence >= 4) {
    return ENDINGS['rights-defended'];
  }

  if (clarity >= 5 && firmness >= 4) {
    return ENDINGS['meal-saved'];
  }

  if (clarity + firmness + evidence >= 7) {
    return ENDINGS['barely-held'];
  }

  return ENDINGS['silent-swallow'];
}

export function getStatReadout(stats) {
  return STAT_DEFS.map((item) => ({
    ...item,
    value: stats[item.id],
    mood: describeStat(item.id, stats[item.id])
  }));
}

function describeStat(key, value) {
  const bands = {
    clarity: ['备注一路模糊', '关键信息基本说清', '你把要求写得很死'],
    firmness: ['你习惯先退一步', '必要时会明确坚持', '你几乎不让履约变成讨价还价'],
    evidence: ['几乎没留下记录', '有基本截图和照片', '证据链很完整'],
    pressure: ['问题停在你这一单', '你会做基础反馈', '你持续推动平台或学校介入']
  };

  if (value >= 5) {
    return bands[key][2];
  }

  if (value >= 2) {
    return bands[key][1];
  }

  return bands[key][0];
}
