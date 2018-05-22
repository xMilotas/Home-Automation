getActiveWidgets();
setWidgets();
interval = setInterval(repeat, 60000); //Time in MS

function repeat() {
  getActiveWidgets();
  setWidgets();
}

function getActiveWidgets(){
  //Ask webserver which widgets are active and which are not
  var url = "http://localhost:8080/api/settings/";
}


function setWidgets(){
//Make Spotify div invisible if spotify is disabled
if (spotifyActive == 0){
  // if (spotifyPlayer) spotifyPlayer.logout();
  document.getElementById('js-btn-login').style.display = "none";
}

// **************************** Weather ****************************
if (weatherActive == 1){
  jQuery.fn.updateWithText = function(text, speed)
  {
  	var dummy = $('<div/>').html(text);

  	if ($(this).html() != dummy.html())
  	{
  		$(this).fadeOut(speed/2, function() {
  			$(this).html(text);

  			if(nhead.length > Headlength){
  				$('.newshead').css("font-size", "28px");
  			}else{
  				$('.newshead').css("font-size", "32px");
  			}
  			$(this).fadeIn(speed/2, function() {
  			});
  		});
  	}
  }
  var nhead = '';

  jQuery.fn.outerHTML = function(s) {
      return s
          ? this.before(s).remove()
          : jQuery("<p>").append(this.eq(0).clone()).html();
  };


  function roundVal(temp)
  {
  	return Math.round(temp * 10) / 10;
  }

  function kmh2beaufort(kmh)
  {
  	var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
  	for (var beaufort in speeds) {
  		var speed = speeds[beaufort];
  		if (speed > kmh) {
  			return beaufort;
  		}
  	}
  	return 12;
  }


  (function updateCurrentWeather()
  {
    var iconTable = {
      '01d':'wi-day-sunny',
      '02d':'wi-day-cloudy',
      '03d':'wi-cloudy',
      '04d':'wi-cloudy-windy',
      '09d':'wi-showers',
      '10d':'wi-rain',
      '11d':'wi-thunderstorm',
      '13d':'wi-snow',
      '50d':'wi-fog',
      '01n':'wi-night-clear',
      '02n':'wi-night-cloudy',
      '03n':'wi-night-cloudy',
      '04n':'wi-night-cloudy',
      '09n':'wi-night-showers',
      '10n':'wi-night-rain',
      '11n':'wi-night-thunderstorm',
      '13n':'wi-night-snow',
      '50n':'wi-night-alt-cloudy-windy'
    }


    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q='+weathercity+'&appid='+weatherAPI+'&units='+weatherunits, function(json, textStatus) {

      var temp = roundVal(json.main.temp);
      var temp_min = roundVal(json.main.temp_min);
      var temp_max = roundVal(json.main.temp_max);

      var wind = roundVal(json.wind.speed);

      var iconClass = iconTable[json.weather[0].icon];
      var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
      $('.temp').updateWithText(icon.outerHTML()+temp+'&deg;', 1000);

      // var forecast = 'Min: '+temp_min+'&deg;, Max: '+temp_max+'&deg;';
      // $('.forecast').updateWithText(forecast, 1000);

      var now = new Date();
      var sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0,5);
      var sunset = new Date(json.sys.sunset*1000).toTimeString().substring(0,5);

      var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + kmh2beaufort(wind) ;
      var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise;
      if (json.sys.sunrise*1000 < now && json.sys.sunset*1000 > now) {
        sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset;
      }

      $('.windsun').updateWithText(windString+' '+sunString, 1000);
    });

    setTimeout(function() {
      updateCurrentWeather();
    }, 60000);
  })();

  (function updateWeatherForecast()
  {
    var iconTable = {
      '01d':'wi-day-sunny',
      '02d':'wi-day-cloudy',
      '03d':'wi-cloudy',
      '04d':'wi-cloudy-windy',
      '09d':'wi-showers',
      '10d':'wi-rain',
      '11d':'wi-thunderstorm',
      '13d':'wi-snow',
      '50d':'wi-fog',
      '01n':'wi-night-clear',
      '02n':'wi-night-cloudy',
      '03n':'wi-night-cloudy',
      '04n':'wi-night-cloudy',
      '09n':'wi-night-showers',
      '10n':'wi-night-rain',
      '11n':'wi-night-thunderstorm',
      '13n':'wi-night-snow',
      '50n':'wi-night-alt-cloudy-windy'
    }
      $.getJSON('http://api.openweathermap.org/data/2.5/forecast?q='+weathercity+'&appid='+weatherAPI+'&units='+weatherunits+'&cnt=60&mode=json', function(json, textStatus) {

      var forecastData = {};

      for (var i in json.list) {
        var forecast = json.list[i];
        var dateKey  = forecast.dt_txt.substring(0, 10);

        if (forecastData[dateKey] == undefined) {
          forecastData[dateKey] = {
            'timestamp':forecast.dt * 1000,
            'icon':forecast.weather[0].icon,
            'temp_min':forecast.main.temp,
            'temp_max':forecast.main.temp
          };
        } else {
          forecastData[dateKey]['icon'] = forecast.weather[0].icon;
          forecastData[dateKey]['temp_min'] = (forecast.main.temp < forecastData[dateKey]['temp_min']) ? forecast.main.temp : forecastData[dateKey]['temp_min'];
          forecastData[dateKey]['temp_max'] = (forecast.main.temp > forecastData[dateKey]['temp_max']) ? forecast.main.temp : forecastData[dateKey]['temp_max'];
        }

      }


      var forecastTable = $('<table />').addClass('forecast-table');
      var opacity = 1;
      for (var i in forecastData) {
        var forecast = forecastData[i];
          var iconClass = iconTable[forecast.icon];
        var dt = new Date(forecast.timestamp);
        var row = $('<tr />').css('opacity', opacity);

        row.append($('<td/>').addClass('day').html(moment.weekdaysShort(dt.getDay())));
        row.append($('<td/>').addClass('icon-small').addClass(iconClass));
        row.append($('<td/>').addClass('temp-max').html(roundVal(forecast.temp_max)).append("&#xB0;"));
        row.append($('<td/>').addClass('temp-min').html(roundVal(forecast.temp_min)).append("&#xB0;"));

        forecastTable.append(row);
        opacity -= 0.155;
      }


      $('.forecast').updateWithText(forecastTable, 1000);
    });

    setTimeout(function() {
      updateWeatherForecast();
    }, 60000);
  })();

}


