const cheerio = require('cheerio');
const file_helper = require('./src/file_helper');
const NAME_TO_SCHEMA_MAP = require('./src/name_to_schema_map');
const {Schema} = require('./src/schema')

const initSync = (htmlFile) => {
    let $ = file_helper.getHtmlContent(htmlFile);
    let localTablesMap = new Map();
    $('table').each((tableIndex, table) => {
        table = $(table);
        let tableName = table.attr('id');
        let headers = [];
        table.find('thead > tr > th').each((headerIndex, header) => {
            header = $(header);
            headers.push(header.text());
        })
        localTablesMap.set(tableName, headers)
    });
    console.log("localTablesMap:", localTablesMap);

    let schema = new Schema('test_table', {'name': String, 'age': Number})
    NAME_TO_SCHEMA_MAP.set(schema.tableName, schema);

    for (let [key, schema] of NAME_TO_SCHEMA_MAP) {
        if (!localTablesMap.has(schema.tableName)) {
            let headers = '';
            console.log(schema.columns);
            for (let columnName of Array.from(schema.columns)) {
                headers += `<td>${columnName}</td>`;
            }
            $('body').append(`<table id="#${schema.tableName}"><thead><tr>${headers}</tr></thead><tbody></tbody></table>`);
        }
    }
    file_helper.saveHtmlContent('./test.html', $.html());
}

module.exports = {
    NAME_TO_SCHEMA_MAP: NAME_TO_SCHEMA_MAP,
    registerSchema: () => {
        console.log('registering schema');
    },
    initSync: initSync,
    helloWorld: () => {
        console.log('Hello World!');
    }
}
