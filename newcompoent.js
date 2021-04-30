// Store

const store = {
  posts: [1,2,3,4,5],
  users: [1,2,3,4,5,6,7],
  products: [1,2,3,4,6,7,10],
  comments: [1,2,3,4,5,6,7,10,8,9]
}





// To check two object equal or not
function isEqual(one, another){
  return JSON.stringify(one) === JSON.stringify(another);
}


function deepCopy(value){
  
  if( typeof value === 'object' && value && value instanceof Object && !Array.isArray(value) ) return {...value}
  
  if( typeof value === 'object' && Array.isArray(value) && value) return [...value];
  
  return value;
  
}



const component_one = (function(){
  
  
  
  return {
    dependencies: {posts: store.posts, comments: store.comments},
    cache: function(){
      var cache = {};
      var keys = Object.keys(this.dependencies);
      
      for(let key of keys){
        cache[key] = deepCopy(this.dependencies[key]);
      }
      this.dependencies = cache;
    },
    isRender: function(){
      for(var dependencie in this.dependencies ){
        if(!isEqual(this.dependencies[dependencie], store[dependencie])) return true;
      }
      
      return false;
    },
    addEvent: function(){
      // All event of this component bindings here
    },
    render: function(){
      // Ui render logic go here
    }
  }
  
  
  
})()




component_one.cache();

// store.comments.push(50000);
store.users.push(500)
console.log(component_one.isRender())

console.log(component_one.dependencies);


