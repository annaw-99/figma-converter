const typographyStyles = require("./styles/typography");
const layoutStyles = require("./styles/layout");
const backgroundStyles = require("./styles/background");
const borderStyles = require("./styles/border");
const sizingStyles = require("./styles/sizing");
const positionStyles = require("./styles/position");

function convert(document) {
    const cssRules = [];
    
    cssRules.push(`* {
    box-sizing: border-box;
}`);

    const canvas = document.children ? document.children[0] : document;
    backgroundStyles.canvas(canvas, cssRules);

    const frames = canvas.children || [];
    const body = frames
        .map(frame => nodeToHtml(frame, cssRules, null))
        .join("\n");

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(canvas.name)}</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    ${body}
</body>

</html>`;

    const css = cssRules.join("\n\n");
    return { html, css };
}

function nodeToHtml(node, cssRules, parentBox) {
    if (!node) return "";

    const cls = classFor(node);
    
    if (node.type === "TEXT") {
        const text = escapeHtml(node.characters || "");
        typographyStyles(node, cls, cssRules);
        sizingStyles(node, cls, cssRules);
        positionStyles(node, cls, cssRules, parentBox);
        return `<p class="${cls}" data-id="${node.id}">${text}</p>`;
    }

    if (node.type === "FRAME") {
        layoutStyles(node, cls, cssRules);
    }

    backgroundStyles.node(node, cls, cssRules);
    borderStyles(node, cls, cssRules);
    sizingStyles(node, cls, cssRules);
    positionStyles(node, cls, cssRules, parentBox);

    const currentBox = node.absoluteBoundingBox || parentBox;

    if (node.children && node.children.length > 0) {
        const childrenHtml = node.children
            .map(child => nodeToHtml(child, cssRules, currentBox))
            .join("\n");
        return `<div class="${cls}" data-type="${node.type}" data-id="${node.id}">
        ${childrenHtml}
    </div>`;
    }

    return `<div class="${cls}" data-type="${node.type}" data-id="${node.id}"></div>`;
}

function classFor(node) {
    return `n-${node.id.replace(/:/g, "-")}`;
}

function escapeHtml(str = "") {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

module.exports = convert;