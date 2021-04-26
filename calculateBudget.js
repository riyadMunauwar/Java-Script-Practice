// Demo Store
const store = {
    total: {
        expanse: [{value: 500}, {value: 300}, {value: 1000}],
        income: [{value: 6500}, {value: 600}, {value: 3600}]
    },
    budget: 0,
    expanse: 0,
    percentate: -1
}


function Budget(store){

    return {
        calTotalExp: function(items){
            var sum = 0;
            items.forEach(function(item){
                sum += item.value;
            });
            return sum;
        },
        setBudget: function(){
            store.budget = this.calTotalExp(store.total.income);
        },
        setExpanse: function(){
            store.expanse = this.calTotalExp(store.total.expanse);
        },
        setPercentage: function(){
            store.percentage = this.getPercentage(store.budget, store.expanse);
        },
        getPercentage: function(principal, exp){
            return Math.round((exp / principal) * 100);
        },
        updateBudget: function(){
            this.setBudget();
            this.setExpanse();
            this.setPercentage();
        }
    }
}


console.log('Before action',store);

app.updateBudget();

store.total.expanse.push({value: 3000});

app.updateBudget();

console.log('after action', store);