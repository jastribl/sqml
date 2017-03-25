const {initSync,Schema} = require('sqml');

const PersonSchema = new Schema('person_table', {name: String, address: String});
const DoorSchema = new Schema('door_table', {door_name: String});

const a = {door_name: 'potato', name: 'mr mime'};
const t = PersonSchema.create(a);
const c = DoorSchema.create(a)

PersonSchema.save(t);

initSync('./test.html');
