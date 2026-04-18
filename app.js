import { GAME_DATA, PROJECT_COPY } from './gameData.js';
import {
  applyChoiceEffect,
  createInitialState,
  getEnding,
  getStageScorecard,
  getStatReadout
} from './gameLogic.js';
import { createEventUiState, getPostChoiceTransition } from './gameFlow.js';
import { buildPhoneOrderDraftSummary, createResolvedChoice } from './gameRuntime.js';

const app = document.querySelector('#app');
const chapters = GAME_DATA.chapters;

let session = buildSession();

function buildSession() {
  return {
    screen: 'home',
    stageIndex: 0,
    eventIndex: 0,
    stageReports: [],
    eventUiState: {},
    ...createInitialState()
  };
}

function startGame() {
  goToEvent(0, 0, {
    replaceSession: true
  });
}

function goToEvent(stageIndex, eventIndex, options = {}) {
  const baseSession = options.replaceSession ? buildSession() : session;
  const event = chapters[stageIndex].events[eventIndex];

  session = {
    ...baseSession,
    screen: 'event',
    stageIndex,
    eventIndex,
    eventUiState: createEventUiState(event)
  };
  render();
}

function getCurrentChapter() {
  return chapters[session.stageIndex];
}

function getCurrentEvent() {
  return getCurrentChapter().events[session.eventIndex];
}

function updatePhoneDraft(updater) {
  const draft = session.eventUiState.phoneDraft;
  session = {
    ...session,
    eventUiState: {
      ...session.eventUiState,
      phoneDraft: updater(draft)
    }
  };
  render();
}

function setPhoneStep(step) {
  updatePhoneDraft((draft) => ({
    ...draft,
    currentStep: step
  }));
}

function selectMenuItem(menuItemId) {
  updatePhoneDraft((draft) => ({
    ...draft,
    selectedMenuItemIds: [menuItemId]
  }));
}

function toggleKeyword(kind, groupId, keywordId) {
  const event = getCurrentEvent();
  const groups =
    kind === 'address' ? event.screen.addressKeywords : event.screen.noteKeywords;
  const group = groups.find((item) => item.id === groupId);
  const draftKey =
    kind === 'address' ? 'selectedAddressKeywordIds' : 'selectedNoteKeywordIds';

  updatePhoneDraft((draft) => ({
    ...draft,
    [draftKey]: getNextKeywordSelection(draft[draftKey], group, keywordId)
  }));
}

function getNextKeywordSelection(currentIds, group, keywordId) {
  const groupIds = new Set(group.keywords.map((item) => item.id));
  const isSelected = currentIds.includes(keywordId);

  if (group.selectionMode === 'single') {
    const nextIds = currentIds.filter((id) => !groupIds.has(id));
    return isSelected ? nextIds : [...nextIds, keywordId];
  }

  if (isSelected) {
    return currentIds.filter((id) => id !== keywordId);
  }

  return [...currentIds, keywordId];
}

function onChoose(choiceId) {
  const event = getCurrentEvent();
  const choice = event.choices.find((item) => item.id === choiceId);

  const resolvedChoice =
    event.sceneType === 'phone_order'
      ? createResolvedChoice(event, choice, session.eventUiState.phoneDraft)
      : {
          id: choice.id,
          label: choice.text,
          effect: choice.effects,
          commentary: choice.commentary
        };

  const nextState = applyChoiceEffect(
    {
      stats: session.stats,
      history: session.history
    },
    resolvedChoice
  );
  const updatedSession = {
    ...session,
    ...nextState
  };
  const transition = getPostChoiceTransition(
    chapters,
    session.stageIndex,
    session.eventIndex
  );

  if (transition.screen === 'event') {
    session = updatedSession;
    goToEvent(transition.stageIndex, transition.eventIndex);
    return;
  }

  if (transition.screen === 'stage-summary') {
    const chapter = getCurrentChapter();

    session = {
      ...updatedSession,
      screen: 'stage-summary',
      stageReports: [
        ...updatedSession.stageReports,
        {
          stageId: chapter.id,
          stageTitle: chapter.title,
          summaryTitle: chapter.summary.title,
          ...getStageScorecard(updatedSession, chapter)
        }
      ]
    };
    render();
    return;
  }

  const finalChapter = getCurrentChapter();
  session = {
    ...updatedSession,
    screen: 'ending',
    stageReports: [
      ...updatedSession.stageReports,
      {
        stageId: finalChapter.id,
        stageTitle: finalChapter.title,
        summaryTitle: finalChapter.summary.title,
        ...getStageScorecard(updatedSession, finalChapter)
      }
    ]
  };
  render();
}

