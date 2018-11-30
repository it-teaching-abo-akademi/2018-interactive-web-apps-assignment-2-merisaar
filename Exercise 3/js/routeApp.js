function fetchData(url) {
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
    var url = 'https://api.zippopotam.us/' + countryCode + '/' + postalCode
    return url
}
function fetchAndProcess(countryCode, postalCode){
    saveSearch(countryCode,postalCode)
    fetchData(createAPIurl(countryCode, postalCode))
}
function processData(data){
    findOnMap(data.places[0].latitude, data.places[0].longitude)
}

function showBuses(){
    
}

function refresh(){

}

function showRoute(){

}
function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
function findOnMap(latitude, longitude) {
    var mapProp= {
        center:new google.maps.LatLng(latitude, longitude),
        zoom:15,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    
}

// function saveSearch(country, pc){
//     localStorage.setItem(country, pc);
// }
function start(){
    myMap();
    // fetchCountries();
}

