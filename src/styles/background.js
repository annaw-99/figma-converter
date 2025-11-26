const { colorToRgba } = require('./utils');

function backgroundStyles(node, cls, cssRules) {
    const fillsArray = node.fills || node.background || [];
    if (fillsArray.length === 0) return;
    
    const fill = fillsArray[0];
    const style = getFillStyle(fill);
    
    if (style) {
        cssRules.push(`
.${cls} {
    ${style}
}
        `.trim());
    }
}

function canvasStyles(canvas, cssRules) {
    if (!canvas.backgroundColor) return;

    cssRules.push(`
body {
    background-color: ${colorToRgba(canvas.backgroundColor)};
}
    `.trim());
}

function getFillStyle(fill) {
    if (fill.type === "SOLID") {
        return `background-color: ${colorToRgba(fill.color)};`;
    }
    if (fill.type === "GRADIENT_LINEAR") {
        return linearGradient(fill);
    }
    if (fill.type === "GRADIENT_RADIAL") {
        return radialGradient(fill);
    }
    return null;
}

function linearGradient(fill) {
    const [start, end] = fill.gradientHandlePositions;
    const angle = Math.round(90 - Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI));
    const stops = fill.gradientStops.map(s => `${colorToRgba(s.color)} ${Math.round(s.position * 100)}%`).join(', ');
    return `background: linear-gradient(${angle}deg, ${stops});`;
}

function radialGradient(fill) {
    const stops = fill.gradientStops.map(s => `${colorToRgba(s.color)} ${Math.round(s.position * 100)}%`).join(', ');
    return `background: radial-gradient(circle, ${stops});`;
}

module.exports = {
    node: backgroundStyles,
    canvas: canvasStyles
};