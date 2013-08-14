jsApp  
-----


###Introduction###
  
The University Of Kentucky has developed several JavaScript  applications for displaying registered images. 
These demonstration applications represent work done under the FoLIO project. The viewers in this repository highlight registration along multiple axes: time, wavelength of light, and semantic content. This material is based upon work supported by the National Science Foundation under Grant No. 0916421.  Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation.

###Demonstration###

Live versions of these viewers are currently availible via the links below.  

[Modal Viewer](http://www.vis.uky.edu/static/folio/modal/modal.html)  
[Diachronic Viewer](http://www.vis.uky.edu/static/folio/diachronic/diachronic.html)



###Installation###

These viewers are designed to run out of the box, by simply opening their HTML files. 
Due to size constraints we have zipped the assets and image folders. They must be unzipped before the images will be displayed.
    
    git clone https://github.com/viscenter/jsApp.git
    cd jsApp
    unzip assets.zip
    cd diachronic
    unzip diachronic/images.zip
    cd ../modal
    unzip modal/images.zip
 
The HTML files for the viewers are located in the sub folders:  
*	jsApp/diachronic/diachronic.html  
*	jsApp/modal/modal.html  
*	jsApp/prototype/viewer.html  
*	jsApp/translation/translation.html  

_NOTE: Due to browser security policies, viewers may not work correctly when locally viewed. 
This is due to cross domain scripting security policies. Hosting the viewers on a web server will fix this issue._


###Folder Description###
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
	

###References###
*     [University of Kentucky Folio](http://vis.uky.edu/blog/2013/06/28/paris/)
*     [University Of Furman](http://folio.furman.edu/)
*     [University Of Kentucky Department Computer Science](http://www.cs.uky.edu/)




