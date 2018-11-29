function fetchData(url) {
    fetch(url)
    .then( (resp) => resp.json())
    .then ( data => {
        // console.log(data)
        processData(data);
    })
    .catch( function() {
        console.log('error')
    })
}
function createAPIurl(countryCode, postalCode){
    var url = 'https://api.zippopotam.us/' + countryCode + '/' + postalCode
    return url
}
function fetchAndProcess(countryCode, postalCode){
    // console.log(createAPIurl(countryCode, postalCode));
    saveSearch(countryCode,postalCode)
    fetchData(createAPIurl(countryCode, postalCode))
}
function processData(data){
    findOnMap(data.places[0].latitude, data.places[0].longitude)
}
// http://country.io/data/
// function addCountriesToList(){
//     var countryList = fetchCountries('https://api.printful.com/countries')
//     console.log(countryList)
//     var select = document.getElementById('countrySelect')
//     console.log(select)
//     // for(var i = 0; i<countryList.length; i++){
//     //     select.append('<option value="' + countryVal + '">' + country + '</option>')
//     // }
// }
// function fetchCountries(){
//     fetch('datapackage.json')
//     .then( (resp) => resp.json())
//     .then ( data => {
//         console.log(data)
//     })
//     .catch( function() {
//         console.log('error on fetch countries')
//     })
// }
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
// function saveSearch(search){
//     var list = [search];
//     if(getCookie('searchList') != ""){
//         // console.log('get cookie ', getCookie('search'))
//         list.push(getCookie('search'))}
//         // console.log('ok')
//     console.log('list ', list)
//     var json_str = JSON.stringify(list);
//     console.log(json_str)
//    setCookie('search', json_str, 10)
//    console.log('get cookie ', getCookie('searchList'))
// }
function saveSearch(country, pc){
    localStorage.setItem(country, pc);
}
function start(){
    myMap();
    // fetchCountries();
}
// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
