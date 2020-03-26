;(function($){
  "use strict";

  if (jQuery('.rocket_counter-value').length) {
    jQuery('.rocket_counter-value').each(function () {
      jQuery(this).appear(function () {
        var $max = parseFloat(jQuery(this).text());
        jQuery(this).countTo({
          from: 0,
          to: $max,
          speed: 1500,
          refreshInterval: 100
        })
      }, {
        accX: 0,
        accY: -200
      })
    })
  }

})(jQuery);