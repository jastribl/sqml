const {Schema} = require('./schema');
const pretty = require('pretty');

class TableGenerator {
  constructor(schema) {
    this.schema = schema;
  }

  columnTags() {
    return Array.from(this.schema.columns).map(column => `<th>${column}</th>`).join('\n');
  }

  tableHeaderTag() {
    return `<tr>${this.columnTags()}</tr>`
  }

  tableId() {
    return `#${this.schema.tableName}`;
  }

  tableTag(isPretty = false) {
    const table = `<table id="${this.tableId()}">${this.tableHeaderTag()}<tbody></tbody></table>`
    return isPretty ? pretty(table) : table;
  }

  tableRow(row) {
    return Array.from(this.schema.columns).map(column => {
      return `<td data-column"${column}">${row[column] || ''}</td>`
    }).join('\n');
  }
  
}