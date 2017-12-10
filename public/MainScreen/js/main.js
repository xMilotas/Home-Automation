
//Ask webserver which widgets are active and which are not
var url = "http://localhost/api/settings/";
$.getJSON(url, function(result) {
    $.each(result, function(i, field) {
      console.log(field);
    });
});
