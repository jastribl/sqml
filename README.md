# sqml
Structured Query Markdown Language - SQL in HTML @TerribleHack


# Example
```
const sqml = require('sqml');

sqml.initSync('PATH_TO_HTML_FILE');

const {Schema, Table, Column} = sqml;

// schema has a Map of column names to columns, and will update

class Person extends Schema {
    static PERSON_TABLE = new Table('person_table', 'optional_id_name');
    static NAME_COLUMN = new Column('person_name');
    static ADDRESS_COLUMN = new Column('person_address');

    constructor() {
        super(PERSON_TABLE, {name: NAME_COLUMN, address: ADDRESS_COLUMN});
    }

}

const joe = Person.insert({name: 'joe', address: 'fake street'});

joe.name

Person.select(...); // return [{id, ...}, ...]
Person.insert(...); // return {id, ...}
Person.delete(Person.select(...)); // return num rows deleted


```