;(function($){
  "use strict";

  // Animated Progress Bar - Vertical
  if (jQuery('.progress__vertical').length) {
    jQuery('.progress__vertical').each(function () {
      jQuery(this).appear(function () {
        rocket_progress_bar_vertical_counter(jQuery(this));
        var number = jQuery(this).find('.progress-bar').data('number');
        jQuery(this).find('.progress-bar').css('height', '0%');
        jQuery(this).find('.progress-bar').animate({
            height: number + '%'
        }, 1500);
      }, {
        accX: 0,
        accY: -200
      });
    });
  }

  // Animated Progress Bar Counter - Vertical
  function rocket_progress_bar_vertical_counter($this) {
    if ($this.find('.progress-bar-number span').length) {
      $this.find('.progress-bar-number span').each(function () {
        var $max = parseFloat(jQuery(this).text());
        jQuery(this).countTo({
          from: 0,
          to: $max,
          speed: 1500,
          refreshInterval: 50
        });
      });
    }
  }
})(jQuery);