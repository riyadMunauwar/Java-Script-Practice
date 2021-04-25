
function Neel(){};


Neel.prototype.store = {};
Neel.prototype.components = [];


Neel.prototype.setStore = function(store){
  this.store = store;
}

Neel.prototype.setState = function(changeState){
  changeState(this.store);
  this.renderComponents();
}

Neel.prototype.init = function(){
  this.renderComponents();
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


var app = new Neel();

app.setStore({
  posts: [1,2,3,4,5,6,7],
  user: [5,6,7,8,9,10],
  comments: [77,88,99,100]
})



var compo = {
  render: function(store){
    console.log(store.posts);
  }
}

var compoOne = {
  render: function(store){
    console.log(store.comments);
  }
}

var compoThree = {
  handeler: function(){
    app.setState(function(store){
      store.posts.push(50000);
    });
  },
  render: function(store){
    console.log(store.user);
  }
}



app.regComponent(compo);
app.regComponent(compoThree);
app.regComponent(compoOne);


app.init();


app.setState(function(store){
  
});

compoThree.handeler();

app.setState(function(store){
  
});

app.setState(function(store){
  
});
