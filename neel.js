
function Neel(){};


Neel.prototype.store = {};
Neel.prototype.components = [];


Neel.prototype.setStore = function(store){
  this.store = store;
}

Neel.prototype.addActionToComp = function(){
  var _this = this;

  this.components.forEach(function(component) {
    component.action = _this.action;
  })
  
}
Neel.prototype.action = function(changeState){
  changeState(this.store);
  this.renderComponents();
  this.addAllEvent();
}

Neel.prototype.init = function(){
  this.addActionToComp();
  this.renderComponents();
  this.addAllEvent();
}

Neel.prototype.addAllEvent = function(){
  this.components.forEach(function(component){
    if(component.event) component.event();
  })
}

Neel.prototype.regComponent = function(component){
  this.components.push(component);
}

Neel.prototype.renderComponents = function(){
  
  var _this = this;
  
  this.components.forEach(function(component){
    
    if(component.beforeRender) component.beforeRender(_this.store);
    if(component.render) component.render(_this.store);
    if(component.afterRender) component.afterRender(_this.store);
    
  })
}

export default Neel;

