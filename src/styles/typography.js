const { colorToRgba } = require('./utils');

function typographyStyles(node, cls, cssRules) {
    const style = node.style || {};
    const styles = [];

    styles.push(`font-size: ${style.fontSize}px;`);
    styles.push(`font-weight: ${style.fontWeight};`);

    if (style.fontFamily) {
        styles.push(`font-family: "${style.fontFamily}", sans-serif;`);
    }

    if (style.lineHeightPx) {
        styles.push(`line-height: ${style.lineHeightPx}px;`);
    }

    styles.push(`letter-spacing: ${style.letterSpacing}px;`);

    if (node.fills && node.fills[0] && node.fills[0].color) {
        styles.push(`color: ${colorToRgba(node.fills[0].color)};`);
    }

    const align = style.textAlignHorizontal?.toLowerCase() || "left";
    styles.push(`text-align: ${align};`);

    styles.push(`margin: 0;`);

    if (style.textDecoration) {
        styles.push(`text-decoration: ${style.textDecoration.toLowerCase()};`);
    }

    if (style.textCase) {
        const textCase = style.textCase.toLowerCase().replace('_', '-');
        styles.push(`text-transform: ${textCase};`);
    }

    cssRules.push(`
.${cls} {
    ${styles.join('\n    ')}
}
    `.trim());
}

module.exports = typographyStyles;