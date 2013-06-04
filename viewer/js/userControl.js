	setUpObj_Layers();      //Running the helper function to set up the CITE objects
	setUpThumbNail();//Same as above for smaller images
	
	totalListOfLayers = new Array(); //We only create this once and keep this array till the end
	                                 //It will hold a max of 5 images for our uses
     
    currentListOfLayers = new Array(); //We only create this once and keep this array till the end
                                        //This is holds the images that we are currently viewing. 
                                        //It's elements will always be a subset of the totalListOfImages
  
  

	imageSize = 750;//This is bad form
  			     //This value holds the state of the zoom for all images
  					

  
  	
   var layers = {
   "ChadRGB.Chad":0,
   "ChadPOC.Chad-Multispectral1-":1,
   "ChadPOC.Chad-Background-":2,
   "ChadPOC.Chad-Latin-":3,
   "ChadPOC.Chad-English-":4,
   "ChadPOC.Chad-2003-":5,
   "ChadPOC.Chad-1962-":6,
   "ChadPOC.Chad-1929-":7
   }
   










//html was here
//////////////////////////////////////////////////////////////////////////////











 chad_cite_Layers.setPage(79);
 getlayers();

setThumb()


function prev()
{ 
	chad_cite_Layers.prevPage();
    getlayers();
   // displayLayers();
}

function next()
{
	chad_cite_Layers.nextPage();
    //for( var i=0; i<totalListOfLayers.length;i++)
   // {
    //	totalListOfLayers[i].onload = displayLayers();				
    //	alert(i + " onload");							
    //}
    getlayers();
    //displayLayers()
}

//bigger()
//---------
//Bigger is called when the button with the "+" is clicked.
//Bigger sets the "imageSize" then has the images redrawn
function bigger()
{

	
	var y = window.frames['myFrame'].document.getElementById("draggable").style.top;
	var x = window.frames['myFrame'].document.getElementById("draggable").style.left;
	//window.frames['myFrame'].document.getElementById("draggable").style.left = parseInt(x,0) - (( (3.0/2.0)*(imageSize)  - imageSize)/2)  ;//parseInt(x,0) - ((2.0/3.0)*(imageSize/4) )/2;
	//window.frames['myFrame'].document.getElementById("draggable").style.top  = parseInt(y,0) - (( (3.0/2.0)*(imageSize)  - imageSize)/2)
	
	window.frames['myFrame'].document.getElementById("draggable").style.left = (parseInt(x,0)+(3/2)*imageSize/2) -450;//parseInt(x,0) - (( (2.0/3.0)*(imageSize)  - imageSize)/2)  ;//parseInt(x,0) - ((2.0/3.0)*(imageSize/4) )/2;
	window.frames['myFrame'].document.getElementById("draggable").style.top  = (parseInt(y,0)+(3/2)*imageSize/2)-600'
	
	imageSize = (imageSize*3)/2;
	displayLayers();
}


//smaller()
//---------
//Smaller is called when the button with the "-" is clicked.
//Bigger sets the "imageSize" then has the images redrawn
function smaller()
{
	var y = window.frames['myFrame'].document.getElementById("draggable").style.top;
	var x = window.frames['myFrame'].document.getElementById("draggable").style.left;
	window.frames['myFrame'].document.getElementById("draggable").style.left = (parseInt(x,0)+(2/3)*imageSize/2) -450;//parseInt(x,0) - (( (2.0/3.0)*(imageSize)  - imageSize)/2)  ;//parseInt(x,0) - ((2.0/3.0)*(imageSize/4) )/2;
	window.frames['myFrame'].document.getElementById("draggable").style.top  = (parseInt(y,0)+(2/3)*imageSize/2) -600;//parseInt(y,0) - (( (2.0/3.0)*(imageSize)  - imageSize)/2)
	imageSize = 2*(imageSize/3);
	displayLayers();
}

