function layoutStyles(node, cls, cssRules) {
    if (node.type !== "FRAME") return;
    if (!node.layoutMode) return;
    
    const styles = [];
    
    if (node.layoutMode === "HORIZONTAL") {
        styles.push("display: flex;");
    } else if (node.layoutMode === "VERTICAL") {
        styles.push("display: flex;");
        styles.push("flex-direction: column;");
    }
    
    if (node.itemSpacing != null && node.itemSpacing !== 0) {
        styles.push(`gap: ${node.itemSpacing}px;`);
    }
    
    const padding = getPadding(node);
    if (padding) {
        styles.push(padding);
    }
    
    const alignItems = getAlignItems(node.counterAxisAlignItems);
    if (alignItems) {
        styles.push(alignItems);
    }
    
    const justifyContent = getJustifyContent(node.primaryAxisAlignItems);
    if (justifyContent) {
        styles.push(justifyContent);
    }
        
    if (styles.length > 0) {
        cssRules.push(`
.${cls} {
    ${styles.join("\n    ")}
}
        `.trim());
    }
}

function getPadding(node) {
    if (node.paddingLeft == null && node.paddingRight == null && 
        node.paddingTop == null && node.paddingBottom == null) {
        return null;
    }
    
    const pt = node.paddingTop ?? 0;
    const pr = node.paddingRight ?? 0;
    const pb = node.paddingBottom ?? 0;
    const pl = node.paddingLeft ?? 0;
    
    if (pt === 0 && pr === 0 && pb === 0 && pl === 0) {
        return null;
    }
    
    return `padding: ${pt}px ${pr}px ${pb}px ${pl}px;`;
}

function getAlignItems(alignment) {
    if (alignment === "CENTER") return "align-items: center;";
    if (alignment === "MIN") return "align-items: flex-start;";
    if (alignment === "MAX") return "align-items: flex-end;";
    return null;
}

function getJustifyContent(alignment) {
    if (alignment === "CENTER") return "justify-content: center;";
    if (alignment === "MIN") return "justify-content: flex-start;";
    if (alignment === "MAX") return "justify-content: flex-end;";
    if (alignment === "SPACE_BETWEEN") return "justify-content: space-between;";
    return null;
}

module.exports = layoutStyles;