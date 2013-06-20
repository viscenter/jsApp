"use strict";


	setUpObj_Layers();      //Running the helper function to set up the CITE objects
	setUpThumbNail();//Same as above for smaller images
	
	var totalListOfLayers = new Array(); //We only create this once and keep this array till the end
	                                 //It will hold a max of 5 images for our uses
     
    var currentListOfLayers = new Array(); //We only create this once and keep this array till the end
                                        //This is holds the images that we are currently viewing. 
                                        //It's elements will always be a subset of the totalListOfImages
  
  

	var imageSize = 592;//This is bad form
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
	loadImageInThumb();
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
		//listOfThumb[0][i].style.opacity = .3;
		//alert("setThumb")
	}

}

//bigger()
//---------
//Bigger is called when the button with the "+" is clicked.
//Bigger sets the "imageSize" then has the images redrawn
function bigger()
{
	if(imageHeight === -1)
		imageHeight = totalListOfLayers[0].height;
	if(imageWidth ===-1)
		imageWidth = totalListOfLayers[0].width;

	
	var y = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top , 0);
	var x = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left, 0);
   
    var fWidth  = document.getElementById("myFrame").offsetWidth/2;
    var fLenght = document.getElementById("myFrame").offsetHeight/2;


	document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left =  ((x-fWidth ) * 3/2 + fWidth );//(450 - x)/imageWidth * 3/2 + x; 
    document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top  =  ((y-fLenght) * 3/2 + fLenght);// (600-y)/imageHeight * 3/2 + y;
	
	imageHeight = imageHeight *3.0 / 2.0;
	imageWidth = imageWidth *3.0 / 2.0;
	displayLayers();
}


//smaller()
//---------
//Smaller is called when the button with the "-" is clicked.
//smaller sets the "imageSize" then has the images redrawn
function smaller()
{

	   if(imageHeight === -1)
		   imageHeight = totalListOfLayers[0].height;
	   if(imageWidth ===-1)
		   imageWidth = totalListOfLayers[0].width;


	var y = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top , 0);
	var x = parseInt(document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left, 0);

    var fWidth  = document.getElementById("myFrame").offsetWidth/2;
    var fLenght = document.getElementById("myFrame").offsetHeight/2;

	
	document.getElementById("myFrame").contentDocument.getElementById("draggable").style.left =  ((x-fWidth ) * 2/3 + fWidth ) ;//(450 - x)/imageWidth * 2/3 + x; 
    document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top  =  ((y-fLenght) * 2/3 + fLenght); //(600-y)/imageHeight * 2/3 + y;
	
	
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
		temp.onload = function() {
		                            document.getElementsByClassName("thumb")[parseInt(this.getAttribute("number"))].children[0].src = this.src;
		                            if(imageHeight === -1)
		   								imageHeight = totalListOfLayers[this.getAttribute("number")].height;
	   								if(imageWidth ===-1)
		  								 imageWidth = totalListOfLayers[this.getAttribute("number")].width;     
		                          };
	    temp.src = chad_cite_Layers.update();
	    temp.setAttribute("number",i.toString())
	    temp.name ="SingleMainImage";
	    //temp.id = layerNames[counter];
	    temp.id = name;
	    temp.style.position = 'absolute';
	    temp.width = "592";
	    temp.height ="789";
	    
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

	}
	else
	{
		//alert("set to false");
		layerValue.setAttribute("checked","true")
		
    	var pic = layerValue.children[0]
		pic.className = "unselected"
    

		var i = 0;
		while(i < currentListOfLayers.length)
		{
			if( layerValue.id == "Check_"+currentListOfLayers[i].id)
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
}


function whenThumbMouseOver(that)
{
	document.getElementById("description").innerHTML = that.getAttribute("description");
}
function clearText()
{
 document.getElementById("description").innerHTML =" <p><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>";
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
    listOfDest[0] ="one";  listOfDest[1]="two"  ; listOfDest[2] ="three";
    listOfDest[3] ="four"; listOfDest[4]="five"; listOfDest[5] ="six";
    listOfDest[6] ="seven";  listOfDest[7]="eight";
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
        if( event.wheelDeltaY > 0){
			bigger();       
	     }
        else if(event.wheelDeltaY <0 ){
             smaller();
    	}
    	 
}

upDateThumb()