function onContinue() {
  if (session.screen === 'stage-summary') {
    goToEvent(session.stageIndex + 1, 0);
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
          <p class="section-label">主舞台</p>
          <h3>手机下单 + 柜机现场</h3>
          <p>你会先在外卖 App 里选菜、补地址、写备注，再到室外外卖柜现场看结果到底落在哪里。</p>
        </article>
        <article class="info-card">
          <p class="section-label">核心机制</p>
          <h3>备注、沟通、留证、反馈</h3>
          <p>关键词拼装地址与备注，电话与消息决定沟通强度，现场处理决定证据和反馈能否形成压力。</p>
        </article>
      </div>

      <div class="timeline dual-stage-timeline">
        ${chapters
          .map(
            (chapter) => `
              <article class="timeline-card">
                <p class="section-label">${chapter.label}</p>
                <h3>${chapter.title}</h3>
                <p>${chapter.subtitle}</p>
                <div class="timeline-mini">
                  <span>手机下单</span>
                  <span>柜机现场</span>
                </div>
              </article>
            `
          )
          .join('')}
      </div>

      <button class="primary-button" data-action="start">开始这顿夜宵</button>
    </section>
  `;

  app.querySelector('[data-action="start"]').addEventListener('click', startGame);
}

function renderEvent() {
  const chapter = getCurrentChapter();
  const event = getCurrentEvent();

  if (event.sceneType === 'phone_order') {
    renderPhoneOrderEvent(chapter, event);
    return;
  }

  renderLockerSceneEvent(chapter, event);
}

function renderPhoneOrderEvent(chapter, event) {
  const draft = session.eventUiState.phoneDraft;
  const summary = buildPhoneOrderDraftSummary(event, draft);
  const screen = event.screen;
  const selectedMainDish = summary.selectedCartItems[0];

  app.innerHTML = `
    <section class="panel scene-panel">
      ${renderSceneHeader(chapter, event)}
      <div class="scene-stack">
        <div class="device-shell phone-shell">
          <div class="device-status">
            <span>15:0${session.stageIndex + 1}</span>
            <span>4G · 5G · 40%</span>
          </div>
          <div class="phone-topbar">
            <button class="icon-button" type="button">←</button>
            <div class="search-pill">${draft.currentStep === 'menu' ? '搜一搜' : screen.topNotice}</div>
            <span class="top-icon">···</span>
          </div>
          ${
            draft.currentStep === 'menu'
              ? renderPhoneMenuScreen(screen, draft, selectedMainDish)
              : renderPhoneCheckoutScreen(chapter, event, draft, summary)
          }
        </div>

        <aside class="footnote-card scene-footnote">
          <p class="section-label">${draft.currentStep === 'menu' ? '本幕背景' : '当前场景'}</p>
          <p>${draft.currentStep === 'menu' ? chapter.intro : event.scene}</p>
        </aside>
      </div>
    </section>
  `;

  bindPhoneOrderHandlers();
}

function renderPhoneMenuScreen(screen, draft, selectedMainDish) {
  return `
    <div class="phone-screen menu-screen">
      <div class="shop-header">
        <div class="shop-avatar">${screen.shop.name.slice(0, 3)}</div>
        <div>
          <h3>${screen.shop.name}</h3>
          <p>${screen.shop.rating} 分 · 月售 ${screen.shop.monthlySales} · ${screen.shop.eta}</p>
          <p class="muted">${screen.shop.serviceTags.join(' · ')}</p>
        </div>
      </div>

      <div class="promo-strip">${screen.shop.promoText}</div>

      <div class="menu-tabs">
        <span class="menu-tab active">点餐</span>
        <span class="menu-tab">评价</span>
        <span class="menu-tab">商家</span>
      </div>

      ${screen.menuSections
        .map(
          (section) => `
            <section class="menu-section-card">
              <div class="menu-section-header">
                <h4>${section.title}</h4>
                <span>${section.accent}</span>
              </div>
              <div class="menu-card-grid">
                ${section.items
                  .map(
                    (item) => `
                      <button
                        class="menu-card ${draft.selectedMenuItemIds.includes(item.id) ? 'selected' : ''}"
                        data-menu-item-id="${item.id}"
                        type="button"
                      >
                        <div class="menu-card-image">
                          <span class="menu-badge">${item.badge}</span>
                          <div class="dish-bowl">${item.name.slice(0, 2)}</div>
                        </div>
                        <div class="menu-card-body">
                          <h5>${item.name}</h5>
                          <p>${item.subtitle}</p>
                          <div class="menu-price-row">
                            <strong>¥${item.price}</strong>
                            <span>¥${item.originalPrice}</span>
                          </div>
                        </div>
                      </button>
                    `
                  )
                  .join('')}
              </div>
            </section>
          `
        )
        .join('')}
    </div>
    <div class="device-footer">
      <div class="cart-footer-copy">
        <span>券后约 ${screen.orderPreview.totalLabel.replace('券后约 ', '')}</span>
        <strong>${selectedMainDish.title}</strong>
      </div>
      <button class="device-cta" data-action="to-checkout" type="button">去确认订单</button>
    </div>
  `;
}

function renderPhoneCheckoutScreen(chapter, event, draft, summary) {
  const screen = event.screen;

  return `
    <div class="phone-screen checkout-screen">
      <div class="checkout-notice">${screen.topNotice}</div>

      <section class="checkout-address-card">
        <p class="checkout-address-title">请选择收货地址</p>
        <h3>${summary.addressText}</h3>
        <p>${chapter.subtitle}</p>
      </section>

      <div class="checkout-delivery-row">
        <div class="delivery-box active">
          <strong>${screen.orderPreview.deliveryMode}</strong>
          <span>${screen.orderPreview.eta}</span>
        </div>
        <div class="delivery-box">
          <strong>预约配送</strong>
          <span>选择时间</span>
        </div>
      </div>

      <section class="keyword-section">
        <div class="keyword-section-header">
          <h4>收货地址关键词</h4>
          <span>点选补全地址</span>
        </div>
        ${renderKeywordGroups(screen.addressKeywords, draft.selectedAddressKeywordIds, 'address')}
      </section>

      <section class="keyword-section">
        <div class="keyword-section-header">
          <h4>备注关键词</h4>
          <span>${summary.noteText}</span>
        </div>
        ${renderKeywordGroups(screen.noteKeywords, draft.selectedNoteKeywordIds, 'note')}
      </section>

      <section class="cart-summary-card">
        <div class="cart-summary-header">
          <h4>${screen.shop.name}</h4>
          <span>${screen.shop.serviceTags[0]}</span>
        </div>
        ${summary.selectedCartItems
          .map(
            (item) => `
              <div class="cart-row">
                <div>
                  <strong>${item.title}</strong>
                  <p>x ${item.quantity}</p>
                </div>
                <div class="cart-price">
                  <strong>¥${item.price}</strong>
                  ${item.originalPrice ? `<span>¥${item.originalPrice}</span>` : ''}
                </div>
              </div>
            `
          )
          .join('')}
        <div class="cart-fee-row">
          <span>打包费</span>
          <span>¥${screen.orderPreview.packagingFee}</span>
        </div>
        <div class="cart-fee-row">
          <span>配送费</span>
          <span>
            ${
              screen.orderPreview.deliveryFee.original !== screen.orderPreview.deliveryFee.current
                ? `<em>¥${screen.orderPreview.deliveryFee.original}</em>`
                : ''
            }
            ¥${screen.orderPreview.deliveryFee.current}
          </span>
        </div>
        ${screen.orderPreview.discountRows
          .map(
            (row) => `
              <div class="cart-fee-row accent">
                <span>${row.label}</span>
                <span>${row.value}</span>
              </div>
            `
          )
          .join('')}
        <div class="cart-total-row">
          <span>合计</span>
          <strong>${screen.orderPreview.totalLabel}</strong>
        </div>
      </section>

      <section class="comm-card">
        <p class="section-label">${screen.commPrompt.channel}</p>
        <h4>${screen.commPrompt.title}</h4>
        <p>${screen.commPrompt.message}</p>
        <p class="comm-hint">${screen.commPrompt.hint}</p>
      </section>

      <section class="phone-choice-sheet">
        <div class="keyword-section-header">
          <h4>你怎么回应</h4>
          <span>这些选项会叠加你刚写好的地址与备注</span>
        </div>
        <div class="choice-list compact-choice-list">
          ${event.choices
            .map(
              (option) => `
                <button class="choice-button app-choice-button" data-choice-id="${option.id}" type="button">
                  <span class="choice-label">${option.text}</span>
                  <span class="choice-after">${option.commentary}</span>
                </button>
              `
            )
            .join('')}
        </div>
      </section>
    </div>
    <div class="device-footer">
      <div class="cart-footer-copy">
        <span>${screen.orderPreview.totalLabel}</span>
        <strong>${screen.orderPreview.payLabel}</strong>
      </div>
      <button class="device-cta subtle" data-action="back-to-menu" type="button">返回菜品页</button>
    </div>
  `;
}

function renderKeywordGroups(groups, selectedIds, kind) {
  const selectedSet = new Set(selectedIds);

  return groups
    .map(
      (group) => `
        <div class="keyword-group">
          <p class="keyword-group-label">${group.label}</p>
          <div class="keyword-chip-row">
            ${group.keywords
              .map(
                (keyword) => `
                  <button
                    type="button"
                    class="keyword-chip ${selectedSet.has(keyword.id) ? 'selected' : ''}"
                    data-keyword-kind="${kind}"
                    data-group-id="${group.id}"
                    data-keyword-id="${keyword.id}"
                  >
                    ${keyword.text}
                  </button>
                `
              )
              .join('')}
          </div>
        </div>
      `
    )
    .join('');
}

function renderLockerSceneEvent(chapter, event) {
  const screen = event.screen;
  const backgroundStyle = screen.backgroundImage
    ? `style="--locker-art:url('${screen.backgroundImage}')"`
    : '';

  app.innerHTML = `
    <section class="panel scene-panel">
      ${renderSceneHeader(chapter, event)}
      <div class="scene-stack">
        <div class="locker-shell" ${backgroundStyle}>
          <div class="locker-canvas ${screen.backgroundImage ? 'with-art' : 'no-art'}">
            <div class="locker-overlay">
              <div class="locker-topbar">
                <span>${screen.overlay.time}</span>
                <span>${screen.overlay.weather}</span>
                <span class="locker-tag">${screen.overlay.statusTag}</span>
              </div>
              <div class="locker-main">
                <p class="section-label">${screen.overlay.location}</p>
                <h3>${screen.overlay.headline}</h3>
                <p>${screen.overlay.primaryStatus}</p>
                <p class="locker-secondary">${screen.overlay.secondaryStatus}</p>
              </div>
              <div class="locker-hints">
                ${screen.evidenceHints
                  .map((hint) => `<span class="hint-pill">${hint}</span>`)
                  .join('')}
              </div>
            </div>
          </div>

          <div class="locker-action-sheet">
            <div class="keyword-section-header">
              <h4>${screen.actionLabel}</h4>
              <span>${event.kicker}</span>
            </div>
            <div class="choice-list">
              ${event.choices
                .map(
                  (option) => `
                    <button class="choice-button locker-choice-button" data-choice-id="${option.id}" type="button">
                      <span class="choice-label">${option.text}</span>
                      <span class="choice-after">${option.commentary}</span>
                    </button>
                  `
                )
                .join('')}
            </div>
          </div>
        </div>

        <aside class="footnote-card scene-footnote">
          <p class="section-label">现场说明</p>
          <p>${event.scene}</p>
        </aside>
      </div>
    </section>
  `;

  bindChoiceHandlers();
}

function renderStageSummary() {
  const chapter = getCurrentChapter();
  const report = session.stageReports.at(-1);

  app.innerHTML = `
    <section class="panel">
      <p class="section-label">${chapter.label}结算</p>
      <h2>${chapter.title}</h2>
      <div class="summary-banner">
        <span class="summary-tag">${report.tone}</span>
        <p>${report.summary}</p>
      </div>
      <div class="summary-grid">
        <article class="info-card">
          <p class="section-label">这一幕发生了什么</p>
          <h3>${chapter.summary.title}</h3>
          <p>${chapter.summary.body}</p>
        </article>
        <article class="info-card">
          <p class="section-label">你的处理方式</p>
          <p>${getRecentChoices(chapter).join('、')}</p>
        </article>
      </div>
      <button class="primary-button" data-action="continue" type="button">
        进入下一幕
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

      <button class="primary-button" data-action="continue" type="button">再来一局</button>
    </section>
  `;

  app
    .querySelector('[data-action="continue"]')
    .addEventListener('click', onContinue);
}

function renderSceneHeader(chapter, event) {
  return `
    <div class="progress-row">
      <div>
        <p class="section-label">${chapter.label}</p>
        <h2>${chapter.title}</h2>
        <p class="muted">${chapter.subtitle}</p>
      </div>
      <div class="progress-chip">${event.sceneType === 'phone_order' ? '手机界面' : '柜机现场'}</div>
    </div>
    <article class="scene-card">
      <p class="scene-kicker">${event.kicker}</p>
      <h3>${event.title}</h3>
      <p>${event.scene}</p>
    </article>
  `;
}

function bindPhoneOrderHandlers() {
  app.querySelectorAll('[data-menu-item-id]').forEach((button) => {
    button.addEventListener('click', () => selectMenuItem(button.dataset.menuItemId));
  });

  app.querySelectorAll('[data-keyword-id]').forEach((button) => {
    button.addEventListener('click', () =>
      toggleKeyword(
        button.dataset.keywordKind,
        button.dataset.groupId,
        button.dataset.keywordId
      )
    );
  });

  app.querySelectorAll('[data-choice-id]').forEach((button) => {
    button.addEventListener('click', () => onChoose(button.dataset.choiceId));
  });

  const toCheckout = app.querySelector('[data-action="to-checkout"]');
  if (toCheckout) {
    toCheckout.addEventListener('click', () => setPhoneStep('checkout'));
  }

  const backToMenu = app.querySelector('[data-action="back-to-menu"]');
  if (backToMenu) {
    backToMenu.addEventListener('click', () => setPhoneStep('menu'));
  }
}

function bindChoiceHandlers() {
  app.querySelectorAll('[data-choice-id]').forEach((button) => {
    button.addEventListener('click', () => onChoose(button.dataset.choiceId));
  });
}

function getRecentChoices(chapter) {
  return session.history
    .slice(-chapter.events.length)
    .map((item) => item.label);
}

render();
