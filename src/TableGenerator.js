const {Schema} = require('./schema');
const pretty = require('pretty');
// const generateTable = schema => {
//   schema.tableName
//   schema.pk
//   Array.from(schema.columns)
// }

class TableGenerator {
  constructor(schema) {
    this.schema = schema;
  }

  columnTags() {
    return Array.from(this.schema.columns).map(column => `<th>${column}</th>`);
  }

  tableHeaderTag() {
    return `<tr>${this.columnTags.join('')}</tr>`
  }

  tableId() {
    return `#${this.schema.tableName}`;
  }

  tableTag() {
    return pretty(`<table id="${this.tableId}">${this.tableHeaderTag}<tbody></tbody></table>`);
  }

  tableRow(row) {
    return Array.from(this.schema.columns).map(column => {
      return `<td data-column"${column}">${row[column] || ''}</td>`
    });
  }
  
}

const t = new TableGenerator(new Schema('book', {name: String, author: String}));

console.log(t.tableRow({name: 'waffle', type: 'asdf'}));
console.log(t.tableTag());