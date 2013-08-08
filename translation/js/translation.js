


//javascript for Translation viewer




//bigger()
//---------
//Bigger is called when the button with the "+" is clicked.
//Bigger sets the "imageSize" then has the images redrawn
//This function is modified for the translation viewer

function bigger()
{

    if(imageSize * zoomRatio <  minZoomSize)
    {
	   imageSize = imageSize * zoomRatio;
 	   var y = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top , 0);
	   var x = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left, 0);
   
       var fWidth  = document.getElementById("myFrame").offsetWidth/2;
       var fLenght = document.getElementById("myFrame").offsetHeight/2;


	   document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left =  ((x-fWidth ) * zoomRatio + fWidth );//(450 - x)/imageWidth * 3/2 + x; 
       document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top  =  ((y-fLenght) * zoomRatio + fLenght);// (600-y)/imageHeight * 3/2 + y;
	
	   imageHeight = imageHeight *zoomRatio;
	   imageWidth = imageWidth *zoomRatio;
	   displayLayers();
	}
}


//smaller()
//---------
//Smaller is called when the button with the "-" is clicked.
//smaller sets the "imageSize" then has the images redrawn
//This function is modified for the translation viewer

function smaller()
{

    if(imageSize * 1/zoomRatio > maxZoomSize)
    {
       imageSize = imageSize * 1/zoomRatio;
	   var y = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top , 0);
	   var x = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left, 0);
	   
       var fWidth  = document.getElementById("myFrame").offsetWidth/2;
       var fLenght = document.getElementById("myFrame").offsetHeight/2;

	   document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left =  ((x-fWidth ) * 1/zoomRatio + fWidth ) ;//(450 - x)/imageWidth * 2/3 + x; 
       document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top  =  ((y-fLenght) * 1/zoomRatio + fLenght); //(600-y)/imageHeight * 2/3 + y;
	
	   imageHeight = imageHeight *1/zoomRatio;
	   imageWidth = imageWidth *1/zoomRatio;

	   displayLayers();
	}
}
