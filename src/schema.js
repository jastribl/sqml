const TABLES = new Map();


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

	// TODO
	create(data) {
		return Object.keys(data).reduce((obj, property) => {
			if(this.columns.has(property)) {
				const value = data[property];
				obj[property] = value;
			}
			return obj;
		}, {});
	}
	read(id) {}
	update(id, properties) {}
	destroy(id) {}
	save() {
		console.log('persist here');
	}
}

const PersonSchema = new Schema('person_table', {name: String, address: String});
const DoorSchema = new Schema('door_table', {door_name: String});
// const BadSchema = new Schema('door_table'); should throw

const a = {door_name: 'potato', name: 'mr mime'};
const t = PersonSchema.create(a);
const c = DoorSchema.create(a)
console.log('PERSON:', t, 'DOORSCHEMA', c);
PersonSchema.save(t);

console.log('TABLES MAP:', TABLES);


module.exports = {
	Schema
}
