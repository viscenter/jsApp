"use strict";

//Enable these for pulling from CITE server
//setUpObj_Layers();    //Running the helper function to set up the CITE objects
//setUpThumbNail();		//Same as above for smaller, thumbnail images


//Comment out when enabling CITE server
//Setup local layers
setUpObj_Layers_local(); //This make a fake CITE object that uses local files
						 //This is pretty hacky. Now we can use a global object called localCopyCITE
//Setup local thumbnails
setUpFakeThumb(); //more very hacky code



//REMOVE the line below to use a real CITE server
chad_cite_Layers =   localCopyCITE;//This line over writes the cite object with the local fake cite objct
			 

//All possible layers
var totalListOfLayers = new Array(); //We only create this once and keep this array till the end
								 //It will hold a max of 5 images for our uses
//All enabled layers that we are currently viewing
var currentListOfLayers = new Array(); //We only create this once and keep this array till the end
									//It's elements will always be a subset of the totalListOfImages


//This value holds the state of the zoom for all images
var imageSize = 888; //This is bad form. Currently original value is lost when scaling.


//Zoom limits
var maxZoomSize = imageSize /5;  
var minZoomSize = imageSize * 10 ;

//Scaling factor for zoom
var zoomRatio = 6/5;

//Dimensional properties			
var imageHeight = -1;
var imageWidth = -1;


//Creating index for layers
var layers={
	"1912":0,
	"1929":1,
	"1962":2,
	"2003":3,
	"2010":4
}

//Creating index for layers
var layerNames  =new Array();
layerNames[0]= "2010";
layerNames[1]= "2003";
layerNames[2]= "1962";
layerNames[3]= "1929";
layerNames[4]= "1912";



//amount we move when we pan
var panDistance = 10;

//The height of the upperheader of the webPage
var headerSize = 50;
   
//scroll sensitivity, how long does a user have to scroll before the message is send
var scrollThresh = 10;



//These are the discriptions for the thumbnails
var descr =  new Array();
descr[0] = "The high-resolution composite of images taken in 2010 at the Lichfield Cathedral. This page contains Matthew 17:22-Matthew 18:3"
descr[1] = "The composite of images taken in different light spectrums that have been processed by performing mathematical equations to the individual pixels to render a new image. This page contains Matthew 17:22-Matthew 18:3.    "  ; 
descr[2] = "The set of images taken of the Chad Gospels in 2003. This page contains Matthew 17:22-Matthew 18:3."; 
descr[3] = "The set of images taken of the Chad Gospels in 1962. This page contains Matthew 17:22-Matthew 18:3.  "; 
descr[4] = "The set of images taken of the Chad Gospels in 1929. This page contains Matthew 17:22-Matthew 18:3.";


//Request page from CITE server
//chad_cite_Layers.setPage(79);

//Populate layer list
getlayers();

//Populate list of thumbnails from HTML
setThumb()

/* Functions for changing pages
function prev()
{ 
	chad_cite_Layers.prevPage();
	loadImageInThumb();
    getlayers();

}

function next()
{
	chad_cite_Layers.nextPage();
    loadImageInThumb();
    getlayers();

}
*/

//bigger()
//---------
//Bigger is called when the button with the "+" is clicked.
//Bigger sets the "imageSize" then has the images redrawn
//Accounts for zoom around the center
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
//Accounts for zoom around the center
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



//The 4 functions below are pan control functions. They all call the pan() function but with different
//arguments. The functions simulate the dragging movements. Mapped to the arrow keys by whenKeyPressed().
function panUp()
{
     var t = document.getElementById("myFrame").offsetHeight;
     pan(0,-t/panDistance);
}
function panDown()
{
     var t = document.getElementById("myFrame").offsetHeight;
     pan(0,t/panDistance);
}
function panRight()
{
     var t = document.getElementById("myFrame").offsetWidth;
     pan(t/panDistance,0);
}

