


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
    var stateWidth = document.getElementById("myFrame").offsetWidth;
        $(window).resize(function() 
        {
     //  console.log("you moved tthe window?");
    
       diff = (stateWidth - document.getElementById("myFrame").offsetWidth)/2;
       pos = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left,0);
       document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left = pos - diff;
       stateWidth = document.getElementById("myFrame").offsetWidth;
});

$("#wrapper_MAIN").mouseout(function(){
    $('#myFrame')[0].contentWindow.drop();
});








//$("#myFrame").click(function () {
//  $("#thumbs_CONTAINER").show(2000);
//});
