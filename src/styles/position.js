function positionStyles(node, cls, cssRules, parentBox) {
    if (!node.absoluteBoundingBox) return;

    const { x, y } = node.absoluteBoundingBox;
    const left = parentBox ? Math.round(x - parentBox.x) : Math.round(x);
    const top = parentBox ? Math.round(y - parentBox.y) : Math.round(y);

    cssRules.push(`
.${cls} {
    position: absolute;
    left: ${left}px;
    top: ${top}px;
}
    `.trim());
}

module.exports = positionStyles;