function panLeft()
{
     var t = document.getElementById("myFrame").offsetWidth;
     pan(-t/panDistance,0);
}

function pan(deltaX,deltaY)
{
       document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left =  parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left,0) + deltaX;
       document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top  =  parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top,0) + deltaY;

}


//getLayers()
//-------------
//GetLayers uses the cite object called chad_cite_Layers to 
//generate an array of all the layers called totalListOfLayers.
//This could lead to great load times.
//FIX: Needs to clear image objects when changing pages.
function getlayers()
{
	var i = 0;
	for( name in layers)
	{
		var temp = new Image();
		chad_cite_Layers.setLayer(layerNames[i]);
		
		//This is the image listener. Waits until the image is loaded, then gets the dimensions if not yet defined
        //Without this, Javascript tries to get dimensions before image is loaded
		temp.onload = function() {                   
					    //Update thumbnail to indicate loaded image
					    fakeThumb.setLayer(this.id);
		                document.getElementsByClassName("thumb")[parseInt(this.getAttribute("number"))].children[0].src = fakeThumb.fake();
					    
					    if(imageHeight === -1)
		   								imageHeight = parseInt(totalListOfLayers[this.getAttribute("number")].height,0)*1.5;
	   				    if(imageWidth === -1)
		  								 imageWidth = parseInt(totalListOfLayers[this.getAttribute("number")].width,0)* 1.5;
										 
		}
		
		//Write to the console where the program is looking for the image
		console.log(chad_cite_Layers.fake());
		
		//Setup all attributes of this image object
		temp.src = chad_cite_Layers.fake();
        temp.setAttribute("number",i.toString())
		temp.name ="SingleMainImage";
		temp.id = layerNames[i];
		temp.style.position = 'absolute';
		temp.width = 592;
		temp.height = 789;
		//Write to the image source to the console
		console.log(temp.src);
		//Push temp object to the totalListOfLayers
		totalListOfLayers.push(temp);
		//Increment the loop
		i = i + 1;
		
	
	}

	//Clears out old layer images. Useful when changing pages.
	while(document.getElementById("myFrame").contentDocument.getElementById("imageDiv").hasChildNodes() == true)
	{
		document.getElementById("myFrame").contentDocument.getElementById("imageDiv").removeChild(getElementById("myFrame").contentDocument.getElementById("imageDiv").childNodes[0]);
	}

	
}



//displayLayers()
//-----------------------
//This function displays the images that are in the currentListOfLayers.
//To do this it removes all images that were being displayed and then iterates 
//the currentListOfLayers array. It essentially redraws everything.

function displayLayers()
{
	//Clears out old layer images.
	while(document.getElementById("myFrame").contentDocument.getElementById("imageDiv").hasChildNodes() == true)
	{
		document.getElementById("myFrame").contentDocument.getElementById("imageDiv").removeChild(document.getElementById("myFrame").contentDocument.getElementById("imageDiv").childNodes[0]);
	}
	
	//Iterates through all selected layers, sets their updated opacity, and displays
	var counter = 0;
	while(counter < currentListOfLayers.length)
	{
		currentListOfLayers[counter].align="center";
		currentListOfLayers[counter].width = imageWidth;
		currentListOfLayers[counter].height = imageHeight;
		currentListOfLayers[counter].style.opacity = 1.0/(counter+1) ;//currentListOfLayers.length;
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
	    
	    //Sets thumb class to selected for CSS
	    var pic = layerValue.children[0];
	    pic.className = "selected";

	}
	else
	{
		console.log("the value was set to false");
		layerValue.setAttribute("checked","true");
		
    	//Sets thumb class to unselected for CSS
    	var pic = layerValue.children[0]
		pic.className = "unselected"
    

		var i = 0;
		while(i < currentListOfLayers.length)
		{
			if( layerValue.id == currentListOfLayers[i].id)
			{
				//Move unchecked item to end of array and remove it
				currentListOfLayers[i]= currentListOfLayers[currentListOfLayers.length - 1];
				currentListOfLayers.pop();		
			}
		i = i + 1;
		}
	}
	
	//Render changes in the display area
	displayLayers();
	
}


