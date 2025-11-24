const fs = require("fs");
const path = require("path");

function saveJson(data, filename = "file.json") {
  const scratchDir = path.join(__dirname, "..", "scratch");
  const filePath = path.join(scratchDir, filename);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Saved JSON to:", filePath);
}

module.exports = saveJson;