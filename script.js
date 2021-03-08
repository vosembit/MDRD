var myMap;
var users;

var once = Boolean(true);
var ap = Boolean(true);
var dn = 1;


$(document).ready(function () {
    GetData();
});

//40.41361009689965, -3.6933718389796053

function initMap() {
    var element = document.getElementById('map');
    var options = {
        zoom: 15,
        center: {
            lat: 40.41363478749649,
            lng: -3.693333611494517
        },
        streetViewControl: false,
        disableDefaultUI: true,


        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#242f3e"
      }
    ]
  },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#746855"
      }
    ]
  },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#242f3e"
      }
    ]
  },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
      }
    ]
  },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
      },
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#263c3f"
      }
    ]
  },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6b9a76"
      },
                    {
                        "visibility": "on"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#38414e"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#212a37"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9ca5b3"
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#746855"
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#1f2835"
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f3d19c"
      }
    ]
  },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2f3948"
      }
    ]
  },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#17263c"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#515c6d"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#17263c"
      }
    ]
  }
]
    };
    myMap = new google.maps.Map(element, options);
}

function GetData() {
    var data_all = 'https://api.thingspeak.com/channels/262211/fields/1.json?start=2020-5-28%2000:00:00&offset=3';

    $.ajax({
        url: data_all,
        type: 'GET',
        contentType: "application/json",
        data: {
            format: 'text'
        },
        success: function (data, textStatus, xhr) {
            $.each(data, function (i, item) {
                if (i == 'feeds') {
                    users = item.length;

                    $('#counter').text(item.length - 6700);

                    if (once) {
                        for (var i = 0; i < users - 6700; i++) {
                            addMarker();
                        }
                        once = false;
                    }
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });

    setTimeout(GetData, 600);

}



function randomFloat(min, max) {
    return min + (max - min) * Math.random();
}

function addMarker2() {

    var cars = [
        "¡La revolución será feminista o no será!",
        "¡Ni una menos!",
        "¡Luego diréis que somos cinco o seis!",
        "¡Igualdad, igualdad!",
        "¿Quién dijo que hoy no íbamos a tomar las calles?",
        "Que sepan que somos muchas",
        "¡Las calles también se pueden tomar desde casa!",
        "¡Estamos en las calles!",
        "¡Estamos aquí!",
        "¡Estamos ubicadas!",
        "¡Si nos separan, más nos unimos!"
    ];

    var rand = Math.floor(Math.random() * cars.length);

    var lt = randomFloat(40.408, 40.418);
    var ln = randomFloat(-3.695, -3.692);
    var marker = new google.maps.Marker({
        position: {
            lat: lt,
            lng: ln
        },
        map: myMap,
        icon: 'm2.png'
    });
    var InfoWindow = new google.maps.InfoWindow({
        content: '<h4>' + cars[rand] + '</h4>'
    })
    InfoWindow.open(myMap, marker);

    marker.addListener('click', function () {
        InfoWindow.open(myMap, marker);

    })
}

//40.41361009689965, -3.6933718389796053


function addMarker() {
    var lt = randomFloat(40.408, 40.418);
    var ln = randomFloat(-3.695, -3.692);
    var marker = new google.maps.Marker({
        position: {
            lat: lt,
            lng: ln
        },
        map: myMap,
        icon: 'm.png'
    });
}

$('#send-dialog').click(function () {
    validate();
    if (ap) {
        addMarker2();
        $.get("https://api.thingspeak.com/update.json?api_key=JDJCGRJD46GEN020&field1=125", function (data, status) {});
        GetData();
        document.querySelector('dialog').close();
    }
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate() {
    const $result = $("#result");
    const email = $("#email").val();
    $result.text("");

    if (validateEmail(email)) {
        $result.text(email + " is valid :)");
        $result.css("color", "green");
        ap = true;

    } else {
        $result.text(email + " is not valid :(");
        $result.css("color", "red");
        ap = false;
    }
    return false;
}
