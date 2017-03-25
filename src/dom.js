const html_helper = require('./html_helper');
let fileName;
let $;

const initDom = (fileFileName) => {
    fileName = fileFileName;
    refreshDom();
}

const refreshDom = () => {
    $ = html_helper.getHtmlContent(fileName);
}

const getDom = () => {
    return $;
}

const saveDom = () => {
    html_helper.saveHtmlContent(fileName, $.html());
}

module.exports = {
    initDom,
    refreshDom,
    getDom,
    saveDom
}
