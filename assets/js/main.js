window.onload = function() {
    SuprSimpl.addEvent(document.getElementById("toggle-nav"), "click", function(e) {

        e.preventDefault();
        var nav = document.getElementById("nav-main-list");

        if (nav.style.display != "inline-block") {
            nav.style.display = "inline-block";
        } else {
            nav.style.display = "";
        }

    });
};

if (!SuprSimpl) SuprSimpl = {};


/**
 * A cross browser event listener
 * @param DOMElement    elem
 * @param string        eventName   Without the "on"
 * @param function      fnHandler   Callback for th event
 */
SuprSimpl.addEvent = function(elem, eventName, fnHandler) {
    
    var fnToBind = function(e) {
        return fnHandler.call(elem, e || window.event);
    };

    // Add the event the W3C way.
    if (elem.addEventListener) {
        elem.addEventListener(eventName, fnToBind, false);
        return fnToBind;
    }

    eventName = 'on' + eventName;

    // Add the event the Microsoft way.
    if (elem.attachEvent) {
        return elem.attachEvent(eventName, fnToBind) ? fnToBind : null;
    }

    // Assign the handler directly to the object's event handler property.
    if(typeof elem[eventName] == 'function') {
        // Add the event by creating a function which will run both the current
        // handler and this new one.
        var f1 = elem[eventName], f2 = fnToBind;
        fnToBind = function() {
            var ret1, ret2;

            try { 
                ret1 = f1.apply(this, arguments); 
            } catch (e1) { 
                setTimeout(function() { throw e1; }, 0); 
            }

            try { 
                ret2 = f2.apply(this, arguments); 
            } catch (e2) { 
                setTimeout(function() { throw e2; }, 0); 
            }

            // If the previous handler returned a non-undefined value, return it,
            // otherwise return the value returned from the new handler.
            return ret1 === undefined ? ret2 : ret1;
        };
    }

    elem[eventName] = fnToBind;
    return fnToBind;
};       
