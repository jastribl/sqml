# sqml
Structured Query Markdown Language - SQL in HTML @TerribleHack


# Example
```
const sqml = require('sqml');

const Person = sqml.Schema('person_table', {firstname: String});
sqml.initSync('PATH_TO_HTML_FILE');

Person.create({firstName: 'joe'});

```