// ************************** Bundesliga ****************************
if (bundesligaActive ==1){
  (function () {
      // Localize jQuery variable
      var jQuery;
      jQuery = window.jQuery;
      main();
      var fblWidgetSettings = {
     compactview: false,  // eine kompaktere Darstellung
     league: 'bl1', // bl1 oder bl2
     season: 2017,  // die Saison, 2017 steht für die Saison 2017/2018
     teamsToHighlight: ['Stuttgart']
   };



      /******** Our main function ********/
      function main() {
          jQuery(document).ready(function ($) {
              /******* Load HTML *******/
              var url = "http://www.bundesliga-widgets.de/Widgets/Table";

              if (typeof fblWidgetSettings != 'undefined') {
                  var parameterverbinder = "?";
                  if (typeof fblWidgetSettings.league != 'undefined') {
                      url = url + "?league=" + fblWidgetSettings.league;

                      parameterverbinder = "&";

                      if (typeof fblWidgetSettings.season != 'undefined') {
                          url = url + "&season=" + fblWidgetSettings.season;
                      }
                  }

                  if (typeof fblWidgetSettings.compactview != 'undefined') {
                      url = url + parameterverbinder + "compactview=" + fblWidgetSettings.compactview;
                  }
              }

              $.get(url, function (data) {
                  $('#fblwidget_table').html(data);

                  if (typeof fblWidgetSettings != 'undefined') {
                      $('#fblwidget_table').find('.blwTeamName').each(function (index, team) {
                          // Highlight Teams:
                          if (typeof fblWidgetSettings.teamsToHighlight != 'undefined') {
                              fblWidgetSettings.teamsToHighlight.forEach(function (item) {
                                  if ($(team).text().indexOf(item) >= 0) {
                                      $(team).addClass('blwHighlighted');
                                  }
                              });
                          }

                          // Team-Links:
                          if (typeof fblWidgetSettings.teamLinks != 'undefined') {
                              fblWidgetSettings.teamLinks.forEach(function (item) {
                                  if ($(team).text().indexOf(item.teamname) >= 0) {
                                      $(team).wrap('<a href= "' + item.link + '" target= "_blank" />');
                                  }
                              });
                          }
                      });
                  }
              });
          });
      }
  })();


}

