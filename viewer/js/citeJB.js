//citeJB.js
//This file creates is able to create CITE Objects.
//CITE objects are able to comunicate with standard cite servers

//How to use this Object
//A cite object must be constructed. If construction fails the object return false.
//After construction, an object can fulfill the following methodes
// nextPage
// prevPage
// setPage
// getRegion

//The methodes  above all return a string that is the source of an image.




//citeUrn
//------------------------------
//Constructor for citeUrn objects. This function build the object that can be used to access CITE data.
//There is some simple type checking


function citeUrn(server,dir, citeNS, workID, collectionID ,defaultImageSize, pageNumber, updateTargetID, maxPage)
{


 //crude type checking
  if (typeof pageNumber != 'number') alert("wrong type for pageNumber"); 
  if (typeof server != 'string') alert("wrong type for server");
  if (typeof dir != 'string') alert("wrong type for dir"); 
  if (typeof citeNS != 'string') alert("wrong type for citeNS"); 
  if (typeof workID != 'string') alert("wrong type for WorkID"); 
  if (typeof collectionID != 'string') alert("wrong type for collectionID");
  if (typeof defaultImageSize != 'string') alert("wrong type for defaultImageSize");
  if (typeof updateTargetID != 'string') alert("wrong type for updateTargetID");
  if (typeof maxPage != "number") alert("wrong type for maxPage --> " + (typeof maxPage));

  //fill in the attributes for the object
  this.server = server;
  this.dir = dir;
  this.citeNS = citeNS;
  this.workID = workID;
  this.collectionID = collectionID;
  this.defaultImageSize = defaultImageSize;
  this.pageNumber = pageNumber;
  this.updateTargetID = updateTargetID;
  this.maxPage = maxPage;


   //buildUrl (helper)
   //-------------
   //This function updates the internal value of the url memeber variable
   //
  this.buildUrl = buildUrl;
  function buildUrl()
  {
     this.url = "http://" +this.server+this.dir+"?&request="+this.requestType+"&urn=urn:"+this.citeNS+":"+this.workID+":"+this.collectionID+pad(((this.pageNumber).toString()),3)+"&w="+this.defaultImageSize;
   //http://amphoreus.hpcc.uh.edu/tomcat/chsimg/Img?&request=GetBinaryImage&urn=urn:cite:fufolioimg:ChadRGB.Chad001&w=500";
  }
  
  //nextPage
  //--------
  //This function return the url for the next element in the CITE object
  //If the page number is not at the max, It will incrament the page number.
  this.nextPage = nextPage;
  function nextPage()
  {
    if(this.pageNumber < this.maxPage ) //if not in the last page, proceed to go to next page
    {
          this.pageNumber = this.pageNumber +1 ;
          this.buildUrl();
    }
    return this.url;
  }

    
  //prevPage
  //--------
  //This function return the url for the previous element in the CITE object
  //If the page number is not at the 1, It will incrament the page number.
  
  this.prevPage = prevPage;
  function prevPage()
  {
    if(this.pageNumber > 1) //if not in the first page, proceed to go to previous page
    {
          this.pageNumber = this.pageNumber -1;
          this.buildUrl();
    }
    return this.url;
  }
 

  //setPage
  //----------
  //This function changes the page number member variable to the
  //the incomming value. This function does some very simple type checking. 
  this.setPage = setPage;
  function setPage( inPage)
  { 
	//if( inPage > minPage && inPage < maxPage)
	if( inPage > 1 && inPage < this.maxPage )
		{
			this.pageNumber = inPage;
			this.buildUrl();
		}
  
    return this.url;
  }
  
  
  //setLayer
  //------------
  //This function can change the layer selected 
  //This function is still in dev and is untested
  //Error checking need to be added
  this.setLayer = setLayer;
  function setLayer(str)
  {	
	this.collectionID = str
  }
  
  
  //update
  //-----------------
  //This function can be called after calling the set layer function.
  //It will return the updated url.
  this.update =update;
  function update()
  {
  	this.buildUrl();
  	return this.url;
  }
  
  
  //getRegion
  //---------------
  //getRegion return a region of an image
  //The region is specified by the 4 arguments
  //The arguments are percents as floats, between 0 and 1. 
  //The region returned is the area between the two input points
  this.getRegion = getRegion;
  function getRegion( startX,startY,stopX,stopY)
  {
  	this.buildUrl();
	if(startX <=1 && startY <= 1 && stopY <=1 && stopX <=1)
	{
  		region = "http://" +this.server+this.dir+"?&request="+this.requestType+"&urn=urn:"+this.citeNS+":"+this.workID+":"+this.collectionID+pad(((this.pageNumber).toString()),3)+":" + startX + "," + startY + "," + stopX + "," + stopY;
  		return region;
  	}
  	else
  	{
  		alert("Region was out of range");
  		return this.url;
  	}
  }
  
  

  
  //generate the rest of the attributes
  this.isCreated =true;
  this.requestType = "GetBinaryImage";
  this.buildUrl();
	


}



//pad
//--------------
//Pad take a string and int 
//Pad will add zeros to the front of a string until the string 
//is the length of integer.
//Example
//result = pad('hello',10);
//result now equals 00000hello

function pad(str,length)
{
	var hold = str;
	while((hold.length) < length)
	{
		hold = "0" + hold;
	}
	return hold;
}
