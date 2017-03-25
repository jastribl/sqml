const cheerio = require('cheerio');
const file_helper = require('./src/file_helper');
const NAME_TO_SCHEMA_MAP = require('./src/name_to_schema_map');
const {Schema} = require('./src/schema')
const {TABLES} = require('./src/tables');

const initSync = (htmlFile) => {
    let $ = file_helper.getHtmlContent(htmlFile);
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
            let headers = '';
            console.log(schema.columns);
            for (let columnName of Array.from(schema.columns)) {
                headers += `<th>${columnName}</th>`;
            }
            $('body').append(`<table id="#${schema.tableName}"><thead><tr>${headers}</tr></thead><tbody></tbody></table>`);
        }
    }
    file_helper.saveHtmlContent('./test.html', $.html());
}

module.exports = {
    initSync: initSync,
    Schema: Schema
}
