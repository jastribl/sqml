const cheerio = require('cheerio');
const fs = require('fs');

const saveHtmlContent = (fileName, contents) => {
    fs.writeFileSync(fileName, contents);
}

const getHtmlContent = (fileName) => {
    if (!fs.existsSync(fileName)) {
        saveHtmlContent(fileName, "<!DOCTYPE html><html><body></body></html>");
    }
    var contents = fs.readFileSync('./test.html', 'utf8').toString();
    return cheerio.load(contents);
}

module.exports = {
    saveHtmlContent: saveHtmlContent,
    getHtmlContent: getHtmlContent
}
