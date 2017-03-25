const {TABLES} = require('./tables');

class Schema {
  constructor(tableName, columns) {
		if(TABLES.has(tableName)) {
			throw "SCHEMA ALREADY DEFINED";
		}
		TABLES.set(tableName, this);
		this.tableName = tableName;
		this.pk = 'id';
		this.columns = new Set(Object.keys(columns));
  }

	filterProperties(data) {
		return data ? Object.keys(data).reduce((obj, property) => {
					if(this.columns.has(property)) {
						const value = data[property];
						obj[property] = value;
					}
					return obj;
				}, {}) : {};
	}

	// TODO
	create(data) {
		// TODO: get last id + 1 from HTML
		return Object.assign(this.filterProperties(data), {id: 1});
	}
	read(id) {}
	update(id, properties) {}
	destroy(id) {}
	save() {
		console.log('persist here');
	}
}

module.exports = {
	Schema
}