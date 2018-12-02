//Greys input box's background when writing
function greyOut(event) {
    event.target.style.backgroundColor = "grey";
    if(event.target.value == "") {
        event.target.style.backgroundColor = "white";
    } 
}
//Processes virtual code
function processInformation(vbcElement){
    var vc = vbcElement.value;
    vc = vc.trim()
    console.log(vc.length)
    if(vc.length != 54){
        alert("Virtual code invalid")
    }else{
        var IBAN = vc.substring(1,17)
        var total= vc.substring(17,25)
        total = moveDotTwoDecimals(total)
        var RN = vc.substring(25,48)
        var expiresRaw = vc.substring(vc.length-6,vc.length)
        var date = processDate(expiresRaw)
        RN = cleanString(RN)
        RN = makeNumberSeries(RN)
        console.log('process ', RN)
        var list = [IBAN, total, RN, date]
        setDatatoTable(document.getElementById('dT'), list)
        setBarCode(vc)
    }
}
//Sets bar code
function setBarCode(vc){
    JsBarcode("#barcode", vc);
}
//Processes date to string 
function processDate(raw){
    year = raw.substring(0,2)
    year = '20' + year;
    month = raw.substring(2,4)
    day = raw.substring(4,6)
    if(month == 0 || day == 0){
        var date = 'None'
    }else{
        var date = day + '.' + month + '.' + year
    }
    return date;
}
//Sets processed data to the table
function setDatatoTable(table, list){
    console.log(table)
    var tab = table.getElementsByTagName('p');
    console.log(tab)
    for(var i=0; i<tab.length; i++){
        var v = tab[i].innerHTML.split(':')[0];
        tab[i].innerHTML = v + ': ' + list[i]
    }
}
//Cleans string of zeros from the front
function cleanString(raw){
    var a= 0;
    for(var i = 0; i<raw.length; i++){
        if(raw[i] == '0'){
            a = i;
        } else {
            console.log(raw[i], ' is first non 0')
            break;
        }
    }
    cData = raw.substring(a+1, raw.length)
    return cData
}
//Moves dot by two decimals (80568 -> 805,68)
function moveDotTwoDecimals(raw){
    console.log(raw)
    raw =(parseInt(raw, 0).toFixed(2)/100).toString()
    console.log(raw)
    return raw
}
//Adds beauty spaces between string series (770001 -> 7 70001)
function makeNumberSeries(raw){
    var series = ""
    var a = raw.length%5
    var b = Math.floor(raw.length/5)
    series = raw.substring(0,a)
    for(var i =0; i<b; i++){
        series = series+ ' ' + raw.substring(a, a+5)
        a = a + 5
    }
    return series
}

//Toggles element hide (Event listener in JQuery)
function toggleHide(){
    $('#toggleButton').click(function(){
        $('#informationBox').slideToggle(); 
        var text = $('#toggleButton').text()        
        $('#toggleButton').text(
            text == 'Show'? "Hide": "Show")
    })
}

//Runs these functions when page loads 
function onStart(){
    toggleHide();
}