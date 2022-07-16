## Rough Planning Record
##### Develop functioning programs based on GEE（week 3-7）
1. time selection
1. Understanding the NDVI algorithm
1. Developing basic functions
1. Tidy up code and make slight adjustment after consulting tutor.
------------
##### Week 11 deliverables
Have a working app running with no major bug and implements the ability to
1. have a display area for NDVI index on the location where the mouse is pointing at
1. time selection
1. region of interest selection
1. time series images display
1. time series NDVI data display
1. various combination of date, location analysis.
------------
##### Develop new functions based on GEE apps（week 7-17）
1. Make sure program work with no major bugs
1. Implement functions for time series image display
1. have a display area for NDVI index on the location where the mouse is pointing at
1. have a display area for NDVI value in time series image
1. Develop additional analysis tools with GUI
1. Implement a text area for user to enter GEO location rather than moving the map.
------------
##### Make improvements on accuracy and usability (week 17-30)
1. Improve on robustness of program.
1. Improve on readability of program, try to refactor code to match clean code standard.
1. Make GUI more usable.
1. Risks: GUI design is not my strong suit, may require multiple iterations of GUI design.
1. Improve markdown files.
1. Draft up a structure of final report before ester break.
## Iterations
#### [Iteration 1](https://cseejira.essex.ac.uk/projects/A301349/versions/14221 "Iteration 1"): Basic functions 
* Load image from Sentinel-2
* Load location by map centre location
* Obtain NDVI image from Sentinel-2 and display on map
###### [Iteration 1.1](https://cseejira.essex.ac.uk/projects/A301349/versions/14229 "Iteration 1.1"): Basic functions: NDVI image stage
* Obtain NDVI value by clicking on area of interest.
* Load location by browser provided location.
* Load location by mouse click on map.
###### [Iteration 1.2](https://cseejira.essex.ac.uk/projects/A301349/versions/14305 "Iteration 1.2"): Basic functions: Bug fixes, testing and new features investigate
* function testing.
* bug fixes.
* value display.
* optimization for getting ready for Iteration 2.
------------
#### [Iteration 2](https://cseejira.essex.ac.uk/projects/A301349/versions/14400 "Iteration 2"): Implement time series analysis
* Load location by mouse click on map function is now abandened. (Makes UI interaction more intuitive).
* Load time series images display function.
* Display a chart for time series NDVI value.
###### [Iteration 2.1](https://cseejira.essex.ac.uk/projects/A301349/versions/14407 "Iteration 2.1"): Manual Geo location
* Implement a text area for user to enter GEO location rather than moving the map.
* Imporve on exsiting time series analysis tools and bug fixes. 
------------
#### [Iteration 3](https://cseejira.essex.ac.uk/projects/A301349/versions/14504 "Iteration 3"): Region of interest resize
* Implement a slide bar for adjustment
* Now the click to investigate NDVI vaue can sample an area of defined size or a single pixel
###### [Iteration 3.1](https://cseejira.essex.ac.uk/projects/A301349/versions/14721 "Iteration 3.1"): Special interest location
* Special interest location: Australian wild fire 
* Add select bar for different location format
###### [Iteration 3.2](https://cseejira.essex.ac.uk/projects/A301349/versions/14809 "Iteration 3.2"): UI improvements
* New Location input fixed
* panel collapse used 
------------
#### [Iteration 4](https://cseejira.essex.ac.uk/projects/A301349/versions/14915 "Iteration 4"): Download image
* New interest location added
* Panel collapse used to improve UI
* Download image implimented 
------------
#### [Iteration 5](https://cseejira.essex.ac.uk/projects/A301349/versions/15501 "Iteration 5"): Image post processing
1. Reducing region by manual area selection
1. Reducing region by uploading shape file.
------------
#### [Iteration 6](https://cseejira.essex.ac.uk/projects/A301349/versions/16300 "Iteration 6"): Final code touchup and documentations
