class LoanController {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }

    getAll(req, res) {
        const loans = this.loanRepository.getAll();
        res.json(loans);
    }
}

module.exports = LoanController;