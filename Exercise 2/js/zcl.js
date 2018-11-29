//Saves search and fetches coordinates
function fetchAndProcess(countryCode, postalCode){
    var valid = false;
    (typeof countryCode == 'string' && typeof postalCode == 'integer' ) ? alert('Form not valid') : valid = true
    if(valid){
        url = createAPIurl(countryCode, postalCode)
        fetchData(url)
    }
}
//Fetches data
function fetchData(url) {
    fetch(url)
    .then( (resp) => resp.json())
    .then ( data => {
        processData(data);
    })
    .catch( function() {
        console.log('Not found.')
        alert('Not found')
    })
}
//Creates url to fetch the country code and postal code
function createAPIurl(countryCode, postalCode){
    var url = 'https://api.zippopotam.us/' + countryCode + '/' + postalCode
    return url
}
//Processes data by setting it to the tableInfo table
function processData(data){
    var table = document.getElementById('tableInfo')
    var row = table.children[0].children[1];
    //Check if data contains information
    if(typeof data.country == 'string'){
        console.log(data)
        row.children[0].innerHTML = data.country
        row.children[1].innerHTML = data.places[0].longitude
        row.children[2].innerHTML = data.places[0].latitude
        saveSearch(data.country,data['post code'])
        updateSearchedList();
        findOnMap(data.places[0].latitude, data.places[0].longitude)
   //Else empty information row
    } else {
        for(var i = 0; i<3; i++){
            row.children[i].innerHTML = ''
        }
    }
   
}
//Creates google map
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

//Saves searches to local storage
function saveSearch(country, pc){
    let id = (localStorage.getItem('latestId') === null) ? 0 : localStorage.getItem('latestId');
    id ++;
    localStorage.setItem('latestId', id)
    console.log(id)
    var list = country+','+pc
    localStorage.setItem(id, list);
}
//Sets searched list
function setSearchedListToDiv(){
    var s =document.getElementById('searched').getElementsByTagName('ul')[0]
    console.log(s)
    let number = (localStorage.getItem('latestId') === null) ? 0 : localStorage.getItem('latestId');
    console.log(number)
    for(var i = number; i>number-10 && i>=1; i--){
        var listObject = document.createElement('li')
        listObject.innerHTML = localStorage.getItem(i)
        s.append(listObject)
    }
}
//Updates searched list
function updateSearchedList(){
    console.log('updating list')
    var s =document.getElementById('searched').getElementsByTagName('ul')[0]
    let number = (localStorage.getItem('latestId') === null) ? 0 : localStorage.getItem('latestId');
    if(s.childNodes.length<10){
            var listObject = document.createElement('li')
            listObject.innerHTML = localStorage.getItem(number)
            s.append(listObject)
    } else {
        for(var i = 9; i>=0; i--){
            var listObject = s.childNodes[i]
            listObject.innerHTML = localStorage.getItem(number)
            number--
            console.log(number)
            s.append(listObject)
        }
    }
}
//Run these functions when the page loads
function start(){
    myMap();
    setSearchedListToDiv();
}
