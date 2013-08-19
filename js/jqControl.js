//jqControl.js
//------------
//Most of the functions were written in pure javascript,
//But several functions use high level jquery. This is the file where the 
//jquery is saved. The functions here do a number of different things


 

//This is the code that control the thumbnail bar. 
//If the element with the id collapse is clicked on, the code below runs.
//Depending on the showState variable, the thumbnails come down or go up.
var showState = true;
    $("#collapse").click(function () {
     if(showState) //If the banner is showing and the button was clicked slide up
     {
          //the menu is showing, so hide it
          $("#thumbs_CONTAINER").slideUp(1);
         showState =false;
          $("#thumbs_CONTAINER").css({"height":"0"});
          $("#header_MAIN").css({"height":"50"});
          $("#collapse").children().children().removeClass('collapse-btn').addClass('expand-btn');   
   

     }
     else  //If the button was clicked and the banner was not showing, show it
     {
         //the menu is not showing, so show it
        $("#thumbs_CONTAINER").slideDown(1);
        showState = true; //Set showState to true, so we don't try to show it twice

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
//This is a work around to a nasy side effect. If you release the mouse while not over the iframe, the iframe will not register the release. 
//Not registering the release causes the image to "stick" to the mouse. 
//The code below fixes this issue
$("#wrapper_MAIN").mouseout(function(){
    $('#myFrame')[0].contentWindow.drop();
});


  //open the dialog box whenn the page loads
  $(document).ready(function () {
	   $( "#dialog" ).dialog({ autoOpen: true });  //When the document (page) is loaded show the help box
  });
  
    

  //back button functionality
  $("#top_LEFT").click(function(){
       history.back();              //go back when the button is clicked
  })

   //help button functinality
  $("#helpButton" ).click(function() {
      $( "#dialog" ).dialog( "open" ); //open the help button when clicked
  });