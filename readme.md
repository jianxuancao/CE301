# Spatial-temporal NDVI visualization and analysis via Satellite images
###### By Jianxuan Cao (jc18568), Supervised by Jinya Su
This is a cloud-based software based on Google Earth Platform, focusing on providing NDVI analysis using Sentinel-2 satellite images.
## Table of Contents
1. [Prerequisites and Installation](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan#prerequisites)
1. [Instructions](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan#instructions)
    1. [Image Selection](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan#image-selection)
    1. [NDVI analysis](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan#ndvi-analysis)
    1. [Post-Processing](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan#post-processing)
    1. [Some features that improve the experience](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan#some-features-that-improve-the-experience)
------------
## Prerequisites and Installation
* Google account that passed the registration of GEE platform. [Google Earth Engine](https://code.earthengine.google.com/ "Google Earth Engine")
* Or use public portal but loose the ability to access Post-Processing features.
* Copy code from [my Git repository](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/blob/master/NDVI_application.js "my Git repository") and paste into GEE code editor (if you have an account).
* Or access the application though public [Portal](https://theunknowncao.users.earthengine.app/view/caondvi "portal") which dose not require account.
## Instructions
### Image Selection
1. Specify a location
    There are three ways to specify location.
	1. Using the current center of map.
	2. Using the current location of user's IP address. (Should the user choose to provide that information)
    3. By entering the longitude and latitude of their region of interest.

        ![location](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/location.png)

    4. User can choose to use the traditional longitude and latitude or the GEE format of longitude and latitude

        ![longitudeFormat](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/longitudeFormat.png)

2. Specify time of image
    - Using date slider to choose a range for the application to obtain images from. The image will be the optimal image with the least amount of cloud.
    
        ![dateSelect](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/dateSelect.png)

3. Specify how do you want the image to be presented
    1. User can choose to populate single image in the time range. Or if the range is larger enough (more than 30 days), User can populate a series of images by clicking the "Populate Image Collection" button.
    
        ![buttons](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/buttons.png)

    2. If user choose to populate an image collection, the top slider will adjust the time interval of each image. 
    
        ![intervalSlider](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/intervalSlider.png)

### NDVI analysis
1. Visual examination
    - The image is processed into a false color image representing the intensity of NDVI value. Deeper the green color is, closer the NDVI value is to  If the color is blue, then it is usually the presence of water. It white, it is neither water nor green plant (usually soil or buildings). 
    
        ![color](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/color.png)

2. Examining value at a specific region.
    1. If user only populated a single image, user can click on the desired location on map, and a reading of the NDVI index will be given in the panel on the left along with the location of the sample location.
    
        ![ndviValue](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/ndviValue.png)

    2. If user populated an image collection, when user clicks on the desired location on map, and a line chart of the NDVI index will be given in the panel on the left along with the location of the sample location.
    
        ![ndviValueSeries](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/ndviValueSeries.png)

    3. User can also adjust how big the sample size is, the sample size can range from 10m x 10m (this is the resolution of satellite image) to 5000m x 5000m, this gives user a highly flexible analytics tool.
    
        ![sizeSlider](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/sizeSlider.png)

    4. If te line chart is given, the chart can be downloaded in multiple format by clicking the button on the top right corner of the chart.
### Post-Processing
1. Cutting images to focus or to improve efficiency
    1. If you wish to cut the image down to a specific region of your choice, click the "Reduce Region" button.
    2. Once you click in the button, a prompt will tell you to select one corner of the region, and the 3 other corners.
    3. The image will be cut once this process finishes. The image be in the shape and size specified. 
    4. If you wish to remove this region cut, do so by clicking "Remove Region" button.
    
        ![imageCut](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/imageCut.png)

2. Using pre-defined SHP file to limit region
    1. If user have an SHP file at hand (this comes from external sources as creating an SHP file is not a part of the project's objective), Run the program in [Google Earth Engine](https://code.earthengine.google.com/) using code from [NDVI_application.js](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/blob/master/NDVI_application.js)
    2. Upload the SHP file by Clicking: Asset -> NEW -> Shape files (.shp, .shx, .dbf, .prj, or .zip)
    
        ![shpUpload](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/shpUpload.png)

    3. Once upload is complete, click on the "Import into Script" button to import
    
        ![monaco](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/monaco.png)

    4. Populate the image(s) as needed. 
    5. Click "Clip Image" button to cut the image into the shape defined by the SHP file.
    
        ![Singapore](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/Singapore.png)

3. Download the images produced
    1. Proceed to obtain image(s) as before. Apply any processing as you wish.
    2. Click the "download" button on the left panel, a prompt will appear.
    
        ![prompt](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/prompt.png)

    3. Go to "Tasks" in GEE platform.
    4. Hit "Run" on the image(s) you wish to download.
    
        ![run](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/runDownload.png)

    5. Adjust parameters of image, or just hit Run to use efault setting. The download will take a while to run.
    
        ![adjustImage](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/adjustImage.png)

    6. Once completed, the image will be saved TIF file in Google drive.
### Some features that improve the experience
1. Hide buttons to hide/expand the panels to maximise the map and minimise distraction.

    ![hideButtom](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/hideButton.png)

2. Each image that's been populated was named after the date that the image was taken to avoid confusion. 
    
    ![date](https://cseegit.essex.ac.uk/ce301_2020/ce301_cao_jianxuan/-/raw/master/PictureForReadme/date.png)