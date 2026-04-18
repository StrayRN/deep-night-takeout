import { PROJECT_COPY, STAGES } from './gameData.js';
import {
  applyChoiceEffect,
  createInitialState,
  getEnding,
  getStageScorecard,
  getStatReadout
} from './gameLogic.js';

const app = document.querySelector('#app');

let session = buildSession();

function buildSession() {
  return {
    screen: 'home',
    stageIndex: 0,
    eventIndex: 0,
    stageReports: [],
    ...createInitialState()
  };
}

function startGame() {
  session = {
    ...buildSession(),
    screen: 'event'
  };
  render();
}

function getCurrentStage() {
  return STAGES[session.stageIndex];
}

function getCurrentEvent() {
  const stage = getCurrentStage();
  return stage.events[session.eventIndex];
}

function onChoose(choiceId) {
  const event = getCurrentEvent();
  const choice = event.options.find((item) => item.id === choiceId);
  const nextState = applyChoiceEffect(
    {
      stats: session.stats,
      history: session.history
    },
    choice
  );

  session = {
    ...session,
    ...nextState
  };

  const stage = getCurrentStage();
  const isStageComplete = session.eventIndex === stage.events.length - 1;

  if (!isStageComplete) {
    session = {
      ...session,
      eventIndex: session.eventIndex + 1
    };
    render();
    return;
  }

  session = {
    ...session,
    screen: 'stage-summary',
    stageReports: [
      ...session.stageReports,
      {
        stageId: stage.id,
        stageTitle: stage.title,
        ...getStageScorecard(session, stage)
      }
    ]
  };
  render();
}

function onContinue() {
  if (session.screen === 'stage-summary') {
    const isLastStage = session.stageIndex === STAGES.length - 1;

    if (isLastStage) {
      session = {
        ...session,
        screen: 'ending'
      };
      render();
      return;
    }

    session = {
      ...session,
      screen: 'event',
      stageIndex: session.stageIndex + 1,
      eventIndex: 0
    };
    render();
    return;
  }

  if (session.screen === 'ending') {
    startGame();
  }
}

function render() {
  if (session.screen === 'home') {
    renderHome();
    return;
  }

  if (session.screen === 'event') {
    renderEvent();
    return;
  }

  if (session.screen === 'stage-summary') {
    renderStageSummary();
    return;
  }

  renderEnding();
}

function renderHome() {
  app.innerHTML = `
    <section class="panel hero-panel">
      <div class="hero-copy">
        <p class="section-label">一句话介绍</p>
        <h2>${PROJECT_COPY.oneLiner}</h2>
        <p>${PROJECT_COPY.tagline}</p>
      </div>
      <div class="hero-grid">
        <article class="info-card">
          <p class="section-label">玩法</p>
          <h3>三幕制互动策略</h3>
          <p>每一幕代表一次制度变化。你的选项会悄悄改写后续体验和最终结局。</p>
        </article>
        <article class="info-card">
          <p class="section-label">目标</p>
          <h3>保住这一单，也推动规则</h3>
          <p>备注、沟通、留证、反馈，每一步都在决定今晚的饭和明天的秩序。</p>
        </article>
      </div>
      <div class="timeline">
        ${STAGES.map(
          (stage) => `
            <article class="timeline-card">
              <p class="section-label">${stage.label}</p>
              <h3>${stage.title}</h3>
              <p>${stage.theme}</p>
            </article>
          `
        ).join('')}
      </div>
      <button class="primary-button" data-action="start">开始这顿夜宵</button>
    </section>
  `;

  app.querySelector('[data-action="start"]').addEventListener('click', startGame);
}

function renderEvent() {
  const stage = getCurrentStage();
  const event = getCurrentEvent();

  app.innerHTML = `
    <section class="panel">
      <div class="progress-row">
        <div>
          <p class="section-label">${stage.label}</p>
          <h2>${stage.title}</h2>
          <p class="muted">${stage.theme}</p>
        </div>
        <div class="progress-chip">事件 ${session.eventIndex + 1} / ${stage.events.length}</div>
      </div>

      <article class="scene-card">
        <p class="scene-kicker">${event.kicker}</p>
        <h3>${event.title}</h3>
        <p>${event.scene}</p>
      </article>

      <div class="choice-list">
        ${event.options
          .map(
            (option) => `
              <button class="choice-button" data-choice-id="${option.id}">
                <span class="choice-label">${option.label}</span>
                <span class="choice-after">${option.aftermath}</span>
              </button>
            `
          )
          .join('')}
      </div>

      <aside class="footnote-card">
        <p class="section-label">本幕背景</p>
        <p>${stage.intro}</p>
      </aside>
    </section>
  `;

  app.querySelectorAll('[data-choice-id]').forEach((button) => {
    button.addEventListener('click', () => onChoose(button.dataset.choiceId));
  });
}

function renderStageSummary() {
  const stage = getCurrentStage();
  const report = session.stageReports.at(-1);

  app.innerHTML = `
    <section class="panel">
      <p class="section-label">${stage.label}结算</p>
      <h2>${stage.title}</h2>
      <div class="summary-banner">
        <span class="summary-tag">${report.tone}</span>
        <p>${report.summary}</p>
      </div>
      <div class="summary-grid">
        <article class="info-card">
          <p class="section-label">这一幕发生了什么</p>
          <p>${stage.wrapUp}</p>
        </article>
        <article class="info-card">
          <p class="section-label">你的处理方式</p>
          <p>${getRecentChoices(stage).join('、')}</p>
        </article>
      </div>
      <button class="primary-button" data-action="continue">
        ${session.stageIndex === STAGES.length - 1 ? '查看最终结局' : '进入下一幕'}
      </button>
    </section>
  `;

  app
    .querySelector('[data-action="continue"]')
    .addEventListener('click', onContinue);
}

function renderEnding() {
  const ending = getEnding(session);
  const statReadout = getStatReadout(session.stats);

  app.innerHTML = `
    <section class="panel ending-panel">
      <p class="section-label">最终结局</p>
      <h2>${ending.personalTitle}</h2>
      <div class="ending-badge">${ending.badge}</div>
      <div class="summary-grid">
        <article class="info-card">
          <p class="section-label">个人结局</p>
          <h3>${ending.personalTitle}</h3>
          <p>${ending.personalSummary}</p>
        </article>
        <article class="info-card">
          <p class="section-label">制度状态</p>
          <h3>${ending.systemTitle}</h3>
          <p>${ending.systemSummary}</p>
        </article>
      </div>

      <section class="stat-board">
        <p class="section-label">你的策略轨迹</p>
        <div class="stat-list">
          ${statReadout
            .map(
              (item) => `
                <article class="stat-card">
                  <h3>${item.label}</h3>
                  <p>${item.mood}</p>
                </article>
              `
            )
            .join('')}
        </div>
      </section>

      <section class="report-list">
        <p class="section-label">三幕回顾</p>
        ${session.stageReports
          .map(
            (report) => `
              <article class="report-card">
                <h3>${report.stageTitle}</h3>
                <p class="report-tone">${report.tone}</p>
                <p>${report.summary}</p>
              </article>
            `
          )
          .join('')}
      </section>

      <button class="primary-button" data-action="continue">再来一局</button>
    </section>
  `;

  app
    .querySelector('[data-action="continue"]')
    .addEventListener('click', onContinue);
}

function getRecentChoices(stage) {
  const count = stage.events.length;
  return session.history
    .slice(-count)
    .map((item) => item.label);
}

render();
