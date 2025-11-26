function colorToRgba(color) {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    const a = color.a ?? 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

module.exports = {
    colorToRgba
};