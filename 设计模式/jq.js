(function() {
    var jQuery = function(selectory, context) {
        return new jQuery.fn.init(selectory, context)
    }
    jQuery.fn = jQuery.prototype = {
        init: function() {}
    }
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function(){}
    jQuery.extend({})
    window.$ = window.jQuery = jQuery
})()