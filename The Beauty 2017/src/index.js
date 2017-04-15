"use strict"

import Custom from './components/readJSON.js';

/*$.getJSON("sluzba.json", function(result){
    var itemz = $.map(result, function(i){
        return i.firstName;
    });
    //$("div").append('<td>' + itemz[0] + " " + '</td>');
    document.write(itemz[0]);
    console.log(itemz.length);
});*/



/*var items = [];
$.getJSON( "sluzba.json", function( data ) {
$.each( data, function( key, val ) {
    items.push(JSON.stringify(val));    
  });
  document.write(items[0]);
});

var temp = items.length;
document.write(temp);*/

/*import Custom from './components/custom.js';

let custom = new Custom();
document.getElementById("app").innerHTML = custom.renderList();*/

/*let array = "";

$(document).ready(function(){
    $("button").click(function(){
        $.getJSON("sluzba.json", function(result){
            $.each(result, function(i, field){
                $("div").append(JSON.stringify(field) + "</br>");
                array += JSON.stringify(field);
            });
        });
    });
});

document.write(array[1]);*/

/*var items = [];
$.getJSON( "sluzba.json", function( data ) {
  $.each( data, function( key, val ) {
    items.push( JSON.stringify(val) );
  });
 
$( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});*/

/*$( "<ul/>", {
    "class": "lista",
    html: items.join( "" )
  }).appendTo( "body" );
});*/

