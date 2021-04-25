var front = (function(){
  
  
  return {
      select: function(el){
        return document.querySelector(el);
      },
      addEvent: function(el, event, handeler){
        this.select(el).addEventListerner(event, handeler);
      },
      on: function(el, event, handeler){
        this.addEvent(el, event, handeler);
      }
  }
  
})()


