var imageCollection = ee.ImageCollection("COPERNICUS/S2"),
    imageCollection2 = ee.ImageCollection("COPERNICUS/S2");

// Select a Sentinel-2 image
var sent2 = ee.Image("COPERNICUS/S2/20180422T012719_20180422T012714_T52LHM");

// render image with true color
Map.addLayer(sent2,{bands:['B4','B3','B2'], min:0, max:3000}, "True-colour");
//Natural colour bands: 4 3 2

// Band 8 is infra-red(not visialbe to human eyes), add B4 and B3, composite them as false colour 
Map.addLayer(sent2,{bands:['B8','B4','B3'], min:0, max:3000}, "False-colour");

// these are the bands individualy 
Map.addLayer(sent2,{bands:['B2'], min:0, max:3000}, "B2");
Map.addLayer(sent2,{bands:['B3'], min:0, max:3000}, "B3");
Map.addLayer(sent2,{bands:['B4'], min:0, max:3000}, "B4");
Map.addLayer(sent2,{bands:['B8'], min:0, max:3000}, "B8");