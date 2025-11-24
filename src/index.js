require('dotenv').config();
const fs = require("fs");
const saveJson = require("./saveJson");
const convertToHtml = require("./convert");

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

function getPage(data) {
    const pages = data.document.children;
    if (!pages || pages.length === 0) return null;

    const firstPage = pages[0];
    const nodes = firstPage.children || [];

    return nodes.find(n => n.type === "FRAME") || null;
}

function loadCache() {
    if (!fs.existsSync("scratch/file.json")) return null;
    return JSON.parse(fs.readFileSync("scratch/file.json", "utf8"));
}

async function fetchFile(key) {
    let data = loadCache();
    if (data) {
        console.log("Using", data.name);
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

    const root = getPage(data);  
    if (!root) {
        console.error("No Page found.");
        process.exit(1);
    }

    const html = convertToHtml(root);
    fs.writeFileSync("scratch/index.html", html);
}

fetchFile(fileKey);