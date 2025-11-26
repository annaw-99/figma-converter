## Figma Converter

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your Figma API token (requires **files** scope).
```
FIGMA_TOKEN=your_figma_token_here
```

3. Create a folder named `scratch`: This will store the generated `scratch/index.html` and `scratch/styles.css` files (and the `file.json` file to avoid repeated API calls).

### How to Run

Run the complier with a Figma file key or URL:

```bash
node src/index.js <figma-key-or-url>
```

ex:
```bash
node src/index.js https://www.figma.com/design/abc123xyz/file-name
# or
node src/index.js abc123xyz
```

### Limitations
1. No Responsive Design: everything uses fixed pixel sizes from Figma
2. Gradients: wasn't able replicate effects for angular and diamond gradients
3. No images: can't convert image fills and nodes
4. No effects: shadows, blurs, etc
5. Vectors/icons: complex vector shapes aren't converted (only basic rectangles with fills/strokes)
6. No plugins: Figma plugins and their effects aren't converted
