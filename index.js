const cheerio = require('cheerio');
const file_helper = require('./src/file_helper');
const {Schema} = require('./src/schema');
const {TABLES} = require('./src/tables');
const {initDom, refreshDom, getDom, saveDom} = require('./src/dom');
const {TableGenerator} = require('./src/TableGenerator');
const _ = require('lodash');

const initSync = (htmlFile) => {
    initDom(htmlFile);
    let $ = getDom();
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

    localTablesMap.forEach((headers, table_name) => {
        let schema = TABLES.get(table_name);

        if (!_.isEqual(headers, schema.columns)) {
            $(`#${schema.tableName} > thead`).replaceWith(new TableGenerator(schema).tableHeaderTag());
            
            $(`#${schema.tableName} > tbody > tr`).each((rowIndex, row) => {
                let rowObject = {};
                rowObject.id = $(row).data('id');

                $(row).find('td').each((cellIndex, cell) => {
                    cell = $(cell);
                    rowObject[cell.data('column')] = cell.text();
                });
                $(row).replaceWith(new TableGenerator(schema).tableRow(rowObject));
            });
        }
    });

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
