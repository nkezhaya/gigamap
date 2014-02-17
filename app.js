var Gigabit;

if (typeof Gigabit !== "object") {
    Gigabit = {};
}

(function () {
    "use strict";

    var map,

        initialize = function () {
            var mapOptions = {
                zoom: 13,
                center: new google.maps.LatLng(30.267153, -97.7430608)
            };

            map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

            map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
              document.getElementById("legend"));
        };

    $.getJSON("neighborhoods.json", function (data) {
        var bounds,
            color,
            coords,
            info,
            polygon;

        $.each(data.neighborhoods, function (i, hood) {
            coords = [];
            bounds = new google.maps.LatLngBounds();

            $.each(hood.coords, function (j, coord) {
                var latlng = new google.maps.LatLng(coord[1], coord[0]);
                coords.push(latlng);
                bounds.extend(latlng);
            });

            if (hood.isp === "Grande") {
                color = "#FCB933";
            } else if (hood.isp === "ATT") {
                color = "#FF7400";
            } else if (hood.isp === "Both") {
                color = "#0ACF80";
            }

            polygon = new google.maps.Polygon({
                paths: coords,
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: color,
                fillOpacity: 0.35
            });

            polygon.setMap(map);

            info = new google.maps.InfoWindow({
                content: "<div class='info'>" + hood.label + "</div>",
                position: bounds.getCenter()
            });

            info.open(map);
        });
    });

    google.maps.event.addDomListener(window, "load", initialize);
}());
