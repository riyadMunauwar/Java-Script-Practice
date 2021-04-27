import Neel from './neel.js';
import Budget from './calculateBudget.js';
import {select, selectById, addEvent, getPercentage, selectAll} from './helper.js';


// Demot Data

const expanseList = [
    {id: 1, description: 'grocey', value: 300},
    {id: 2, description: 'Gym Equipment', value: 400},
    {id: 3, description: 'Food', value: 300},
    {id: 4, description: 'Fast Food Item', value: 300},
    {id: 4, description: 'Ice Cream', value: 300}
]

const incomeList = [
    {id: 1, description: 'sallery', value: 3000},
    {id: 2, description: 'Pertime Job', value: 400},
    {id: 3, description: 'freelancing', value: 300},
    {id: 4, description: 'Bonous', value: 600}
]



// Store 
const store = {
    total: {
        expanse: expanseList,
        income: incomeList
    },
    budget: 100000,
    expanse: 0,
    percentate: -1
}


// Initial App
const app = new Neel();
app.setStore(store);

// Update Budget 
var budget = Budget(store);
budget.updateBudget();



const incomeComponent = {
    deleteItem: function(){
        app.action(function(store){
            store.total.income.pop();
            budget.updateBudget();
        })
    },
    event: function(){

        var _this = this;
        Array.from(selectAll('.delete__income')).forEach(function(item) {
            item.addEventListener('click', _this.deleteItem);
        })

    },
    render: function(store){
        var incomeList = '';
        
        
        store.total.income.forEach(function(item){

            var perCent = getPercentage(store.budget, item.value);
            var markUp = `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.description}</td>
            <td>${item.value}</td>
            <td>${perCent}%</td>
            <td scope="col"><button class="btn btn-danger delete__income">Delete</button></td>
          </tr>`;


          incomeList += markUp;


        })

        select('.income__list').innerHTML = incomeList;
    }
}



const expanseComponent = {
    deleteItem: function(){
        app.action(function(store) {
            store.total.expanse.pop();
            budget.updateBudget();

        })
    },

    event: function(){
        var _this = this;
        Array.from(selectAll('.delete__expanse')).forEach(function(item){
            item.addEventListener('click', _this.deleteItem);
        })
    },
    render: function(store){
        var expanseList = '';
        
        store.total.expanse.forEach(function(item) {

            var perCent = getPercentage(store.budget, item.value);
            var markUp = `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.description}</td>
            <td>${item.value}</td>
            <td>${perCent}%</td>
            <td scope="col"><button class="btn btn-danger delete__expanse">Delete</button></td>
          </tr>`

          expanseList += markUp;
        //   console.log(markUp)

        })

        select('.expanse__list').innerHTML = expanseList;
    }
}











// Register Component
app.regComponent(expanseComponent);
app.regComponent(incomeComponent);

// Init app
app.init();

// app.components.forEach(function(item){
//     console.log(item);
// })

// function deleteItem(){
//     console.log('click');
// }



// Array.from(selectAll('.delete__income')).forEach(function(item) {
//     item.addEventListener('click', deleteItem);
// })