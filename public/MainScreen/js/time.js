//Uses JQuery and Moments.JS

//Set Moments Language to Language defined in config file
moment.lang(lang);

jQuery(document).ready(function($) {
(function updateTime()
{
      var now = moment();
      var date = now.format('LLLL').split(' ',4);
      date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

  $('.date').html(date);
  $('.time').html(now.format('HH') + ':' + now.format('mm') + '<span class="sec">'+now.format('ss')+'</span>');

  setTimeout(function() {
    updateTime();
  }, 1000);
})();
});
