require('dotenv').config();
const fs = require("fs");
const saveJson = require("./saveJson");
const convert = require("./convert");

const FIGMA_API_URL = "https://api.figma.com/v1";
const input = process.argv[2];

if (!input) {
    console.error("Provide a Figma file key or URL.");
    process.exit(1);
}

function extractKey(str) {
    const match = str.match(/figma\.com\/design\/([a-zA-Z0-9]+)/);
    return match ? match[1] : str; 
}

const fileKey = extractKey(input);

function loadCache() {
    if (!fs.existsSync("scratch/file.json")) return null;
    return JSON.parse(fs.readFileSync("scratch/file.json", "utf8"));
}

async function fetchFile(key) {
    let data = loadCache();
    if (data) {
        console.log("Using Cached File");
    } else {
        const res = await fetch(`${FIGMA_API_URL}/files/${key}`, {
            headers: {
                "X-Figma-Token": process.env.FIGMA_TOKEN,
            },
        });

        if (!res.ok) {
            console.error("Error:", res.status, await res.text());
            process.exit(1);
        }

        data = await res.json();
        console.log("File Name:", data.name);
        saveJson(data);
    }

    const { html, css } = convert(data.document);
    fs.writeFileSync("scratch/index.html", html);
    fs.writeFileSync("scratch/styles.css", css);
}

fetchFile(fileKey);