const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

class LoanRepository {
    constructor(db) {
        this.db = db ;
    }

    getAll() {
        return this.db.getData("/loans");
    }
}

module.exports = LoanRepository;