module.exports = function(app, loanController) {
    app.route('/loans')
        .get(loanController.getAll.bind(loanController));
}