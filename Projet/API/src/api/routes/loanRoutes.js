module.exports = function(app, loanController) {
    app.route('/loans')
        .get(loanController.getAll.bind(loanController))
        .post(loanController.create.bind(loanController));

    app.route('/loans/:copyId')
        .delete(loanController.delete.bind(loanController));
        
    // TODO :   C'est l'id de la copie ou du livre ?
    //          Cette route est elle au bon emplacement ?
    app.route('/users/:id/loans')
        .get(loanController.getLoansUser.bind(loanController));
}