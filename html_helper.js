let cheerio = require('cheerio');
let fs = require('fs');

let saveHtmlContent = (fileName, contents) => {
    fs.writeFileSync(fileName, contents);
}

let getHtmlContent = (fileName) => {
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
