import { createPhoneOrderDraft } from './gameRuntime.js';

export function createEventUiState(event) {
  if (event.sceneType === 'phone_order') {
    return {
      phoneDraft: createPhoneOrderDraft(event)
    };
  }

  return {};
}

export function getPostChoiceTransition(chapters, stageIndex, eventIndex) {
  const currentChapter = chapters[stageIndex];
  const isLastEvent = eventIndex === currentChapter.events.length - 1;
  const isLastChapter = stageIndex === chapters.length - 1;

  if (!isLastEvent) {
    return {
      screen: 'event',
      stageIndex,
      eventIndex: eventIndex + 1
    };
  }

  if (isLastChapter) {
    return {
      screen: 'ending',
      stageIndex,
      eventIndex
    };
  }

  return {
    screen: 'stage-summary',
    stageIndex,
    eventIndex
  };
}
