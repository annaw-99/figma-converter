const { colorToRgba } = require('./utils');

function borderStyles(node, cls, cssRules) {
    const styles = [];
    
    if (node.strokes && node.strokes.length > 0) {
        const stroke = node.strokes.find(s => s.type === "SOLID" && s.visible !== false);
        if (stroke && stroke.color) {
            const weight = node.strokeWeight ?? 1;
            styles.push(`border: ${weight}px solid ${colorToRgba(stroke.color)};`);
        }
    }
    
    if (node.cornerRadius != null) {
        styles.push(`border-radius: ${node.cornerRadius}px;`);
    } else if (node.rectangleCornerRadii) {
        const [tl, tr, br, bl] = node.rectangleCornerRadii;
        styles.push(`border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`);
    }
    
    if (styles.length > 0) {
        cssRules.push(`
.${cls} {
    ${styles.join("\n    ")}
}
        `.trim());
    }
}

module.exports = borderStyles;