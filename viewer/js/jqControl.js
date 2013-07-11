

var COOKIE_TEXT = "infoForest=true"
 var showState = true;
 


    $("#collapse").click(function () {
     if(showState)
     {
          $("#thumbs_CONTAINER").slideUp(1);
         showState =false;
       //   $("#thumbs_CONTAINER").css({"z-index":1});
          $("#thumbs_CONTAINER").css({"height":"0"});
          $("#header_MAIN").css({"height":"50"});
   

     }
     else
     {
      
        $("#thumbs_CONTAINER").slideDown(1);
         showState = true;
       //  $("#thumbs_CONTAINER").css({"z-index":-1});

        $("#thumbs_CONTAINER").css({"height":"210px"});
        $("#header_MAIN").css({"height":"260px"}); 

     }   
         
    });
    
    
//the function below sets the image to the center of the iframe when the window is resized
   
    var stateWidth = document.getElementById("myFrame").offsetWidth;     
        $(window).resize(function() 
        {    
          diff = (stateWidth - document.getElementById("myFrame").offsetWidth)/2;
          pos = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left,0);
          document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left = pos - diff;
          stateWidth = document.getElementById("myFrame").offsetWidth;
        });


//this functioin "drops" the image if the mouse leave the image.
//It calles a function written the clean.html file
$("#wrapper_MAIN").mouseout(function(){
    $('#myFrame')[0].contentWindow.drop();
});


var i,listOfCookies=document.cookie.split(";");
var beenHereBefore = false;
for(i in listOfCookies)
{
     console.log(listOfCookies[i]);
     if(listOfCookies[i] == COOKIE_TEXT){
          beenHereBefore = true;
         console.log("setting here to true")
     }
}

//The following code places a tooltip on the screen,
//Then after serveral seconds removes it
console.log(beenHereBefore);
if(beenHereBefore === false)
{
    $( "#thumbs_CONTAINER" ).tooltip();
    
      $("#thumbs_CONTAINER").mouseenter();
      window.setTimeout(removeTip, 10000);
      

     // document.cookie = COOKIE_TEXT;
}
function removeTip(){
     $("#thumbs_CONTAINER").tooltip('disable');
}