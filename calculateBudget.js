
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


export default Budget;