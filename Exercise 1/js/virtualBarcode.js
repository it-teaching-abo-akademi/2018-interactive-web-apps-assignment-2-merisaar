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
        var RN = vc.substring(25,47)
        var expiresRaw = vc.substring(vc.length-6,vc.length)
        var date = processDate(expiresRaw)
        RN = cleanString(RN)
        console.log(RN)
        total = cleanString(total)
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
    cData = parseInt(raw, 0)
    cData = '' + cData
    return cData
}
//Toggles element hide
function hide(event, element){
    if (element.style.display === "none") {
        element.style.display = "block";
        console.log(event.target)
        event.target.innerHTML = 'Hide'
    } else {
        element.style.display = "none";
        event.target.innerHTML = 'Show'
    }
}
