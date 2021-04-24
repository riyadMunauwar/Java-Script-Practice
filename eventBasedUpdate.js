
function EventBasedUpdate(){};


EventBasedUpdate.prototype.components = [];
EventBasedUpdate.prototype.store = {};


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
    
    if(ui.beforeRender) ui.beforeRender(_this.store);
    
    
    if(ui.render) ui.render(_this.store);
    else console.log('Render Function Missing')
    
    
    if(ui.afterRender) ui.afterRender(_this.store);
    
//     for(var handeler in ui){
//       ui[handeler](_this.store);
//     }
    
    
  })
  
}

EventBasedUpdate.prototype.on = function(el,event, handeler){
  this.onEvent(el,event, handeler);
//   this.renderUi();
}

EventBasedUpdate.prototype.init = function(){
  this.renderUi();
}



var app = new EventBasedUpdate();

app.setStore({value: 500})


const Compo = function(){
  return {
    hand: function(){
      app.changeState(function(s){
        s.value = 500000;
       
      })
    },
    render: function(e){
      console.log(e);
    },
//     afterRender: function(e){
//       console.log('after Render');
//     },
    beforeRender: function(e){
      
    
  



    }
  }
}



app.registerComponent(Compo());
app.registerComponent({render: function(){console.log('Compo Two');}});
app.registerComponent({render: function(){console.log('Compo Three');}});
app.registerComponent({render: function(){console.log('Compo Four');}});



app.init();

// app.changeState(function(state){
//   state.value = 60;
// })



function hand(){
  console.log('click')
}

app.on('btn-1', 'click', Compo().hand);






