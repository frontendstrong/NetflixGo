// Check for changes in the DOM
var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;
    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

observeDOM(document.body ,function(){
    // Search the latest updated DOM for the .continue-playing element
    if(document.querySelectorAll(".continue-playing")[0]){
        eventFire(document.querySelectorAll(".continue-playing")[0], "click"); // Click the first of the 3 elements (Continue Playing)
        return;
    }else if(document.querySelectorAll(".player-postplay-still-hover-container")){
        eventFire(document.querySelectorAll(".player-postplay-still-hover-container")[0], "click"); // Click the "Next Episode" button immediately
    }
}, false);

console.log("==============================================\nHey there! Thanks for using Netflix-Go! \n\nJoshua Armstrong | Front End Developer \n\nVisit http://www.joshivity.com/ \n==============================================");
