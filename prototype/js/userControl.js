"use strict";

        //use the code below for real (furman CITE server)
	
	setUpObj_Layers();      //Running the helper function to set up the CITE objects
	//setUpThumbNail();//Same as above for smaller images
	
	
	
	setUpObj_Layers_local(); //This make a fake CITE object that uses local files
	                         //This is pretty hacky. Now we can use a global object called localCoppCITE
	
	setUpFakeThumb(); //more very hacky code
	
	
	
	
	                                   //REMOVE the line below to use a real CITE server
	//chad_cite_Layers =   localCopyCITE;//This line over writes the cite object with the local fake cite objct
	             

	
	var totalListOfLayers = new Array(); //We only create this once and keep this array till the end
	                                 //It will hold a max of 5 images for our uses
     
        var currentListOfLayers = new Array(); //We only create this once and keep this array till the end
                                        //This is holds the images that we are currently viewing. 
                                        //It's elements will always be a subset of the totalListOfImages
  
  


	var imageSize = 592;//This is bad form
  			     //This value holds the state of the zoom for all images
  	
  	
  	
  	var maxZoomSize = imageSize /5;  
  	var minZoomSize = imageSize * 10 ;
  	
  	
  	var zoomRatio = 6/5;
  					
	var scale = 1.0;
    var imageHeight = -1;
    var imageWidth =-1;
    

  /*
   var layers = {
   "ChadRGB.Chad":0,
   "ChadPOC.Chad-Multispectral1-":1,
 //  "ChadPOC.Chad-Background-":2,
 
 //  "ChadPOC.Chad-Latin-":3,
 //  "ChadPOC.Chad-English-":4,
   "ChadPOC.Chad-2003-":3,
   "ChadPOC.Chad-1962-":4,
   "ChadPOC.Chad-1929-":5
   }
*/
  var layers={
	"Chad-RGB-141":0,
	"Chad-Intc-141":1,
	"Chad-Linf-141":2,
	"Chad-Skew-141":3,
	"Chad-StdDev-141":4
  }


//html was here
//////////////////////////////////////////////////////////////////////////////



chad_cite_Layers.setPage(79);
getlayers();

setThumb()

function prev()
{ 
	chad_cite_Layers.prevPage();
	loadImageInThumb();
    getlayers();

   // displayLayers();
}

function next()
{
	chad_cite_Layers.nextPage();
    loadImageInThumb();
    getlayers();

    //displayLayers()
}

function loadImageInThumb()
{
	var listOfThumb = document.getElementsByClassName("thumb");
	for(var i = 0; i<listOfThumb.length;i++)
	{
		listOfThumb[i].children[0].src =  "./assets/page_thumbs/thumb_loader.gif";

	}

}

//bigger()
//---------
//Bigger is called when the button with the "+" is clicked.
//Bigger sets the "imageSize" then has the images redrawn
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



function panUp()
{
     var t = document.getElementById("myFrame").offsetHeight;
     pan(0,-t/10);
}
function panDown()
{
     var t = document.getElementById("myFrame").offsetHeight;
     pan(0,t/10);
}



function panRight()
{
     var t = document.getElementById("myFrame").offsetWidth;
     pan(t/10,0);
}

function panLeft()
{
     var t = document.getElementById("myFrame").offsetWidth;
     pan(-t/10,0);
}



function pan(deltaX,deltaY)
{
       document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left =  parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left,0) + deltaX;
       document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top  =  parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top,0) + deltaY;

}

