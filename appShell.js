export function getDocumentMeta(projectCopy) {
  return {
    title: projectCopy.title,
    description: projectCopy.oneLiner
  };
}

export function renderSiteHeader(projectCopy, options = {}) {
  const compactClass = options.compact ? ' site-header-compact' : '';
  const intro = options.compact ? projectCopy.subtitle : projectCopy.subtitle;

  return `
    <header class="site-header${compactClass}">
      <p class="eyebrow">${projectCopy.eyebrow}</p>
      <h1>${projectCopy.title}</h1>
      <p class="site-intro">${intro}</p>
    </header>
  `;
}

export function syncDocumentMeta(projectCopy) {
  const meta = getDocumentMeta(projectCopy);
  document.title = meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', meta.description);
  }
}
