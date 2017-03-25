const cheerio = require('cheerio');
const file_helper = require('./src/file_helper');
const {Schema} = require('./src/schema');
const {TABLES} = require('./src/tables');
const {initDom, refreshDom, getDom, saveDom} = require('./src/dom');
const {TableGenerator} = require('./src/TableGenerator');

const initSync = (htmlFile) => {
    initDom(htmlFile);
    let $ = getDom();
    let localTablesMap = new Map();
    $('table').each((tableIndex, table) => {
        table = $(table);
        let tableName = table.attr('id').substring(1);
        let headers = [];
        table.find('thead > tr > th').each((headerIndex, header) => {
            header = $(header);
            headers.push(header.text());
        })
        localTablesMap.set(tableName, headers)
    });
    console.log("localTablesMap:", localTablesMap.keys());

    let schema = new Schema('test_table', {'name': String, 'age': Number})
    TABLES.set(schema.tableName, schema);

    for (let [key, schema] of TABLES) {
        if (!localTablesMap.has(schema.tableName)) {
            $('body').append(new TableGenerator(schema).tableTag());
        }
    }
    saveDom();
}

module.exports = {
    initSync,
    Schema
}
