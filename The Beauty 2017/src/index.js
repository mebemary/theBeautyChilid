"use strict"

let data;

//puts data from sluzba.json to an array
$.getJSON("sluzba.json", function(result){
    data = $.each(result, function(el){
        return el;
    });
    displayTable(data, 5, 0);
});

//clears rows in the table, besides the first one
function clearTable(){
    var myTable = document.getElementById("dataTable");
    while(myTable.rows.length > 1) {
        myTable.deleteRow(1);
    }
}

//displays table with pagination
function displayTable (array, perPage, startFrom) {
    var myTable = document.getElementById("dataTable");
    var rowNumber = 0;
    for (var i=0; (i<perPage) && startFrom < array.length; i++) {
        var row = myTable.insertRow(i+1);
        var cell = row.insertCell(rowNumber);
        cell.innerHTML = "<tr><tbody><td>" + array[startFrom].id + "</td>";
        cell = row.insertCell(++rowNumber);
        cell.innerHTML = "<tr>" + array[startFrom].firstName + "</td>";
        cell = row.insertCell(++rowNumber);
        cell.innerHTML = "<td>" + array[startFrom].lastName + "</td>";
        cell = row.insertCell(++rowNumber);
        cell.innerHTML = "<td>" + array[startFrom].dateOfBirth + "</td>";
        cell = row.insertCell(++rowNumber);
        cell.innerHTML = "<td>" + array[startFrom].function + "</td>";
        cell = row.insertCell(++rowNumber);
        cell.innerHTML = "<td>" + array[startFrom].experience + "</td></tbody></tr>";
        startFrom++;
        rowNumber = 0;
    }
}

//REACTION TO BUTTONS
window.onload = function () {
    //reacts to clicking a button and filters data
    document.getElementById("filter").onclick = function(){
            var selected = document.getElementById("select").value;
            var label = document.getElementById("textField").value;
            var label2 = document.getElementById("textField2").value;
            var array =[];
            if ((selected === "firstName") || (selected === "lastName") || (selected === "function")) {
                array = filterWord(data, label, selected);
            } else if ((selected === "id") ||(selected === "experience")) {
                array = filterRange(data, label, label2, selected);
            } else if (selected === "dateOfBirth") {
                array = filterDate(data, label, label2);
            }
            clearTable();
            displayTable(array, 5, 0);
    };

    //reacts to clicking a button and sorts data
    document.getElementById("sort").onclick = function(){
            var selected = document.getElementById("selectSort").value;
            var array =[];
            if ((selected === "ascending")) {
                array = ascSort(data);
            } else if ((selected === "descending")) {
                array = dscSort(data);
            } else if ((selected === "alphabetically")) {
                array = alphSort(data);
            }
            clearTable();
            displayTable(array, 5, 0);
    };

    document.getElementById("pageOne").onclick = function(){
        clearTable();
        displayTable(data, 5, 0);
    };

    document.getElementById("pageTwo").onclick = function(){
        clearTable();
        displayTable(data, 5, 5);
    };

    document.getElementById("pageThree").onclick = function(){
        clearTable();
        displayTable(data, 5, 10);
    };
}

//FILTERS
//filters parameters containing name and function
function filterWord (array, val, param) {
    let tempArray = [];
    for (var i=0; i<array.length; i++) {
        let temp = "";
        //chosen one depends on param
        if(param === "firstName"){
            temp = array[i].firstName; 
        } else if(param === "lastName") {
            temp = array[i].lastName;
        } else if (param === "function") {
            temp = array[i].function;
        }
        //if it's similar to anything in an array, it's pushed to a result array (case insensitive)
        if(temp.toLowerCase().match(val) || temp.toUpperCase().match(val) || temp.match(val)) {
            tempArray.push(array[i]);
            }
        }
    return tempArray;
}

//filters experience and id in given range
function filterRange (array, val1, val2, param) {
    let tempArray = [];
    for (var i=0; i<array.length; i++) {
        let temp = "";
        if(param === "id"){
            temp = array[i].id; 
        } else if(param === "experience") {
            temp = array[i].experience;
        }
        if((temp >= val1) && (temp <= val2)) {
            tempArray.push(array[i]);
            }
        }
    return tempArray;
}

//filters date by year, month and day in a given range
function filterDate (array, val1, val2) {
    let tempArray = [];
    //dates which make the range
    let date1 = parseDate(String(val1));
    let date2 = parseDate(String(val2));
    for (var i=0; i<array.length; i++) {
        let temp = parseDate(array[i].dateOfBirth);
        if((temp >= date1) && (temp <= date2)) {
                    tempArray.push(array[i]);  
        }
    }
    return tempArray;
}

//parse date to a format without fullstops
function parseDate(dateStr) {
    var date = dateStr;
    var temp = String(date).indexOf(' ');
    date = date.substring(0, temp != -1 ? temp : date.length);
    date = String(date).split('.');
    var day = date[0];
    var month = date[1] - 1; //January = 0
    var year = date[2];
    return new Date(year, month, day);
}

//SORTING
//sorting an array in ascending order by id
function ascSort(array) {
    for (var i = 1; i < array.length; i++) {
        var tmp = array[i];
        for (var j = i - 1; j >= 0 && ((array[j].id - tmp.id) > 0); j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = tmp;
    }
    return array;
}

//sorting an array in descending order by id
function dscSort(array) {
    for (var i = 1; i < array.length; i++) {
        var tmp = array[i];
        for (var j = i - 1; j >= 0 && (((array[j].id - tmp.id) < 0)); j--)  {
            array[j + 1] = array[j];
        }
        array[j + 1] = tmp;
    }
    return array;
}

//sorting an array alphabetically by first name
function alphSort(array) {
    for (var i = 1; i < array.length; i++) {
        var tmp = array[i];
        for (var j = i - 1; j >= 0 && ((array[j].lastName).localeCompare(tmp.lastName)) === 1; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = tmp;
    }
    return array;
}