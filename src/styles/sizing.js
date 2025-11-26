function sizingStyles(node, cls, cssRules) {
    if (!node.absoluteBoundingBox) return;
    
    const hasCenterStroke = node.strokeAlign === "CENTER" && node.strokes && 
        node.strokes.length > 0 &&(node.strokeWeight ?? 0) > 0;
    
    const sizeBox = hasCenterStroke && node.absoluteRenderBounds 
        ? node.absoluteRenderBounds 
        : node.absoluteBoundingBox;
    
    const { width, height } = sizeBox;
    const w = Math.round(width);
    const h = Math.round(height);

    const widthStyle = getWidthStyle(node, w);
    const heightStyle = getHeightStyle(node, h);

    cssRules.push(`
.${cls} {
    ${widthStyle}
    ${heightStyle}
}
    `.trim());
}

function getWidthStyle(node, width) {
    if (node.type === "TEXT" && node.style?.textAutoResize === "WIDTH_AND_HEIGHT") {
        return "width: fit-content;";
    }
    
    const layoutHorizontal = node.layoutSizingHorizontal;
    if (layoutHorizontal === "FILL") return "width: 100%;";
    
    return `width: ${width}px;`;
}

function getHeightStyle(node, height) {
    const layoutVertical = node.layoutSizingVertical;
    if (layoutVertical === "HUG") return `min-height: ${height}px;`;
    if (layoutVertical === "FILL") return "height: 100%;";
    
    return `height: ${height}px;`;
}

module.exports = sizingStyles;