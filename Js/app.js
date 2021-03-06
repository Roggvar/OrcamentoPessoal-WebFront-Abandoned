// Class Expenses Begin
class Expenses {
    constructor(year, month, day, type, desc, value) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.desc = desc;
        this.value = value;
    }

    dataCheck() {

        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }

        return true;
    }
}
// Class Expenses End

// Class Bd Begin
class Bd {

    constructor() {

        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getNextId() {

        let nextId = localStorage.getItem('id');
        return parseInt(nextId) + 1;
    }

    save(data) {

        let id = this.getNextId();

        localStorage.setItem(id, JSON.stringify(data));
        localStorage.setItem('id', id);
    }

    returnAllRegistry() {

        let expenses = Array()
        let id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            let expense = JSON.parse(localStorage.getItem(i));

            if (expense === null) {
                continue;
            }

            expenses.push(expense);
        }

        return expenses;
    }

    search(expense) {

        let filterExpenses = Array();

        filterExpenses = this.returnAllRegistry();

        if (expense.year != '') {
            filterExpenses = filterExpenses.filter(d => d.year == expense.year);
        }

        if (expense.month != '') {
            filterExpenses = filterExpenses.filter(d => d.month == expense.month);
        }

        if (expense.day != '') {
            filterExpenses = filterExpenses.filter(d => d.day == expense.day);
        }

        if (expense.type != '') {
            filterExpenses = filterExpenses.filter(d => d.type == expense.type);
        }

        if (expense.desc != '') {
            filterExpenses = filterExpenses.filter(d => d.desc == expense.desc);
        }

        if (expense.value != '') {
            filterExpenses = filterExpenses.filter(d => d.value == expense.value);
        }


        return filterExpenses;
    }

}
// Class Bd End

let bd = new Bd();

// Function registry Begin
function registry() {

    let year = document.getElementById('year');
    let month = document.getElementById('month');
    let day = document.getElementById('day');
    let type = document.getElementById('type');
    let desc = document.getElementById('desc');
    let value = document.getElementById('value');

    let expenses = new Expenses(year.value, month.value, day.value, type.value, desc.value, value.value);

    if (expenses.dataCheck()) {
        bd.save(expenses);

        document.getElementById('modalTitle').innerHTML = "Registro Inserido com Sucesso";
        document.getElementById('modalTitleDiv').className = "modal-header text-success";
        document.getElementById('modalContent').innerHTML = "Despesa foi Cadastrada com Sucesso";
        document.getElementById('modalBtn').innerHTML = "Voltar";
        document.getElementById('modalBtn').className = "btn btn-success";

        $('#modalRegistry').modal('show');

        year.value = '';
        month.value = '';
        day.value = '';
        type.value = '';
        desc.value = '';
        value.value = '';

    } else {

        document.getElementById('modalTitle').innerHTML = "Erro na Inclus??o do Registro";
        document.getElementById('modalTitleDiv').className = "modal-header text-danger";
        document.getElementById('modalContent').innerHTML = "Erro na Grava????o";
        document.getElementById('modalBtn').innerHTML = "Voltar e Corrigir";
        document.getElementById('modalBtn').className = "btn btn-danger";

        $('#modalRegistry').modal('show');
    }
}
// Function registry End

// Function loadExpenseList Begin
function loadExpenseList() {

    let expenses = Array();
    expenses = bd.returnAllRegistry();

    let expensesList = document.getElementById('expensesList');

    expenses.forEach(
        function (d) {

            let row = expensesList.insertRow()
            row.insertCell(0).innerHTML = d.day + '/' + d.month + '/' + d.year;

            switch (d.type) {
                case '1': d.type = 'Alimenta????o';
                    break;
                case '2': d.type = 'Educa????o';
                    break;
                case '3': d.type = 'Lazer';
                    break;
                case '4': d.type = 'Sa??de';
                    break;
                case '5': d.type = 'Transporte';
                    break;
            }

            row.insertCell(1).innerHTML = d.type;
            row.insertCell(2).innerHTML = d.desc;
            row.insertCell(3).innerHTML = d.value;

        }
    )
}
// Function loadExpenseList End

// Function searchExpenses Begin
function searchExpenses() {
    let year = document.getElementById('year').value;
    let month = document.getElementById('month').value;
    let day = document.getElementById('day').value;
    let type = document.getElementById('type').value;
    let desc = document.getElementById('desc').value;
    let value = document.getElementById('value').value;

    let expenses = new Expenses(year, month, day, type, desc, value);

    let ranOutOfNames = bd.search(expenses);

    //-----------------------------------------

    let expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    ranOutOfNames.forEach(
        function (d) {

            let row = expensesList.insertRow()
            row.insertCell(0).innerHTML = d.day + '/' + d.month + '/' + d.year;

            switch (d.type) {
                case '1': d.type = 'Alimenta????o';
                    break;
                case '2': d.type = 'Educa????o';
                    break;
                case '3': d.type = 'Lazer';
                    break;
                case '4': d.type = 'Sa??de';
                    break;
                case '5': d.type = 'Transporte';
                    break;
            }

            row.insertCell(1).innerHTML = d.type;
            row.insertCell(2).innerHTML = d.desc;
            row.insertCell(3).innerHTML = d.value;

        }
    )
}
// Function searchExpenses End