const {initSync,Schema} = require('sqml');

const PersonSchema = new Schema('person_table', {name: String, age: String});
const DoorSchema = new Schema('door_table', {door_name: String});

initSync('./test.html');

const a = {door_name: 'potato', name: 'mr mime', age: 50};
const t = PersonSchema.create(a);
const c = DoorSchema.create(a);

const r = PersonSchema.read(1);

PersonSchema.update(1, {name: 'bob'});

// PersonSchema.save(t);

