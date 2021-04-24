






function EventBasedUpdate(){};


EventBasedUpdate.prototype.components = [];
EventBasedUpdate.prototype.store = null;


EventBasedUpdate.prototype.changeState  = function(setState){
  setState(this.store);
  this.renderUi();
};

EventBasedUpdate.prototype.setStore = function(store){this.store = store;};

EventBasedUpdate.prototype.select = function(el){
  return document.getElementById(el);
}

EventBasedUpdate.prototype.onEvent = function(el,event, handeler){
  this.select(el).addEventListener(event, handeler);
}

EventBasedUpdate.prototype.registerComponent = function(component){
  this.components.push(component);
}

EventBasedUpdate.prototype.renderUi = function(){
  var _this = this;
  this.components.forEach(function(ui){
    for(var handeler in ui){
      ui[handeler](_this.store);
    }
  })
  
}

EventBasedUpdate.prototype.on = function(el,event, handeler){
  this.onEvent(el,event, handeler);
  this.renderUi();
}

EventBasedUpdate.prototype.init = function(){
  this.renderUi();
}



var app = new EventBasedUpdate();

app.setStore(50)


app.registerComponent({name: (s) => app.changeState((s)=> {console.log('change');}), age: (s)=> console.log('age+s')})



app.init();

app.on('btn-1', 'click', () => {
  app.renderUi();
});