//******************************* TIME *****************************
//Uses JQuery and Moments.JS
if (timeActive == 1){
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
}

//**************************** Spotify ************************************
  if (spotifyActive == 1){
    var mainContainer = document.getElementById('js-main-container'),
        loginContainer = document.getElementById('js-login-container'),
        loginButton = document.getElementById('js-btn-login'),
        background = document.getElementById('js-background');

        spotifyPlayer = new SpotifyPlayer();

    var template = function (data) {
      return `
        <div class="main-wrapper">
          <div class="now-playing__img">
            <img src="${data.item.album.images[0].url}">
          </div>
          <div class="now-playing__side">
            <div class="now-playing__name">${data.item.name}</div>
            <div class="now-playing__artist">${data.item.artists[0].name}</div>
            <div class="now-playing__status">${data.is_playing ? 'Playing' : 'Paused'}</div>
            <div class="progress">
              <div class="progress__bar" style="width:${data.progress_ms * 100 / data.item.duration_ms}%"></div>
            </div>
          </div>
        </div>
        <div class="background" style="background-image:url(${data.item.album.images[0].url})"></div>
      `;
    };

    spotifyPlayer.on('update', response => {
      mainContainer.innerHTML = template(response);
    });

    spotifyPlayer.on('login', user => {
      if (user === null) {
        loginContainer.style.display = 'block';
        mainContainer.style.display = 'none';
      } else {
        loginContainer.style.display = 'none';
        mainContainer.style.display = 'block';
      }
    });

    loginButton.addEventListener('click', () => {
        spotifyPlayer.login();
    });

    spotifyPlayer.init();
  }
  if (vvsActive == 1){
    getNextDepartures(settingsStartLocation, settingsEndLocation)
  }
}

function getNextDepartures(startLocation, endLocation){
    var now = moment()
    var day = now.format('YYYYMMDD')
    var time = now.format('HHmm')
    var url = "https://www3.vvs.de/mngvvs/XML_TRIP_REQUEST2?itdDate=" + day + "&itdTime=" + time + "&locationServerActive=1&name_destination=" + endLocation + "&name_origin=" + startLocation + "&outputFormat=JSON&routeType=leasttime&searchLimitMinutes=360&tryToFindLocalityStops=1&type_destination=any&type_origin=any&useElevationData=1&useRealtime=1&useUT=1"
    //loadJSON(url, print, 'jsonp')
jQuery.getJSON("https://www3.vvs.de/mngvvs/XML_TRIP_REQUEST2?itdDate=20180420&itdTime=2050&locationServerActive=1&name_destination=de:08111:6112&name_origin=de:08111:136&outputFormat=rapidJSON&routeType=leasttime&searchLimitMinutes=360&tryToFindLocalityStops=1&type_destination=any&type_origin=any&useElevationData=1&useRealtime=1&useUT=1&callback=?", function(data){
})
}
