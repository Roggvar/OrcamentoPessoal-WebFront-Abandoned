class Expenses {
    constructor(year, month, day, type, desc, value){
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.desc = desc;
        this.value = value;
    }

    dataCheck() {

        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }

        return true;
    }
}

class Bd {

    constructor() {
        
        let id = localStorage.getItem('id');
        
        if(id === null) {
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
}

let bd = new Bd();

function registry() {

    let year = document.getElementById('year');
    let month = document.getElementById('month');
    let day = document.getElementById('day');
    let type = document.getElementById('type');
    let desc = document.getElementById('desc');
    let value = document.getElementById('value');

    let expenses = new Expenses(year.value, month.value, day.value, type.value, desc.value , value.value);

    if(expenses.dataCheck()) {

        bd.save(expenses);
        $('#saveSuccess').modal('show');
    }else {

        $('#saveError').modal('show');
    }
}