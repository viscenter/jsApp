
//$("#myFrame").click(function () {
  //$("span:last-child").hide("fast", function () {
    // use callee so don't have to name the function
    //$(this).prev().hide("fast", arguments.callee);
//    console.log("in jq");
//    $("#thumbs_CONTAINER").hide("slow");
//  });
//});
 console.log("file is in");
 var showState = true;
 
  //  $("#header_MAIN").mouseover(function () {
  //  $("#header_MAIN").hover(function () {
   // console.log("over");
   //       $("#thumbs_CONTAINER").show("fast");
  //  });
    
  
    //$(("#myFrame").contents().find("#imageDiv")).hover(function () {
 //   $("#wrapper_MAIN").hover(function () {
  //    console.log("in");
//         $("#thumbs_CONTAINER").hide("fast");
  //  });

    $("#collapse").click(function () {
     if(showState)
     {
        $("#thumbs_CONTAINER").hide("fast");
         showState =false;
     }
     else
     {
        $("#thumbs_CONTAINER").show("fast");
         showState = true;
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



//$("#myFrame").click(function () {
//  $("#thumbs_CONTAINER").show(2000);
//});