//whenFrameLoads()
//-----------------
//This function runs when the iframe has finished loading
//It does some house keeping things for us.
function whenFrameLoads()
{
	//Centers the iframe and moves it below the navigation bar
	var fWidth = document.getElementById("myFrame").offsetWidth/2;
	document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left = fWidth - imageSize/2;
	document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top = headerSize; //Size of the navigation bar above the image
	
	//Updates the description element
 	clearText();

}

//Sets the description element when mousing over a thumbnail
function whenThumbMouseOver(that)
{
	document.getElementById("description").innerHTML = that.getAttribute("description");
}

//Sets the description element's default state
function clearText()
{
 document.getElementById("description").innerHTML ="<p><strong>Description:</strong> Above is the data set of the Chad Gospels that were imaged with permission from the Lichfield Cathedral in England. Select the layers you wish to view—either on its own or in comparison with another—by clicking on the thumbnail.</p></div>";
}


//setThumb()
//There are several thumbnails at the top of the webpage and the correct image must be loaded into them.
function upDateThumb()
{
	/* DOUBLE CHECK: Used during page changes?
	var listOfThumb = document.getElementsByClassName("thumb");
	for(var i = 0; i<listOfThumb.length;i++)
	{
		listOfThumb[i].children[0].src = totalListOfLayers[i].src;
		listOfThumb[0][i].style.opacity = .3;
		alert("setThumb")
	}
	*/

     //Get the thumb elements from the HTML
     var y = document.getElementsByClassName("thumb");

     //Auto-select the first thumbnail if nothing is selected
     if(currentListOfLayers.length == 0)
     {
       var x = document.getElementsByClassName("unselected");
       x[0].className = "selected";
       y[0].setAttribute("checked","false");
       currentListOfLayers.push(totalListOfLayers[0]);
       displayLayers();
    }
    var listOfDest=[];

    //Links thumbnail to a description of that layer. Used by whenThumbMouseOver()
    /*
    var listOfDest=[];
    listOfDest[0]="The 2010 high-resolution imaging of the Chad Gospels by the Vis Center at Lichfield Cathedral."
    listOfDest[1]="TThe 2003 imaging of the Chad Gospels."  ; 
    listOfDest[2] ="The 1962 imaging of the Chad Gospels."; 
    listOfDest[3]="The 1929 imaging of the Chad Gospels."; 
    listOfDest[4] ="The 1912 imaging of the Chad Gospels.";

    */
    listOfDest[0] = descr[0];
    listOfDest[1] = descr[1];
    listOfDest[2] = descr[2];
    listOfDest[3] = descr[3];
    listOfDest[4] = descr[4];
    //Adding the descriptions to y div
    for(var i = 0; i<y.length;i++)
    {
	   y[i].setAttribute("description","<p>" + listOfDest[i]);
    }
}

//Mouse wheel zoom functionality
//Google Chrome specific
//Changing these values changes how "quickly" one zooms
function whenMouseWheel(event)
	{
			if( event.wheelDeltaY > scrollThresh){
				bigger();       
			 }
			if(event.wheelDeltaY < -scrollThresh ){
				 smaller();
			} 
	}


//whenKeyPressed(data)
//--------------------
//This function alows for the keyboard to control the panning. This function matches up
//keyboard code to the pan directions.
//37 is the keyboard key for right. 40 is the keyboard key for up.
function whenKeyPressed(data)
	{
	 //console.log(data);
	 //console.log(data.keyCode);
	 if(data.which == 37)      panRight();
	 else if(data.which == 38) panDown(); 
	 else if(data.which == 39)  panLeft();
	 else if(data.which == 40 ) panUp();
	}










