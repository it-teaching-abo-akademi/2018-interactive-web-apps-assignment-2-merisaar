var list = [];
var shape;

function fetchBuses(url) {
    fetch(url)
    .then( (resp) => resp.json())
    .then ( data => {
        processData(data);
    })
    .catch( function() {
        console.log('error')
        alert('Error')
    })
}
function createAPIurl(countryCode, postalCode){
    var url = 'http://data.foli.fi/gtfs/routes/' + countryCode + '/' + postalCode
    return url
}
function fetchAndProcess(countryCode, postalCode){
    saveSearch(countryCode,postalCode)
    fetchData(createAPIurl(countryCode, postalCode))
}

function processData(data){

}

function showBuses(route){
    var a = list.filter(l => l.agency_id==route)
    console.log(a)
}

function refresh(){

}
function showRoute(route){
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
        console.log('error')
        alert('Error')
    })
}
//Adds route IDs to dropdown list
function addToDropDown(){
    fetch('https://data.foli.fi/gtfs/routes')
    .then( (resp) => resp.json())
    .then ( data => {
        list = data;
        var r = document.getElementById('routeSelect')
        for(var i = 0; i<data.length; i++){
            var listObject = document.createElement('option')
            listObject.innerHTML = data[i].route_short_name
            listObject.value = data[i].route_id
            r.append(listObject)
        }
    })
    .catch( function() {
        console.log('error')
        alert('Error')
    })
}
function getBusLocations(){
    fetch('https://data.foli.fi/siri/vm')
    .then( (resp) => resp.json())
    .then ( data => {
        console.log(data)
        findOnMap()
    })
    .catch( function() {
        console.log('error')
        alert('Error')
    })
}
//Creates google map on the page
function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

//Finds the postal code in the map and zooms in it
function findOnMap(latitude, longitude) {
    var uluru = new google.maps.LatLng(latitude,longitude);
    var map=new google.maps.Map(document.getElementById("googleMap"),{zoom: 15, center: uluru});
    var marker = new google.maps.Marker({position: uluru, map: map});
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
function start(){
    myMap();
    addToDropDown();
}

