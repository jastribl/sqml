const {TABLES} = require('./tables');
const dom = require('./dom');
const {TableGenerator} = require('./TableGenerator');

class Schema {
  constructor(tableName, columns) {
		if(TABLES.has(tableName)) {
			throw "SCHEMA ALREADY DEFINED";
		}
		TABLES.set(tableName, this);
		this.tableName = tableName;
		this.pk = 'id';
		this.columns = Object.keys(columns);
  }

	filterProperties(data) {
        let cleaned = {};
        this.columns.forEach(column => {
            if(data[column]) {
                cleaned[column] = data[column]
            }
            else {
                cleaned[column] = '';
            }
        });
        return cleaned;
	}

	create(data) {
		// TODO: get last id + 1 from HTML
        const tableGenerator = new TableGenerator(this);
        const id = dom.getDom()(`#${this.tableName}`).find('tr').last().data('id')+1 || 0;
        const newObject = Object.assign(this.filterProperties(data), {id});
        dom.getDom()(`#${this.tableName} > tbody`).append(tableGenerator.tableRow(newObject));
        dom.saveDom();
		return newObject;
	}
	read(id) {
        let $ = dom.getDom();
        const row = $(`#${this.tableName}`).find(`tbody tr[data-id="${id}"]`);
        let rowObject = {};
        rowObject.id = $(row).data('id');

        $(row).find('td').each((cellIndex, cell) => {
            cell = $(cell);
            rowObject[cell.data('column')] = cell.text();
        });
        return rowObject;
    }
	update(id, properties) {
        const tableGenerator = new TableGenerator(this);
        const obj = Object.assign(this.read(id), properties);
        const $ = dom.getDom();
        const row = $(`#${this.tableName}`).find(`tbody tr[data-id="${id}"]`);
        $(row).replaceWith(tableGenerator.tableRow(obj));
        dom.saveDom();
    }
	destroy(id) {
        dom.getDom()(`tr[data-id="${id}"]`).remove();
        dom.saveDom();
    }
	// save() {
	// 	console.log('persist here');
	// }
}

module.exports = {
	Schema
}
