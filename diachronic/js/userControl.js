"use strict";

        //use the code below for real (furman CITE server)
	
	setUpObj_Layers();      //Running the helper function to set up the CITE objects
	//setUpThumbNail();//Same as above for smaller images
	
	
	
	setUpObj_Layers_local(); //This make a fake CITE object that uses local files
	                         //This is pretty hacky. Now we can use a global object called localCoppCITE
	
	setUpFakeThumb(); //more very hacky code
	
	
	
	
	                                   //REMOVE the line below to use a real CITE server
	chad_cite_Layers =   localCopyCITE;//This line over writes the cite object with the local fake cite objct
	             

	
	var totalListOfLayers = new Array(); //We only create this once and keep this array till the end
	                                 //It will hold a max of 5 images for our uses
     
        var currentListOfLayers = new Array(); //We only create this once and keep this array till the end
                                        //This is holds the images that we are currently viewing. 
                                        //It's elements will always be a subset of the totalListOfImages
  
  


	var imageSize = 888;//This is bad form
  			     //This value holds the state of the zoom for all images
  	
  	
  	
  	var maxZoomSize = imageSize /5;  
  	var minZoomSize = imageSize * 10 ;
  	
  	
  	var zoomRatio = 6/5;
  					
	var scale = 1.0;
    var imageHeight = -1;
    var imageWidth =-1;
    


  var layers={
	"1912":0,
	"1929":1,
	"1962":2,
	"2003":3,
	"2010":4
}
var layerNames  =new Array();
layerNames[0]= "2010";
layerNames[1]= "2003";
layerNames[2]= "1962";
layerNames[3]= "1929";
layerNames[4]= "1912";




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

}

function next()
{
	chad_cite_Layers.nextPage();
    loadImageInThumb();
    getlayers();

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



//The 4 functions below are pan control functions. They all call the the pan(,) function but with different
//arguments. These functions are not currently in use. The functions simulate the dragging movments. 
//They were used when we had buttons to pan, but now. We use drag as a sole means a panning
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
function getlayers()
{
	var i = 0;
	for( name in layers)
	{
		var temp = new Image();
		//chad_cite_Layers.setLayer(name);
		//chad_cite_layers.setLayer(layerNames[i]);
		chad_cite_Layers.setLayer(layerNames[i]);
		temp.onload = function() {
                                  //This is the image lisener, a pretty standard js desgine pattern,
                                  //As soon as the image is loaded the code in the lisener will run.
						                   
					    fakeThumb.setLayer(this.id);
					    //document.getElementsByClassName("thumb")[parseInt(this.getAttribute("number"))].children[0].src = fakeThumb.fake() //= this.src;
		                            document.getElementsByClassName("thumb")[parseInt(this.getAttribute("number"))].children[0].src = fakeThumb.fake() //= this.src;
					    if(imageHeight === -1)
		   								imageHeight = parseInt(totalListOfLayers[this.getAttribute("number")].height,0)*1.5;
	   				    if(imageWidth ===-1)
		  								 imageWidth = parseInt(totalListOfLayers[this.getAttribute("number")].width,0)* 1.5;
										 
		}
		console.log(chad_cite_Layers.fake());
		temp.src =chad_cite_Layers.fake();

        	temp.setAttribute("number",i.toString())
		temp.name ="SingleMainImage";
		//temp.id = layerNames[counter];
		temp.id = layerNames[i];
		temp.style.position = 'absolute';
		temp.width = 592 ;
		temp.height =789 ;
		console.log(temp.src);
		totalListOfLayers.push(temp);   
		i = i +1;
		
	
	}


	while(document.getElementById("myFrame").contentDocument.getElementById("imageDiv").hasChildNodes() == true)
	{
		document.getElementById("myFrame").contentDocument.getElementById("imageDiv").removeChild(getElementById("myFrame").contentDocument.getElementById("imageDiv").childNodes[0]);
	}

	
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
	


	var counter = 0;
	while(counter < currentListOfLayers.length)
	{
		currentListOfLayers[counter].align="center";

		
		currentListOfLayers[counter].width  =imageWidth;
		currentListOfLayers[counter].height  = imageHeight;
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
	document.getElementById("myFrame").contentDocument.getElementById("draggable").style.top =50; //Size of the header bar above the image
	
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
    listOfDest[0]="The 2010 high-resolution imaging of the Chad Gospels by the Vis Center at Lichfield Cathedral."
    listOfDest[1]="TThe 2003 imaging of the Chad Gospels."  ; 
    listOfDest[2] ="The 1962 imaging of the Chad Gospels."; 
    listOfDest[3]="The 1929 imaging of the Chad Gospels."; 
    listOfDest[4] ="The 1912 imaging of the Chad Gospels.";
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




//whenKeyPressed(data)
//--------------------
//This function alows for the keyboard to control the panning. This function matches up
//keyboard code the pan directions
//37 is the keybaord key for right.
//40 is the keyboard key for up.



function whenKeyPressed(data)
{
 //console.log(data);
 //console.log(data.keyCode);
 if(data.which == 37)      panRight();
 else if(data.which == 38) panDown(); 
 else if(data.which == 39)  panLeft();
 else if(data.which == 40 ) panUp();
}










