const file_helper = require('./file_helper');
let fileName;
let $;

const initDom = (fileFileName) => {
    fileName = fileFileName;
    $ = file_helper.getHtmlContent(fileName);
}

const getDom = () => {
    return $;
}

const saveDom = () => {
    file_helper.saveHtmlContent(fileName, $.html());
}

module.exports = {
    initDom,
    getDom,
    saveDom
}