//getLayers()
//-------------
//GetLayers uses the cite object called chad_cite_Layers, to 
//generate a an array of all the layers called totalListOfLayers.
//This could lead to great load times.
/*
function getlayers()
{
	var i = 0;
	for( name in layers)
	{
		var temp = new Image();
		chad_cite_Layers.setLayer(name);
		temp.onload = function() {
			                   
					    fakeThumb.setLayer(this.id);
					    document.getElementsByClassName("thumb")[parseInt(this.getAttribute("number"))].children[0].src = fakeThumb.fake() //= this.src;
		                            if(imageHeight === -1)
		   								imageHeight = totalListOfLayers[this.getAttribute("number")].height;
	   				    if(imageWidth ===-1)
		  								 imageWidth = totalListOfLayers[this.getAttribute("number")].width;
										 
		}
		console.log(chad_cite_Layers.fake());
		temp.src =chad_cite_Layers.fake();

        	temp.setAttribute("number",i.toString())
		temp.name ="SingleMainImage";
		//temp.id = layerNames[counter];
		temp.id = name;
		temp.style.position = 'absolute';
		temp.width = "592";
		temp.height ="789";
		console.log(temp.src);
		totalListOfLayers.push(temp);   
		i = i +1;
		
	
	}

*/

	var counter = 0;
	while(counter < 5)
	{
		if(totalListOfLayers[counter] != undefined)
		{
			delete totalListOfLayers[counter];
			//alert("delete"); //works now
		}
		counter = counter + 1;
	}
	
	
	totalListOfLayers = [];
	var i = 0;

	for (name in layers)
	{
		var temp = new Image();
		var hold = i;
		
		chad_cite_Layers.setLayer(name); // use the real citeObject to talk to a real cite service
		
		
		temp.onload = function() {
		                            document.getElementsByClassName("thumb")[parseInt(this.getAttribute("number"))].children[0].src = this.src; 
		                            if(imageHeight === -1)
		   								imageHeight = totalListOfLayers[this.getAttribute("number")].height;
	   								if(imageWidth ===-1)
		  								 imageWidth = totalListOfLayers[this.getAttribute("number")].width;     
		                          };
	    temp.src = chad_cite_Layers.update();  // use the real citeObject to talk to a real cite service
	    
	    temp.setAttribute("number",i.toString())
	    temp.name ="SingleMainImage";
	    //temp.id = layerNames[counter];
	    temp.id = name;
	    temp.style.position = 'absolute';
	    temp.width = "592";
	    temp.height ="789";
	    console.log(temp.src);
		totalListOfLayers.push(temp);   

		i = i +1;
	}

	
	while(document.getElementById("myFrame").contentDocument.getElementById("imageDiv").hasChildNodes() == true)
	{
		document.getElementById("myFrame").contentDocument.getElementById("imageDiv").removeChild(getElementById("myFrame").contentDocument.getElementById("imageDiv").childNodes[0]);
	}
		//while(window.frames['myFrame'].document.getElementById("imageDiv").hasChildNodes() == true)
	//{
	//	window.frames['myFrame'].document.getElementById("imageDiv").removeChild(window.frames['myFrame'].document.getElementById("imageDiv").childNodes[0]);
	//}
	
}



//displayLayers()
//-----------------------
//This function displays the images that are in the currentListOfLayers.
//To do this it removes all images that were being displayed and then, iterates 
//the currentListOfLayers array.
function displayLayers()
{
	
	
	while(document.getElementById("myFrame").contentDocument.getElementById("imageDiv").hasChildNodes() == true)
	{
		document.getElementById("myFrame").contentDocument.getElementById("imageDiv").removeChild(document.getElementById("myFrame").contentDocument.getElementById("imageDiv").childNodes[0]);
	}
	
	//while(window.frames['myFrame'].document.getElementById("imageDiv").hasChildNodes() == true)
	//{
	//	window.frames['myFrame'].document.getElementById("imageDiv").removeChild(window.frames['myFrame'].document.getElementById("imageDiv").childNodes[0]);
	//}

	var counter = 0;
	while(counter < currentListOfLayers.length)
	{
		currentListOfLayers[counter].align="center";
		// =  currentListOfLayers[counter].width * scale ;//imageSize
		//= currentListOfLayers[counter].height *scale ;//imageSize; 
		
		currentListOfLayers[counter].width  =imageWidth;
		currentListOfLayers[counter].height  = imageHeight;
		currentListOfLayers[counter].style.opacity = 1.0/(counter+1) ;//currentListOfLayers.length;
		//(window.frames['myFrame'].document.getElementById("imageDiv")).appendChild(currentListOfLayers[counter]);
		document.getElementById("myFrame").contentDocument.getElementById("imageDiv").appendChild(currentListOfLayers[counter]);
		counter = counter + 1;
	}
	
}





//updateLayers()
//--------------
//This function is called when the check boxes are changed.
//The array called currentListOfLayers is generated here.

