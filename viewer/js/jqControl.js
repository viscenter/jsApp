
//$("#myFrame").click(function () {
  //$("span:last-child").hide("fast", function () {
    // use callee so don't have to name the function
    //$(this).prev().hide("fast", arguments.callee);
//    console.log("in jq");
//    $("#thumbs_CONTAINER").hide("slow");
//  });
//});
 console.log("file is in");
 
  //  $("#header_MAIN").mouseover(function () {
    $("#header_MAIN").hover(function () {
   // console.log("over");
          $("#thumbs_CONTAINER").show("fast");
    });
    
  
    //$(("#myFrame").contents().find("#imageDiv")).hover(function () {
    $("#wrapper_MAIN").hover(function () {
  //    console.log("in");
         $("#thumbs_CONTAINER").hide("fast");
    });



//$("#myFrame").click(function () {
//  $("#thumbs_CONTAINER").show(2000);
//});
