jsApp
-----


##Introduction##
  
The University Of Kentucky has developed several JavaScript demonstration applications. 
These applications show our ability to register different images that contain the same subjects.


##Viewing##

Currently (2013) The University of Kentucky is hosting these files on the main computer science server. 
The easiest way to view the demonstration is to navigate to the University Of Kentucky site, by flowing the link below.


[Modal Viewer](http://www.vis.uky.edu/static/folio/modal/modal.html)  
[Diachronic Viewer](http://www.vis.uky.edu/static/folio/diachronic/diachronic.html)



##Downloading/Hosting##

If you would like to host a copy of this viewer your self you can download the files from this repository.
If you do this the, the images will have to be unzipped and placed in the corrected directories for the local cite work. 
The HTML files that are view images are called

*    jsApp/diachronic/diachronic.html 
*    jsApp/modal/modal.html
*    jsApp/prototype/viewer.html



##Folder Description##
There are currently 4 viewers to analyze images.
*    Diachronic      Compare images taken over a period of years
*    Modal           Compare Images taken with at differing spectra of light
*    Translation     Compare the English Translation of the pages
*    Prototype       Uses the CITE server to compare spectral images


The folder tree will look like the tree below
    
     $ tree -d -L 2

	 ├── css           (main CSS folder)
	 ├── diachronic    (diachronic viewer specific)
	 │   └── js        
	 ├── js            (main JavaScript)
	 ├── modal         (modal viewer specific)
	 │   └── js        
	 ├── prototype     (prototype viewer specific)
	 │   ├── css       
	 │   └── js        
	 └── translation   (translation viewer specific) 
	     ├── css
	     └── js
	

##Referances##
*     [http://vis.uky.edu/blog/2013/06/28/paris/](University of Kentucky Folio link CHANGE THIS TO MINI SITE)
*     [http://folio.furman.edu/](University Of Furman)
*     [http://www.cs.uky.edu/](University Of Kentucky Department Computer Science)


