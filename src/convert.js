// function: main
function convertToHtml(rootFrame) {
    const body = nodeToHtml(rootFrame);

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${escapeHtml(rootFrame.name)}</title>
</head>
<body>
    ${body}
</body>
</html>`;
}

// function: convert to HTML
function nodeToHtml(node) {
  if (!node) return "";

  if (node.type === "TEXT") {
    const text = escapeHtml(node.characters || "");
    return `
    <p data-id="${node.id}">${text}</p>`;
  }

  if (node.children && node.children.length > 0) {
    const childrenHtml = node.children.map(nodeToHtml).join("\n");
    return `
    <div data-type="${node.type}" data-id="${node.id}" data-name="${escapeHtml(node.name)}">
        ${childrenHtml}
    </div>`;
  }
  return `<div data-type="${node.type}" data-id="${node.id}" data-name="${escapeHtml(node.name)}"></div>`;
}

// function: to prevent special char during conversion
function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = convertToHtml;