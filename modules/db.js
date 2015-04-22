var monk = require('monk'),
    wrap = require('co-monk'),
    dbconf = require('../fe_db/setting'),
    db = monk(dbconf._PATH),
    words = wrap(db.get('words'));