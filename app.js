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



// Add Item Component

const addItemComponent = {

    addItem: function(){

        app.action(function(store){
            function getInputValue(){
            
                var item = {
                    type: select('.input__type').value,
                    description: select('.input__description').value,
                    value: parseInt(select('.input__value').value)
                }
        
                return item;
            }
    
    
    
            function creatItem (id, description, value){
                return {id: id, description: description, value: value};
            }
    
            function clearFeild(){
                // select('.input__type').value = '+';
                select('.input__description').value = '';
                select('.input__value').value = '';
            }
    
    
    
            var item = getInputValue();
            var type = item.type;
            var ID;
    
            if(type === '+') {
                ID = store.total.income.length - 1;
                item = creatItem(ID, item.description, item.value);
            }else{
    
                ID = store.total.expanse.length - 1;
                item = creatItem(ID, item.description, item.value);
    
            }
    
    
            
    
            if(type === '+') store.total.income.push(item);
            else store.total.expanse.push(item);


            clearFeild();
            budget.updateBudget();

            
        })
        


    },

    event: function(){
        select('.input__button').addEventListener('click',this.addItem);
    }
}


// Budget Componet
const budgetComponent = {
    render: function(store){
        select('.budget__total').innerText = store.budget;
        select('.budget__expanse').innerText = store.expanse;
    }
}

// Income Component
const incomeComponent = {
    deleteItem: function(){
        var _this = this;

        app.action(function(store) {
            
            var id = _this.parentNode.parentNode.children[0].innerText;
            id = parseInt(id);
            var getItem = null;

            store.total.income.forEach(function(item){
                if(item.id === id) getItem = item;
            })

            var index = store.total.income.indexOf(getItem);

            confirm('Are You Sure Deleteting ' + getItem.description);
            store.total.income.splice(index, 1);
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


// Expanse Component
const expanseComponent = {
    getThis: function(){
        return this;
    },
    deleteItem: function(e){
        var _this = this;

        app.action(function(store) {
            
            var id = _this.parentNode.parentNode.children[0].innerText;
            id = parseInt(id);
            var getItem = null;

            store.total.expanse.forEach(function(item){
                if(item.id === id) getItem = item;
            })

            var index = store.total.expanse.indexOf(getItem);

            confirm('Are You Sure Deleteting ' + getItem.description);
            store.total.expanse.splice(index, 1);
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
app.regComponent(budgetComponent);
app.regComponent(addItemComponent);

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