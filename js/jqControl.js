//jqControl.js
//------------
//Most of the functions were written in pure javascript,
//But several functions use high level jquery. This is the file where the 
//jquery is saved. The functions here do a number of different things


 

//This is the code that control the thumbnail bar. 
//If the element with the id collapse is clicked on, the code below runs.
//Depending on the showState variable, the thumbnails come down or go up.
    $("#collapse").click(function () {
     if(showState)
     {
          //the menu is showing, so hide it
          $("#thumbs_CONTAINER").slideUp(1);
         showState =false;
          $("#thumbs_CONTAINER").css({"height":"0"});
          $("#header_MAIN").css({"height":"50"});
          $("#collapse").children().children().removeClass('collapse-btn').addClass('expand-btn');   
   

     }
     else
     {
         //the menu is not showing, so show it
        $("#thumbs_CONTAINER").slideDown(1);
        showState = true;

        $("#thumbs_CONTAINER").css({"height":"210px"});
        $("#header_MAIN").css({"height":"260px"}); 

          $("#collapse").children().children().removeClass('expand-btn').addClass('collapse-btn');   
        
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


  //open the dialog box whenn the page loads
  $(document).ready(function () {
	   $( "#dialog" ).dialog({ autoOpen: true });
  });
  
    

  //back button functionality
  $("#top_LEFT").click(function(){
       history.back();
  })

   //help button functinality
  $("#helpButton" ).click(function() {
      $( "#dialog" ).dialog( "open" ); 
  });