//getLayers()
//-------------
//GetLayers uses the cite object called chad_cite_Layers, to 
//generate a an array of all the layers called totalListOfLayers.
//This could lead to great load times.
function getlayers()
{
	var counter = 0;
	while(counter < 8)
	{
		if(totalListOfLayers[counter] != undefined)
		{
			delete totalListOfLayers[counter];
			//alert("delete"); //works now
		}
		counter = counter + 1;
	}
	
	
	totalListOfLayers = [];

	for (name in layers)
	{
		temp = new Image();
		//chad_cite_Layers.setLayer(layerNames[counter]);
		chad_cite_Layers.setLayer(name);
		//temp.onload = frustration;
	    temp.src = chad_cite_Layers.update();
	    temp.height = imageSize;
	    temp.width = imageSize;
	    temp.name ="SingleMainImage";
	    //temp.id = layerNames[counter];
	    temp.id = name;
	    temp.style.position = 'absolute'
		totalListOfLayers.push(temp);   
		//alert("hello");
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
		currentListOfLayers[counter].width =  imageSize;
		currentListOfLayers[counter].height = imageSize; 
		currentListOfLayers[counter].style.opacity = 1.0/currentListOfLayers.length;
		//(window.frames['myFrame'].document.getElementById("imageDiv")).appendChild(currentListOfLayers[counter]);
		document.getElementById("myFrame").contentDocument.getElementById("imageDiv").appendChild(currentListOfLayers[counter]);
		counter = counter + 1;
	}
	
}


//function frustration()
//{
//	
//	currentListOfLayers = [];
//	for(var i = 0; i < totalListOfLayers.length; i++)
//	{
//		updateLayers(i);
//	}
//	displayLayers();
//}

//imageLoaded(layerIndex)
//------------
//This is the code that will run after an image has fully loaded
//function imageLoaded( layerIndex)
//{
//  var counter =  0;
// while(counter  < currentListOfLayers.length)
//	{
//		if(currentListOfLayer[counter].id == layerNames[layerIndex])  //if this is true, then the Image that was just loaded needs to be displayed
//		{
//		listOfChildren = window.frames['myFrame'].document.getElementById("imageDiv").childNodes;
//		var innerCounter = 0;
//		alert("imageLoaded " + layerIndex);
//
//			while(innerCounter > listOfChildren)
//			{
//			if(listOfChildren[innerCounter] == layerNames[layerIndex])
//				{
//					 alert("imageLoaded " + layerIndex);
//					window.frames['myFrame'].document.getElementById("imageDiv").removeChild(listOfChildren[innerCounter]);
//					window.frames['myFrame'].document.getElementById("imageDiv").appendChild(currentListOfLayers[counter]);
//				}		
//			}
//		}
//		counter = counter + 1;
// }	
//}


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
	 	//alert("set to true");
	 	layerValue.checked = false
	 	layerValue.setAttribute("checked","false")
	    var pic = layerValue.children[0]
	    pic.className = "selected";
	   // pic.width=pic.width+20
	   // pic.height=pic.height+20
	   // pic.style.opacity = 1;
	}
	else
	{
	//layerValue.checked = true
	//alert("set to false");
	layerValue.setAttribute("checked","true")
    var pic = layerValue.children[0]
	pic.className = "unselected"
	//pic.width=pic.width-20
	//pic.height=pic.height-20
	//pic.style.opacity = .3;

	var i = 0;
	while(i < currentListOfLayers.length)
		{
			if( layerValue.id == "Check_"+currentListOfLayers[i].id)
			{
				currentListOfLayers[i]= currentListOfLayers[currentListOfLayers.length - 1];
				currentListOfLayers.pop()		
			}
		i = i + 1;
		}
	}
	displayLayers();
	
}

//setThumb()
//There are several thumb nails at the top of the webpage and the correct image must be loaded into them.
function upDateThumb()
{
//alert("setThumb")
	var listOfThumb = document.getElementsByClassName("thumb");
	for(var i = 0; i<listOfThumb.length;i++)
	{
		listOfThumb[i].children[0].src = totalListOfLayers[i].src;
		//listOfThumb[0][i].style.opacity = .3;
		//alert("setThumb")
	}
}
upDateThumb()




