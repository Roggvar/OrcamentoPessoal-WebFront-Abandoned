class Expenses {
    constructor(year, month, day, type, desc, value){
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.desc = desc;
        this.value = value;
    }
}

function registry() {

    let year = document.getElementById('year');
    let month = document.getElementById('month');
    let day = document.getElementById('day');
    let type = document.getElementById('type');
    let desc = document.getElementById('desc');
    let value = document.getElementById('value');

    let expenses = new Expenses(year.value, month.value, day.value, type.value, desc.value , value.value);

    console.log(expenses);

}