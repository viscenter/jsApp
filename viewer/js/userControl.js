"use strict";


	setUpObj_Layers();      //Running the helper function to set up the CITE objects
	setUpThumbNail();//Same as above for smaller images
	
	var totalListOfLayers = new Array(); //We only create this once and keep this array till the end
	                                 //It will hold a max of 5 images for our uses
     
    var currentListOfLayers = new Array(); //We only create this once and keep this array till the end
                                        //This is holds the images that we are currently viewing. 
                                        //It's elements will always be a subset of the totalListOfImages
  
  

	var imageSize = 750;//This is bad form
  			     //This value holds the state of the zoom for all images
  					
	var scale = 1.0;
    var imageHeight = -1;
    var imageWidth =-1;
  	
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
    upDateThumb()
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
    upDateThumb()
    //displayLayers()
}

//bigger()
//---------
//Bigger is called when the button with the "+" is clicked.
//Bigger sets the "imageSize" then has the images redrawn
function bigger()
{
	if(imageHeight === -1)
		imageHeight == totalListOfLayers[0].height;
	if(imageWidth ===-1)
		imageWidth = totalListOfLayers[0].width;

	
	var y = document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top;
	var x =document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left;
	//window.frames['myFrame'].document.getElementById("draggable").style.left = parseInt(x,0) - (( (3.0/2.0)*(imageSize)  - imageSize)/2)  ;//parseInt(x,0) - ((2.0/3.0)*(imageSize/4) )/2;
	//window.frames['myFrame'].document.getElementById("draggable").style.top  = parseInt(y,0) - (( (3.0/2.0)*(imageSize)  - imageSize)/2)   ;
	
document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left = parseInt(x,0)-(((3/2)*imageSize -imageSize)/2)*((400/imageSize-parseInt(x,0))/400.0/imageSize);// -450;//parseInt(x,0) - (( (2.0/3.0)*(imageSize)  - imageSize)/2)  ;//parseInt(x,0) - ((2.0/3.0)*(imageSize/4) )/2;
document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top  = parseInt(y,0)-(((3/2)*imageSize -imageSize)/2)*((600/imageSize-parseInt(y,0))/600.0/imageSize);
	
	imageHeight = imageHeight *3.0 / 2.0;
	imageWidth = imageWidth *3.0 / 2.0;
	displayLayers();
}


//smaller()
//---------
//Smaller is called when the button with the "-" is clicked.
//Bigger sets the "imageSize" then has the images redrawn
function smaller()
{
	if(imageHeight === -1)
		imageHeight == totalListOfLayers[0].height;
	if(imageWidth ===-1)
		imageWidth = totalListOfLayers[0].width;



	var y =document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top;
	var x =document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left;
	document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left = parseInt(x,0)-(((2/3)*imageSize -imageSize)/2)*((400.0/imageSize-parseInt(x,0))/400.0/imageSize);// -450;//parseInt(x,0) - (( (2.0/3.0)*(imageSize)  - imageSize)/2)  ;//parseInt(x,0) - ((2.0/3.0)*(imageSize/4) )/2;
	document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top  = parseInt(y,0)-(((2/3)*imageSize -imageSize)/2)*((600.0/imageSize-parseInt(y,0))/600.0/imageSize) ;//-600;//parseInt(y,0) - (( (2.0/3.0)*(imageSize)  - imageSize)/2)  ;
	//imageSize = 2*(imageSize/3);
	
	imageHeight = imageHeight *2.0 / 3.0;
	imageWidth = imageWidth *2.0 / 3.0;

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
	var i = 0;

	for (name in layers)
	{
		var temp = new Image();
		var hold = i;
		//chad_cite_Layers.setLayer(layerNames[counter]);
		chad_cite_Layers.setLayer(name);
		temp.onload = function() {document.getElementsByClassName("thumb")[parseInt(this.getAttribute("number"))].children[0].src = this.src};//{document.getElementsByClassName("thumb")[hold].children[hold].src = totalListOfLayers[hold].src };
	    temp.src = chad_cite_Layers.update();
	  //temp.height ="100%";// imageSize;
	  //temp.width = imageSize;
	    temp.setAttribute("number",i.toString())
	    temp.name ="SingleMainImage";
	    //temp.id = layerNames[counter];
	    temp.id = name;
	    temp.style.position = 'absolute'
		totalListOfLayers.push(temp);   
		//alert("hello");
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
		currentListOfLayers[counter].height  = imageWidth;
		currentListOfLayers[counter].style.opacity = 1.0/currentListOfLayers.length;
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



