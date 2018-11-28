function something() {
    alert('ok')
}
function greyOut(event) {
    // event.target.style.color =
    console.log('test')
}
function processInformation(vbcElement){
    var vc = vbcElement.value;
    console.log(vc.length)
    if(vc.length =! 54){
        alert("Virtual code invalid")
    }else{
        console.log(vc.trim())
        var IBAN = vc.substring(1,17)
        console.log(IBAN)
        var total= vc.substring(17,25)
        console.log(total)
        var RN = vc.substring(25,47)
        console.log(RN)
        var expiresRaw = vc.substring(vc.length-6,vc.length)
        console.log(expiresRaw)
        var date = processDate(expiresRaw)
        RN = cleanString(RN)
        total = cleanString(total)
        var list = [IBAN, total, RN, date]
        console.log(list)
        setDatatoTable(document.getElementById('dT'), list)
        //     Account No. Sp. 79 4405 2020 0360 82
        // Total: 4,883.15
        // Reference number: 86851 62596 19897
        // Due Date: 12.06.2010
        // Virtual code: 479440520200360820048831500000000868516259619897100612
    }
}
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
function setDatatoTable(table, list){
    console.log(table)
    var tab = table.getElementsByTagName('p');
    console.log(tab)
    for(var i=0; i<tab.length; i++){
        var v = tab[i].innerHTML.split(':')[0];

        tab[i].innerHTML = v + ': ' + list[i]
    }
}
function cleanString(raw){
    cData = parseInt(raw, 0)
    return cData
    
}
