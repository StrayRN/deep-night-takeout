import { STAT_DEFS } from './gameData.js';

const STAT_KEYS = STAT_DEFS.map((item) => item.id);

export function createPhoneOrderDraft(event) {
  return {
    currentStep: event.screen.stepOrder[0] ?? 'menu',
    selectedMenuItemIds: getDefaultMenuItems(event),
    selectedAddressKeywordIds: getDefaultKeywordIds(event.screen.addressKeywords),
    selectedNoteKeywordIds: getDefaultKeywordIds(event.screen.noteKeywords)
  };
}

export function buildPhoneOrderDraftSummary(event, draft) {
  const selectedAddressKeywords = resolveKeywords(
    event.screen.addressKeywords,
    draft.selectedAddressKeywordIds
  );
  const selectedNoteKeywords = resolveKeywords(
    event.screen.noteKeywords,
    draft.selectedNoteKeywordIds
  );
  const cartItems = resolveCartItems(event, draft);

  return {
    selectedAddressKeywords,
    selectedNoteKeywords,
    selectedCartItems: cartItems,
    addressText:
      selectedAddressKeywords.map((item) => item.text).join(' / ') || '请选择收货地址',
    noteText:
      selectedNoteKeywords.map((item) => item.text).join('；') ||
      '可向商家 / 骑手提出送餐与配送需求',
    keywordEffects: mergeEffects(
      ...selectedAddressKeywords.map((item) => item.effects),
      ...selectedNoteKeywords.map((item) => item.effects)
    )
  };
}

export function createResolvedChoice(event, choice, draft) {
  const summary = buildPhoneOrderDraftSummary(event, draft);

  return {
    id: choice.id,
    label: choice.text,
    effect: mergeEffects(summary.keywordEffects, choice.effects),
    commentary: `${choice.commentary} 当前地址：${summary.addressText}；备注：${summary.noteText}`
  };
}

export function mergeEffects(...effectsList) {
  const merged = emptyEffects();

  for (const effect of effectsList) {
    if (!effect) {
      continue;
    }

    for (const key of STAT_KEYS) {
      merged[key] += Number(effect[key] ?? 0);
    }
  }

  return merged;
}

function emptyEffects() {
  return Object.fromEntries(STAT_KEYS.map((key) => [key, 0]));
}

function getDefaultMenuItems(event) {
  const mainItem = event.screen.cartPreset.find((item) => item.slot === 'main');
  return mainItem ? [mainItem.menuItemId] : [];
}

function getDefaultKeywordIds(groups = []) {
  return groups.flatMap((group) =>
    group.keywords
      .filter((keyword) => keyword.defaultSelected)
      .map((keyword) => keyword.id)
  );
}

function resolveKeywords(groups = [], selectedIds = []) {
  const keywordMap = new Map(
    groups.flatMap((group) => group.keywords.map((keyword) => [keyword.id, keyword]))
  );

  return selectedIds
    .map((keywordId) => keywordMap.get(keywordId))
    .filter(Boolean);
}

function resolveCartItems(event, draft) {
  const menuItems = event.screen.menuSections.flatMap((section) => section.items);
  const selectedMainId = draft.selectedMenuItemIds[0];
  const selectedMainItem =
    menuItems.find((item) => item.id === selectedMainId) ?? menuItems[0];

  return event.screen.cartPreset.map((item) => {
    if (item.slot === 'main') {
      return {
        id: selectedMainItem.id,
        title: selectedMainItem.name,
        subtitle: selectedMainItem.subtitle,
        price: selectedMainItem.price,
        originalPrice: selectedMainItem.originalPrice,
        quantity: item.quantity
      };
    }

    return {
      id: item.id,
      title: item.title,
      subtitle: item.subtitle ?? '',
      price: item.price,
      originalPrice: item.originalPrice ?? null,
      quantity: item.quantity
    };
  });
}
