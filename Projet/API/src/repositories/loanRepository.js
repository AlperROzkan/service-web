const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

class LoanRepository {
    constructor(db, userRepository, copyRepository) {
        this.db = db;

        // TODO : Est ce qu'on peut utiliser le user repository ici ? Ce n'est pas indiqué dans l'énoncé.
        this.userRepository = userRepository;
        this.copyRepository = copyRepository;
    }

    getAll() {
        return this.db.getData("/loans");
    }

    // TODO : On doit avoir le bookId en paramètres ?
    // Adding a new loan requires a bookId to verify if the book exists
    add(bookId, loan) {
        loan.id = uuid();
        
        // Verify if user exists
        const user = this.userRepository.get(loan.userId);
        if(!user)
            throw new ValidationError('The user does not exist');
        
        // Verify if copy exists
        const copy = this.copyRepository.get(bookId, loan.copyId);
        if(!copy)
            throw new ValidationError('This copy does not exist');

        // Verify if already loaned
        const loans = this.getAll(); 
        if(_.some(loans, { copyId: loan.copyId }))
            throw new ValidationError('This copy is already loaned');
    
        this.db.push("/loans[]", loan);
        return loan;
    }

    delete(copyId) {
        const path = this.getIdPath(copyId);
        if (path != null)
            this.db.delete(path);
    }

    getLoansUser(userId) {
        const loans = this.getAll();
        return _.filter(loans, { userId });
    }  

    getAvailableCopies(bookId) {
        const loans = this.getAll();
        const copies = this.copyRepository.getAll(bookId);
        return _.filter(copies, ({ bookId }) => !_.some(loans, { copyId: bookId })); 
    }

    getIdPath(copyId) {
        const loans = this.getAll();
        const index = _.findIndex(loans, { copyId });
        if (index == -1)
            return null;


        return '/loans['+ index +']';
    }
}

module.exports = LoanRepository;