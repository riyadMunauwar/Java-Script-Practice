renderUifunction FrontEnd(){
  

  
}

FrontEnd.prototype = {
  Store: null,
  UI: [],
  setStore: function(store){
    this.Store = store;
  },
  registerUi: function(ui){
    this.UI.push(ui);
  },
  renderUi: function(){
    var _this = this;
    this.UI.forEach(function(ui){
      ui(_this.Store, _this.setState);
    });
  },
  setState: function(resetValue){
    this.Store = resetValue;
    this.renderUi();
  },
  
  init: function(){
    this.renderUi();
  }
  
}


const expense = new FrontEnd();


expense.setStore(10);


expense.registerUi(function(store, setState){
  console.log('Ui One ' + store);
  
  setTimeout(()=>{
    setState(50);
  },5000)
})


expense.registerUi(function(store, setState){
  console.log('Ui Two ' + store)
})


expense.init();