function updateLayers(layerValue)
{
	console.log("The layer called "+ layerValue.id+ " is being updated")
	if(layerValue.getAttribute("checked") == "true")
	{
	    var layerNum = parseInt(layerValue.getAttribute("layerNum"))
	 	currentListOfLayers.push(totalListOfLayers[layerNum])
	 	console.log("the value == true")
	 	layerValue.checked = false;
	 	layerValue.setAttribute("checked","false");
	    var pic = layerValue.children[0];
	    pic.className = "selected";

	}
	else
	{
		console.log("the value was set to false");
		layerValue.setAttribute("checked","true");
		
    	var pic = layerValue.children[0]
		pic.className = "unselected"
    

		var i = 0;
		while(i < currentListOfLayers.length)
		{
			if( layerValue.id == currentListOfLayers[i].id)
			{
				currentListOfLayers[i]= currentListOfLayers[currentListOfLayers.length - 1];
				currentListOfLayers.pop();		
			}
		i = i + 1;
		}
	}
	
	
	displayLayers();
	
}





//whenFrameLoads()
//-----------------
//This function runs when the iframe has finished loading
//It does some house keeping things for us.
function whenFrameLoads()
{
	

	var fWidth  = document.getElementById("myFrame").offsetWidth/2;

	document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left =fWidth - imageSize/2;
	document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top =300; //Size of the header bar above the image
	
        clearText();



}


function whenThumbMouseOver(that)
{
	document.getElementById("description").innerHTML = that.getAttribute("description");
}
function clearText()
{
 document.getElementById("description").innerHTML =" <p><strong>Description:</strong> Above is the data set of the Chad Gospels that were imaged with permission from the Lichfield Cathedral in England. Select the layers you wish to view—either on its own or in comparison with another—by clicking on the thumbnail.</p></div>";
}


//setThumb()
//There are several thumb nails at the top of the webpage and the correct image must be loaded into them.
function upDateThumb()
{
//alert("setThumb")
	var listOfThumb = document.getElementsByClassName("thumb");
	for(var i = 0; i<listOfThumb.length;i++)
	{
		//listOfThumb[i].children[0].src = totalListOfLayers[i].src;
		//listOfThumb[0][i].style.opacity = .3;
		//alert("setThumb")
	}

     var y = document.getElementsByClassName("thumb");

     //Make the first Image selected
     if(currentListOfLayers.length == 0)
     {
       var x = document.getElementsByClassName("unselected");
       x[0].className = "selected";
       y[0].setAttribute("checked","false");
       currentListOfLayers.push(totalListOfLayers[0]);
       displayLayers();
    }
    var listOfDest=[];
    listOfDest[0]="The high-resolution composite of images taken in 2010 at the Lichfield Cathedral. This page contains Matthew 17:22-Matthew 18:3"
    listOfDest[1]="The composite of images taken in different light spectrums that have been processed by performing mathematical equations to the individual pixels to render a new image. This page contains Matthew 17:22-Matthew 18:3.    "  ; 
    listOfDest[2] ="The set of images taken of the Chad Gospels in 2003. This page contains Matthew 17:22-Matthew 18:3."; 
    listOfDest[3]="The set of images taken of the Chad Gospels in 1962. This page contains Matthew 17:22-Matthew 18:3.  "; 
    listOfDest[4] ="The set of images taken of the Chad Gospels in 1929. This page contains Matthew 17:22-Matthew 18:3.";
    //listOfDest[5] ="n/a";  
    //listOfDest[6]="n/a";
    //listOfDest[7]="n/a";

    //Adding the descriptions
    for(var i = 0; i<y.length;i++)
    {
	   y[i].setAttribute("description","<p>" + listOfDest[i]);
    }
    
   // window.scroll = whenScrolled;
    

}

function whenScrolled()
{
 alert("scroll event detected! " + window.pageXOffset + " " + window.pageYOffset);
 // note: you can use window.innerWidth and window.innerHeight to access the width and height of the viewing area
}

function whenMouseWheel(event)
{
//alert(event.wheelDeltaY) ;
        if( event.wheelDeltaY > 10){
			bigger();       
	     }
        if(event.wheelDeltaY <-10 ){
             smaller();
    	}
    	 
}



function whenKeyPressed(data)
{
 //console.log(data);
 //console.log(data.keyCode);
 if(data.which == 37)      panRight();
 else if(data.which == 38) panDown(); 
 else if(data.which == 39)  panLeft();
 else if(data.which == 40 ) panUp();
}










