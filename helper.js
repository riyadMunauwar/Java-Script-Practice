

export const select = function(el) {
    return document.querySelector(el);
}


export const selectAll = function(el){
    return document.querySelectorAll(el);
}

export const selectById = function(el){
    return document.getElementById(el);;
}

export const addEvent = function(el, event, handeler){
    select(el).addEventListener(event, handeler);
}


export const getPercentage = function(principal, exp){
    return Math.round((exp / principal) * 100);
}

