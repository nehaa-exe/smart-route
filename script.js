// SMARTROUTE INTERACTIVE MAP

// Create the map
var travelMap = L.map('travel-map').setView(
    [18.5204, 73.8567],
    12
);

// Add OpenStreetMap tiles
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }
).addTo(travelMap);

setTimeout(function () {
    travelMap.invalidateSize();
}, 300);

console.log("SmartRoute Map Loaded Successfully!");


    
console.log("SMARTROUTE SCRIPT CONNECTED");
  
// STORE ALL DEMO MARKERS
// CNG - Green
var cngMarker = L.marker([18.5204, 73.8567], {
    icon: L.divIcon({
        className: '',
        html: '<div style="background:green;color:white;padding:8px;border-radius:50%;font-weight:bold;">C</div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17]
    })
}).addTo(travelMap).bindPopup("Demo CNG Station");

// EV - Blue
var evMarker = L.marker([18.5314, 73.8446], {
    icon: L.divIcon({
        className: '',
        html: '<div style="background:blue;color:white;padding:8px;border-radius:50%;font-weight:bold;">E</div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17]
    })
}).addTo(travelMap).bindPopup("Demo EV Charging");

// Fuel - Orange
var fuelMarker = L.marker([18.5074, 73.8077], {
    icon: L.divIcon({
        className: '',
        html: '<div style="background:orange;color:white;padding:8px;border-radius:50%;font-weight:bold;">F</div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17]
    })
}).addTo(travelMap).bindPopup("Demo Fuel Station");

// Repair - Purple
var repairMarker = L.marker([18.5167, 73.8500], {
    icon: L.divIcon({
        className: '',
        html: '<div style="background:purple;color:white;padding:8px;border-radius:50%;font-weight:bold;">R</div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17]
    })
}).addTo(travelMap).bindPopup("Demo Car Repair");

// Emergency - Red
var emergencyMarker = L.marker([18.5250, 73.8600], {
    icon: L.divIcon({
        className: '',
        html: '<div style="background:red;color:white;padding:8px;border-radius:50%;font-weight:bold;">!</div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17]
    })
}).addTo(travelMap).bindPopup("Demo Emergency Help");
// SHOW ALL LOCATIONS
function showAll() {
    [cngMarker, evMarker, fuelMarker, repairMarker, emergencyMarker]
        .forEach(marker => marker.addTo(travelMap));
}

// SHOW CNG
function showCNG() {
    showAll();
    [evMarker, fuelMarker, repairMarker, emergencyMarker]
        .forEach(marker => travelMap.removeLayer(marker));
}

// SHOW EV
function showEV() {
    showAll();
    [cngMarker, fuelMarker, repairMarker, emergencyMarker]
        .forEach(marker => travelMap.removeLayer(marker));
}

// SHOW FUEL
function showFuel() {
    showAll();
    [cngMarker, evMarker, repairMarker, emergencyMarker]
        .forEach(marker => travelMap.removeLayer(marker));
}

// SHOW REPAIR
function showRepair() {
    showAll();
    [cngMarker, evMarker, fuelMarker, emergencyMarker]
        .forEach(marker => travelMap.removeLayer(marker));
}

// SHOW EMERGENCY
function showEmergency() {
    showAll();
    [cngMarker, evMarker, fuelMarker, repairMarker]
        .forEach(marker => travelMap.removeLayer(marker));
}
// DESTINATION SEARCH


function searchDestination() {
    var destination = document.getElementById("destination-input").value;
    var category = document.getElementById("service-category").value;

    if (destination.trim() === "") {
        alert("Please enter a destination!");
        return;
    }

    fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(destination))
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);

                travelMap.setView([lat, lon], 13);

                // Filter selected service
                if (category === "all") {
                    showAll();
                } else if (category === "cng") {
                    showCNG();
                } else if (category === "ev") {
                    showEV();
                } else if (category === "fuel") {
                    showFuel();
                } else if (category === "repair") {
                    showRepair();
                } else if (category === "emergency") {
                    showEmergency();
                }

                L.marker([lat, lon])
                    .addTo(travelMap)
                    .bindPopup("Destination: " + destination)
                    .openPopup();

            } else {
                alert("Destination not found!");
            }
        })
        .catch(error => {
            alert("Unable to search. Please try again.");
        });
}

// SHOW MY CURRENT LOCATION

function showMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                travelMap.setView([lat, lon], 15);

                L.marker([lat, lon])
                    .addTo(travelMap)
                    .bindPopup("You are here!")
                    .openPopup();
            },
            function() {
                alert("Location permission denied or unavailable.");
            }
        );
    } else {
        alert("Location is not supported by your browser.");
    }
}