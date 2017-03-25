const cheerio = require('cheerio');
const fs = require('fs');
const pretty = require('pretty');

const saveHtmlContent = (fileName, contents) => {
    fs.writeFileSync(fileName, contents);
}

const style = `<style>
    html, body {
        font-family: Comic Sans MS;
    }
    th, td {
        border: 0.1px solid black;
    }
    </style>`

const getHtmlContent = (fileName) => {
    if (!fs.existsSync(fileName)) {
        saveHtmlContent(fileName, pretty(`<!DOCTYPE html><html><head>${style}</head><body></body></html>`));
    }
    const contents = fs.readFileSync(fileName, 'utf8').toString();
    return cheerio.load(contents);
}

module.exports = { saveHtmlContent, getHtmlContent }
