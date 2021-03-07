var myMap;
var users;

var once = Boolean(true);
var dn = 1;


$(document).ready(function () {
    GetData();
    //            initMap();

    var element = document.getElementById('map');
    var options = {
        zoom: 16,
        center: {
            lat: 40.41463478749649,
            lng: -3.681933611494517
        },
        styles: [
            {
                elementType: "geometry",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#746855"
                }]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }],
      },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }],
      },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#263c3f"
                }],
      },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#6b9a76"
                }],
      },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#38414e"
                }],
      },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#212a37"
                }],
      },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9ca5b3"
                }],
      },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    color: "#746855"
                }],
      },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#1f2835"
                }],
      },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#f3d19c"
                }],
      },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#2f3948"
                }],
      },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }],
      },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#17263c"
                }],
      },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#515c6d"
                }],
      },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#17263c"
                }],
      }

        ]
    };

    myMap = new google.maps.Map(element, options);

});


function GetData() {
    var data_all = 'https://api.thingspeak.com/channels/262211/fields/1.json?start=2020-5-28%2000:00:00&offset=3';

    $.ajax({
        url: data_all,
        type: 'GET',
        contentType: "application/json",
        success: function (data, textStatus, xhr) {
            $.each(data, function (i, item) {
                if (i == 'feeds') {
                    users = item.length;
                    $('#counter').text(item.length - 6450);
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });

    setTimeout(GetData, 300);

    //    addMarker();
    //            DrawMarkers();

    dn++;

    if (dn == 8) {
        DrawMarkers();
        //        dn = 2;
    }

}


function randomFloat(min, max) {
    return min + (max - min) * Math.random();
}



function DrawMarkers() {

    for (var i = 0; i < users - 6450; i++) {
        addMarker();
    }

}


function addMarker() {
    var lt = randomFloat(40.41, 40.42);
    var ln = randomFloat(-3.687, -3.681);

    var marker = new google.maps.Marker({
        position: {
            lat: lt,
            lng: ln
        },
        map: myMap,
        icon: 'm.png'
    });
}




$("button").click(function () {
    $.get("https://api.thingspeak.com/update.json?api_key=JDJCGRJD46GEN020&field1=123", function (data, status) {
        //    alert("Data: " + data + "\nStatus: " + status);
    });
});



function SendData() {

    if (once) {
        addMarker();
        once = false;
        $.get("https://api.thingspeak.com/update.json?api_key=JDJCGRJD46GEN020&field1=123", function (data, status) {
        });

        GetData();


    }


}



$('#show-action').click(function () {
    showDialog({
        title: 'Action',
        text: 'email / text input',

        positive: {
            title: 'aha',
            onClick: SendData
        }
    });
    var bb = document.getElementById('show-action');
    bb.setAttribute("disabled", "");
});
