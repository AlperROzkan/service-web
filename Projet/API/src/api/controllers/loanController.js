class LoanController {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }

    getAll(req, res) {
        const loans = this.loanRepository.getAll();
        res.json(loans);
    }

    getLoansUser(req, res) {
        const loans = this.loanRepository.getLoansUser(req.params.id);
        
        res.json(loans);
    }

    create(req, res) {
        const loan = this.loanRepository.add(req.query.bookId, req.body);
        res.location('/loans/' + loan.id);
        res.status(201).send(loan);
    }

    delete(req, res) {
        this.loanRepository.delete(req.params.copyId);
        res.status(204).send(null);
    }
}

module.exports = LoanController;