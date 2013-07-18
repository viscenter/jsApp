//cite_obj_interface2.js
//This is an interface file between the visual front end and the back end 
//The front makes function calls to this file, and this file calls the back end.
//In  the future, this code will be inserted in to the front end, so the front end can directly call the back end.
//In development this file was helpful.


"use strict";

//setUpObj
//----------------
//This function creates an "citeUrn" object. This object provides the image for the Main display in the front end
//The information to build the object is hard coded in this file. This in a non ideal solution.
var chad_cite;
function setUpObj()
{
  var txt=document.getElementById("buildD");
  chad_cite = new citeUrn("/amphoreus.hpcc.uh.edu", //set server
  "/tomcat/chsimg/Img",                               //set dir
  "cite",                                             // set CITE namespace
  "fufolioimg",                                       //set CITE work ID
  "ChadRGB.Chad" ,                                    //set collection ID
  "1000",                                             //set default Image size
   1,                                                 //set start page
   "updateTargetID",								  //set the update target ID
   	233 );                                			  //set MaxPage
}




//setUpObj_layers
//----------------
//This function creates an "citeUrn" object. This object provides the image for the Main display in the front end
//Setting up the layers requires us to use the CITE system and not the the CHS systems used above.
var chad_cite_Layers;
function setUpObj_Layers()
{
  var txt=document.getElementById("buildD");
  chad_cite_Layers = new citeUrn("/amphoreus.hpcc.uh.edu", //set server
  "/tomcat/chsimg/Img?&amp;",                               //set dir
  "cite",                                             // set CITE namespace
  "fufolioimg",                                       //set CITE work ID
  "ChadRGB.Chad" ,                                    //set collection ID
  "2000",                                             //set default Image size
   1,                                                 //set start page
   "updateTargetID",								  //set the update target ID
   	233 );                                			  //set MaxPage
}
//"http://amphoreus.hpcc.uh.edu/tomcat/chsimg/Img?&amp;request=GetBinaryImage&amp;w=150&amp;urn=urn:cite:fufolioimg:ChadPOC.Chad-1929-077"







//setUpObj_layers_local
//----------------
//This function creates an "citeUrn" object. This object provides the image for the Main display in the front end
//Setting up the layers requires us to use the CITE system and not the the CHS systems used above.
var localCopyCITE;
function setUpObj_Layers_local()
{
  var txt=document.getElementById("buildD");
  localCopyCITE = new citeUrn("./bigImage/", //set server
  "",                               //set dir
  "",                                             // set CITE namespace
  "",                                       //set CITE work ID
  "" ,                                    //set collection ID
  "",                                             //set default Image size
   1,                                                 //set start page
 "updateTargetID",								  //set the update target ID
   	233 );                                			  //set MaxPage
}




//getPrev
//-----------------
//This function calls the back end object "citeUrn" member function prevPage.
//Then this function finds the display image with the tag "layer_original", and changes the source
//The one line of this function will in inserted into the front end code.
function getPrev()
{
 	// change the source for the main image
 	document.getElementById("layer_original").src=chad_cite.prevPage();

}

//getNextImage
//-----------------
//This function calls the back end object "citeUrn" member function nextPage.
//Then this function finds the display image with the tag "layer_original", and changes the source
//The one line of this function will in inserted into the front end code.
function getNextImage()
{

 	// change the source for the main image
 	document.getElementById("layer_original").src=chad_cite.nextPage();	

}


//GoToPage
//-----------------
//This function calls the back end object "citeUrn" member function setPage.
//Then this function finds the display image with the tag "layer_original", and changes the source
function GoToPage(pageNum)
{

	document.getElementById("layer_original").src = chad_cite.setPage(pageNum);

}




//setUpThumbNail
//---------------------
//setUpThumNail creates a "citeUrn" object for the sole goal of providing the front end with 
//ThumbNails. Most of the setup information is the same as the first object, but the default Image size is much smaller
//It is handy for navigating the images
var ThumbNail_cite;
function setUpThumbNail()
{
 
   ThumbNail_cite = new citeUrn("/amphoreus.hpcc.uh.edu", //set server
  "/tomcat/chsimg/Img",                               //set dir
  "cite",                                             // set CITE namespace
  "fufolioimg",                                       //set CITE work ID
  "ChadRGB.Chad" ,                                    //set collection ID
  "70",                                             //set default Image size
   1,                                                 //set start page
   "updateTargetID",
    233 );                                //set the update target ID
}


//getThumbNail
//--------------------
//This function returns the the value returned by the setPage.
//We can only assume that the front end is setting the "src" of a element with this returned value.
//The one line of this function will in inserted into the front end code.
function getThumbNail(page)
{
	//document.getElementById("img_thumbnail").scr  = ThumbNail_cite.setPage(page);
	return  ThumbNail_cite.setPage(page);
}

//getLayerUrl
//--------------------
//This is a stub. The front end uses this call to simulate layers
//If the first input variable is equal to "original". It returns result of  setPage
function getLayerUrl(theLayer, pageNum)
{
   /*chad_cite_layer.pageNumber = pageNum;
   chad_cite_layer.layerName = theLayers;

   chad_cite_layer.buildUrl();*/
   
   if(theLayer == "original")
   {
    return chad_cite.setPage(pageNum);
   }
   else  
   {return "http://infoforest.vis.uky.edu/InfoForest/jsDev/testing/sample/Chad055_" + theLayer;}
}



