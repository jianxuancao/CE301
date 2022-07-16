var imageCollection = ee.ImageCollection("COPERNICUS/S2"),
    imageCollection2 = ee.ImageCollection("COPERNICUS/S2");

// Select a Sentinel-2 image
var image = ee.Image("COPERNICUS/S2/20180422T012719_20180422T012714_T52LHM");

// Band 8 is  near-infra-red(not visialbe to human eyes), add B4 and B3, composite them as false colour 
Map.addLayer(image,{bands:['B8','B4','B3'], min:0, max:3000}, "False-colour");

//NDVI = (NIR - RED)/(NIR + RED)
var NDVI = image.expression(
    "(NIR - RED) / (NIR + RED)",
    {
      RED: image.select("B4"),    //  RED
      NIR: image.select("B8"),    // NIR
    });
Map.addLayer(NDVI, {min: 0, max: 1}, "NDVI");