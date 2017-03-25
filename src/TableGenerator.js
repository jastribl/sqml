const {Schema} = require('./schema');
const pretty = require('pretty');

class TableGenerator {
  constructor(schema) {
    this.schema = schema;
  }

  columnTags() {
    return this.schema.columns.map(column => `<th>${column}</th>`).join('\n');
  }

  tableHeaderTag() {
    return `<thead><tr>${this.columnTags()}</tr></thead>`
  }


  tableTag(isPretty = false) {
    const table = `<table id="${this.schema.tableName}">${this.tableHeaderTag()}<tbody></tbody></table>`
    return isPretty ? pretty(table) : table;
  }

  tableRow(row) {
    return `<tr data-id="${row.id}">` + this.schema.columns.map(column => {
      return `<td data-column="${column}">${row[column] || ''}</td>`
    }).join('\n') + '</tr>';
  }

}

module.exports = { TableGenerator }
