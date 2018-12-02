var list = [];

//Shows all buses on the route
function showBuses(route){
    route = route.split(',')[1]
    var url = 'http://data.foli.fi/siri/vm'
    fetch(url)
    .then( (resp) => resp.json())
    .then ( data => {
        var vehicles = data.result.vehicles;
        var monitored= []
        Object.keys(vehicles).forEach(function(key) {
            if(vehicles[key].monitored == true) monitored.push(vehicles[key])
        });
        var lineMatches = monitored.filter(v => v.lineref == route)
        findBusOnMap(lineMatches)
    })
    .catch( function() {
        alert('Error')
    })
}
//Refreshes map
function refresh(){
    myMap()
}
//Shows bus route
function showRoute(route){
    route = route.split(',')[0]
    var url = 'http://data.foli.fi/gtfs/trips/route/' + route
    fetch(url)
    .then( (resp) => resp.json())
    .then ( data => {
        shape = data[data.length-1].shape_id
        fetch('http://data.foli.fi/gtfs/shapes/' + shape)
        .then( (resp) => resp.json())
        .then ( d => {
             drawRouteOnMap(d)
        })
    })
    .catch( function() {
        alert('Error')
    })
}

//Adds bus lines to dropdown list
function addToDropDown(){
    fetch('https://data.foli.fi/gtfs/routes')
    .then( (resp) => resp.json())
    .then ( data => {
        list = data;
        var r = document.getElementById('busLineSelect')
        for(var i = 0; i<data.length; i++){
            var listObject = document.createElement('option')
            listObject.innerHTML = data[i].route_short_name
            listObject.value = [data[i].route_id, data[i].route_short_name]
            r.append(listObject)
        }
    })
    .catch( function() {
        alert('Error')
    })
}

//Creates google map on the page or refreshes it
function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(60.558363,21.88114),
        zoom:8,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

//Finds the postal code in the map and zooms in it
function findBusOnMap(coordinates) {
    var bounds = new google.maps.LatLngBounds()
    coordinates.map(loc => bounds.extend({lat: loc.latitude, lng: loc.longitude}));
    var gMap = new google.maps.Map(document.getElementById('googleMap'), {
        center:new google.maps.LatLng(60.558363,21.88114),
        zoom:8,
        mapTypeId: 'terrain'
      });
    if(coordinates.length != 0) { gMap.fitBounds(bounds)};
    coordinates.map(loc => new google.maps.Marker({position: new google.maps.LatLng(loc.latitude,loc.longitude), map: gMap}));
    
}

//Finds the route locations and draws it on the map and fits the map size to show the route
function drawRouteOnMap(r) {
    var route = [];
    var bounds = new google.maps.LatLngBounds()
    for(var i =0; i<r.length; i++){
        var listObject = {lat: r[i].lat, lng: r[i].lon}
        route.push(listObject)
        bounds.extend(listObject)
    }
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        mapTypeId: 'terrain'
      });
      map.fitBounds(bounds)

      var routePath = new google.maps.Polyline({
        path: route,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      routePath.setMap(map);
    
}
//Runs the function on page load
function start(){
    myMap();
    addToDropDown();
}

