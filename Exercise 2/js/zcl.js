function fetchData(url) {
    fetch(url)
    .then( (resp) => resp.json())
    .then (processData())
    .catch( function() {
        console.log('error')
    })
}
function createAPIurl(countryCode, postalCode){
    var url = 'api.zippopotam.us/' + countryCode + '/' + postalCode
    return url
}
function fetchAndProcess(countryCode, postalCode){
    fetchData(createAPIurl(countryCode, postalCode))
}
function processData(data){
    console.log('do something with this ' + data)
}
// http://country.io/data/
function addCountriesToList(countryList){
    var select = document.getElementById('countrySelect')
    for(var i = 0; i<countryList.length; i++){
        select.append('<option value="' + countryVal + '">' + country + '</option>')
    }
}
function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}