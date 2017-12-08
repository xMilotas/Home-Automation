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
