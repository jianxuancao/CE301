Map.style().set('cursor', 'crosshair');//turn cursor into a cross hair
ui.root.setLayout(ui.Panel.Layout.absolute());
var sent2 = ee.ImageCollection("COPERNICUS/S2_SR");
// Select Sentinel-2
var tableDefault = ee.FeatureCollection("users/theunknowncao/Singapore");

// Select table of HongKong SAR
var satImage;
var satImageSeasons = [];

var NDVILayer;//layer on map
var NDVILayers = [];//layer on map

var inverval = 30;
var sizeOfsquare = 100;
var ndviSeasonImage;

var myLong;//area of interest center location
var myLat;//area of interest center location
var clickPoint;//click on map center location

var polygon;
var startSample = false;
var p1b = false;
var p2b = false;
var p3b = false;
var p4b = false;

var p1, p2, p3, p4;

var tempTimeSeries;

//functions-------------------------------------------------------------------------------------------------------------
function selectImage(dayF, dayT, locX, locY) {
    satImage = ee.Image(
        sent2.filterDate(dayF, dayT)
            .filterBounds(ee.Geometry.Point([locX, locY]))
            .sort("CLOUD_COVERAGE_ASSESSMENT").first()
    );
}//select image based on range of date and exact location
function addSeasonNDVI(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVISeason');
    return image.addBands(ndvi);
}

function selectSeasonImagery(dayF, dayT, locX, locY) {
    satImageSeasons = [];
    var from = ee.Date(dayF);
    var to = ee.Date(dayT);

    var diff = to.difference(from, 'day');
    var diffSeasons = diff.getInfo() / inverval;

    var i;
    for (i = 0; i < diffSeasons - 1; i++) {
        satImageSeasons.push(ee.Image(
            sent2.filterDate(from, from.advance(inverval, 'day'))
                .filterBounds(ee.Geometry.Point([locX, locY]))
                .sort("CLOUD_COVERAGE_ASSESSMENT").first()
            )
        );
        from = from.advance(inverval, 'day');
    }

    var satImageSeasonsTemp = ee.ImageCollection(satImageSeasons);
    ndviSeasonImage = satImageSeasonsTemp.map(addSeasonNDVI).select('NDVISeason');
}//select image based on range of date and exact location
function NDVIPopulate() {
    var nir = satImage.select('B8');
    var red = satImage.select('B4');
    var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVIPopulate');

    var date = satImage.date().format("YYYY MM dd").getInfo();
    NDVILayer = null;//make sure NDVILayer info updates
    NDVILayer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']});//date is name shown
    NDVILayer.setName(date);
    Map.add(NDVILayer);

    try {
        Map.addLayer(polygon, {color: 'FF0000'}, 'geodesic polygon', true, 0.5);
    } catch (e) {
        print(e)
    }

    Map.centerObject(satImage, 11);// center on an image and zoom to level 11
}//calculate NDVIPopulate index for given image
function NDVIPopulateSeason(image, i) {//input the index
    var nir = image.select('B8');
    var red = image.select('B4');
    var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVIPopulate' + i + '');

    var date = image.date().format("YYYY MM dd").getInfo();
    var layer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, date);
    layer.setName(date);
    NDVILayers.push(layer);//date is name shown
}//calculate NDVIPopulate index for given image

//datePanel------------------------------------------------
var datePanel = ui.Panel({
    style: {
        width: '400px',
        height: '200px',
        position: 'middle-right'
    }
});//datePanel
datePanel.setLayout(ui.Panel.Layout.absolute());//datePanel style

var sDate = ui.DateSlider({
    start: "2019-01-01",
    period: 1,//a season
    onChange: function () {
        var date1 = new Date(sDate.getValue()[0]).toLocaleString();
        print(date1);
    },
    style: {width: '190px', position: 'bottom-left'}
});//startDate slider
var eDate = ui.DateSlider({
    start: "2019-01-01",
    period: 1,//a season
    onChange: function () {
        var date1 = new Date(eDate.getValue()[0]).toLocaleString();
        print(date1);
    },
    style: {width: '190px', position: 'bottom-right'}
});//endDate slider
var startDateLabel = ui.Label({
    value: 'Start',
    style: {position: 'top-left'}
});//startDateLabel
var endDateLabel = ui.Label({
    value: 'End',
    style: {position: 'top-right'}
});//endDateLabel
var intervalSlider = ui.Slider({
    min: 30,
    max: 180,
    value: 30,
    step: 15,
    onChange: function () {
        inverval = intervalSlider.getValue();
    },
    style: {width: '170px', position: 'top-center'}
});

datePanel.add(startDateLabel);
datePanel.add(sDate);
datePanel.add(endDateLabel);
datePanel.add(eDate);
datePanel.add(intervalSlider);
//End of datePanel-----------------------------------------

//buttons panel--------------------------------------------
var locationPanel = ui.Panel();//buttons panel
locationPanel.style().set({
    width: '410px',
    position: 'bottom-right'
});//buttons panel style

var LocationButtonSubPane = ui.Panel();//location panel
LocationButtonSubPane.setLayout(ui.Panel.Layout.flow('horizontal', true));

var label = ui.Label('Location: ');

var getCenterButt = ui.Button({
    label: 'Use Map Center',
    onClick: function () {
        var centerLoc = [Map.getCenter().coordinates().get(0), Map.getCenter().coordinates().get(1)];
        //center location in array 0:longitude, 1:latitude
        //return coordinates for the center of map in sight in an array. 0:longitude 经 (+E,-W), 1:latitude 纬 (+N,-S)
        myLong = centerLoc[0].getInfo();
        myLat = centerLoc[1].getInfo();
        label.setValue("Location: Lan: " + myLong + " Lat: " + myLat);
    }
});//get the visual center on map, use location
var getMylocButt = ui.Button({
    label: 'Get My Location',
    onClick: function () {
        ui.util.getCurrentPosition(function showPosition(position) {
            myLong = position.coordinates().get(0);
            myLat = position.coordinates().get(1);
            Map.setCenter(myLong.getInfo(), myLat.getInfo(), 11);
            var temp = position.coordinates().getInfo() + "";
            temp = temp.split(",");
            label.setValue("Location: Lan: " + temp[0] + " Lat: " + temp[1]);
        });
    }
});//get my current location through browser
var populateButt = ui.Button({
    label: 'Populate Single Image',
    onClick: function () {
        var layers = Map.layers();
        var len = layers.length();
        var i;
        for (i = 0; i < len; i++) {
            Map.remove(layers.get(0));
        }//remove all previous image layers (image and red dot)
        satImage = null;//make sure image updates
        satImageSeasons = [];
        selectImage(sDate.getValue()[0], eDate.getValue()[1], myLong, myLat);
        NDVIPopulate();//populate NDVI image layer
    },
    style: {position: 'top-center'}
});//Populate area of interest button
var populateSeasonButt = ui.Button({
    label: 'Populate Image Collection',
    onClick: function () {
        var layers = Map.layers();
        var len = layers.length();
        var i;
        for (i = 0; i < len; i++) {
            Map.remove(layers.get(0));
        }//remove all previous image layers (images and red dot)
        satImage = null;//make sure image updates
        satImageSeasons = [];
        NDVILayers = [];
        NDVILayer = null;//make sure NDVILayer info updates

        selectSeasonImagery(sDate.getValue()[0], eDate.getValue()[0], myLong, myLat);

        var j;
        for (j = 0; j < satImageSeasons.length; j++) {//image processing for each image
            NDVIPopulateSeason(satImageSeasons[j], j);
        }

        var k;
        for (k = 0; k < NDVILayers.length; k++) {//add processed image to map
            Map.add(NDVILayers[k]);
        }

        Map.centerObject(satImageSeasons[0], 11);// center on an image and zoom to level 11
        try {
            Map.addLayer(polygon, {color: 'FF0000'}, 'geodesic polygon', true, 0.5);
        } catch (e) {
            print(e)
        }
    },
    style: {position: 'top-center'}
});//Populate area of interest button (seasonal)
var clipButt = ui.Button({
    label: 'Clip Image',
    onClick: function () {
        if (satImageSeasons.length > 0) {//multiple image
            try {
                var layers = Map.layers();
                var len = layers.length();
                var i;
                for (i = 0; i < len; i++) {
                    Map.remove(layers.get(0));
                }//remove all previous image layers (images and red dot)

                NDVILayers = [];
                var j;
                for (j = 0; j < satImageSeasons.length; j++) {//image processing for each image

                    satImageSeasons[j] = satImageSeasons[j].clip(table);

                    var layers1 = Map.layers();
                    var len1 = layers1.length();
                    var ii;
                    for (ii = 0; ii < len1; ii++) {
                        Map.remove(layers1.get(0));
                    }//remove all previous image layers (image and red dot)

                    var date = satImageSeasons[j].date().format("YYYY MM dd").getInfo();

                    var nir = satImageSeasons[j].select('B8');
                    var red = satImageSeasons[j].select('B4');
                    var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVIPopulate' + i + '');

                    var layer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, date);
                    layer.setName(date);
                    NDVILayers.push(layer);//date is name shown
                }

                var k;
                for (k = 0; k < NDVILayers.length; k++) {//add processed image to map
                    Map.add(NDVILayers[k]);
                }

                // Map.centerObject(satImageSeasons[0], 11);// center on an image and zoom to level 11

            } catch (e) {
                alert("You dont have a Shape file")
                print(e)
            }
        } else {//single image
            var layers = Map.layers();
            var len = layers.length();
            var i;
            for (i = 0; i < len; i++) {
                Map.remove(layers.get(0));
            }//remove all previous image layers (images and red dot)
            try {
                var polygon = table.geometry()

                satImage = satImage.clip(polygon);

                var layers1 = Map.layers();
                var len1 = layers1.length();
                var ii;
                for (ii = 0; ii < len1; ii++) {
                    Map.remove(layers1.get(0));
                }//remove all previous image layers (image and red dot)


                var date = satImage.date().format("YYYY MM dd").getInfo();

                var nir = satImage.select('B8');
                var red = satImage.select('B4');
                var ndvi = nir.subtract(red).divide(nir.add(red));

                var layer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, date);

                layer.setName(date);
                Map.add(layer);

                Map.centerObject(satImage, 11);// center on an image and zoom to level 11
            } catch (e) {
                alert("You dont have a Shape file")
                print(e)
            }
        }
    }
});//get the visual center on map, use location

LocationButtonSubPane.add(getCenterButt);
LocationButtonSubPane.add(getMylocButt);
LocationButtonSubPane.add(clipButt);
LocationButtonSubPane.add(populateButt);
LocationButtonSubPane.add(populateSeasonButt);
LocationButtonSubPane.add(label);

//location sub panel
var GEELat = ui.Textbox({
    placeholder: 'GEE Latitude',
    onChange: function (value) {
        try {
            if (value <= 360 && value >= -360) {
                myLat = Number(value);
                print(myLat);
            } else {
                alert('error, check value');
            }
        } catch (error) {
            print('errr');
        }
    }
});
var GEELong = ui.Textbox({
    placeholder: 'GEE Longitude',
    onChange: function (value) {
        try {
            if (value <= 360 && value >= -360) {
                myLong = Number(value);
                print(myLong);
            } else {
                alert('error, check value');
            }
        } catch (error) {
            print('errr');
        }
    }
});
var GEELocPanel = ui.Panel();//location panel
GEELocPanel.setLayout(ui.Panel.Layout.flow('horizontal'));
GEELocPanel.add(GEELat);
GEELocPanel.add(GEELong);

var GPSLocPanel = ui.Panel();//wrapper
var GPSLocPanelLong = ui.Panel();
GPSLocPanelLong.setLayout(ui.Panel.Layout.flow('horizontal'));
var GPSLocPanelLat = ui.Panel();
GPSLocPanelLat.setLayout(ui.Panel.Layout.flow('horizontal'));
//latitude
var LatLabel = ui.Label('Latitude');
var GPSLatDeg = ui.Textbox({
    placeholder: '°',
    style: {
        width: '50px',
        padding: '1px'
    },
    value: '0'
});
var GPSLatMin = ui.Textbox({
    placeholder: '\'',
    style: {
        width: '50px',
        padding: '1px'
    },
    value: '0'
});
var GPSLatSec = ui.Textbox({
    placeholder: '\'\'',
    style: {
        width: '50px',
        padding: '1px'
    },
    value: '0'
});
var NSSelect = ui.Select({
    items: ["N", "S"],
    value: 'N'
});
//longitude
var LongLabel = ui.Label('Longitude');
var GPSLongDeg = ui.Textbox({
    placeholder: '°',
    style: {
        width: '50px',
        padding: '1px'
    },
    value: '0'
});
var GPSLongMin = ui.Textbox({
    placeholder: '\'',
    style: {
        width: '50px',
        padding: '1px'
    },
    value: '0'
});
var GPSLongSec = ui.Textbox({
    placeholder: '\'\'',
    style: {
        width: '50px',
        padding: '1px'
    },
    value: '0'
});
var EWSelect = ui.Select({
    items: ["E", "W"],
    value: 'E'
});
//confirm button
var confirmGPSButton = ui.Button({
    label: 'Confirm',
    onClick: function () {
        var GPSLatDegText = GPSLatDeg.getValue();
        var GPSLatMinText = GPSLatMin.getValue();
        var GPSLatSecText = GPSLatSec.getValue();
        var GPSLatNSText = NSSelect.getValue();
        var GPSLongDegText = GPSLongDeg.getValue();
        var GPSLongMinText = GPSLongMin.getValue();
        var GPSLongSecText = GPSLongSec.getValue();
        var GPSLongEWText = EWSelect.getValue();
        var latTemp = 0;
        var longTemp = 0;
        try {
            if (GPSLatDegText <= 90 && GPSLatDegText >= 0 && GPSLatMinText <= 60 && GPSLatMinText >= 0 &&
                GPSLatSecText <= 60 && GPSLatSecText >= 0 && GPSLongDegText <= 180 && GPSLongDegText >= 0 &&
                GPSLongMinText <= 60 && GPSLongMinText >= 0 && GPSLatSecText <= 60 && GPSLatSecText >= 0) {
                GPSLatDegText = Number(GPSLatDegText);
                GPSLatMinText = Number(GPSLatMinText);
                GPSLatSecText = Number(GPSLatSecText);
                GPSLongDegText = Number(GPSLongDegText);
                GPSLongMinText = Number(GPSLongMinText);
                GPSLongSecText = Number(GPSLongSecText);
                if (GPSLatNSText === "N") {
                    if (GPSLongEWText === "E") {
                        longTemp = GPSLongDegText + GPSLongMinText / 60 + GPSLongSecText / 60 / 60;
                        latTemp = GPSLatDegText + GPSLatMinText / 60 + GPSLatSecText / 60 / 60;
                    } else {//"W"
                        longTemp = 0 - (GPSLongDegText + GPSLongMinText / 60 + GPSLongSecText / 60 / 60);
                        latTemp = GPSLatDegText + GPSLatMinText / 60 + GPSLatSecText / 60 / 60;
                    }
                } else {//"S"
                    if (GPSLongEWText === "E") {
                        longTemp = GPSLongDegText + GPSLongMinText / 60 + GPSLongSecText / 60 / 60;
                        latTemp = 0 - (GPSLatDegText + GPSLatMinText / 60 + GPSLatSecText / 60 / 60);
                    } else {//"W"
                        longTemp = 0 - (GPSLongDegText + GPSLongMinText / 60 + GPSLongSecText / 60 / 60);
                        latTemp = 0 - (GPSLatDegText + GPSLatMinText / 60 + GPSLatSecText / 60 / 60);
                    }
                }
                if (latTemp <= 90 && latTemp >= -90 && longTemp <= 180 && longTemp >= -180) {
                    myLong = longTemp;
                    myLat = latTemp;
                } else {
                    alert('Error, check your input');
                }
                print("myLong: " + myLong + "myLat: " + myLat);
            } else {
                alert('Error, check your input');
            }
        } catch (error) {
            print('errr');
        }
    }
});
//add
GPSLocPanelLat.add(LatLabel);
GPSLocPanelLat.add(GPSLatDeg);
GPSLocPanelLat.add(GPSLatMin);
GPSLocPanelLat.add(GPSLatSec);
GPSLocPanelLat.add(NSSelect);
GPSLocPanelLong.add(LongLabel);
GPSLocPanelLong.add(GPSLongDeg);
GPSLocPanelLong.add(GPSLongMin);
GPSLocPanelLong.add(GPSLongSec);
GPSLocPanelLong.add(EWSelect);
GPSLocPanel.add(GPSLocPanelLat);
GPSLocPanel.add(GPSLocPanelLong);
GPSLocPanel.add(confirmGPSButton);
var formatSelect = ui.Select({
    items: ["GEE Format", "Latitude and Longitude"],
    value: 'GEE Format',
    onChange: function (value) {
        print(value);
        if (value === "GEE Format") {
            locationPanel.remove(GEELocPanel);
            locationPanel.remove(GPSLocPanel);
            locationPanel.add(GEELocPanel);
        } else if (value === "Latitude and Longitude") {
            locationPanel.remove(GEELocPanel);
            locationPanel.remove(GPSLocPanel);
            locationPanel.add(GPSLocPanel);
        }
    }
});

var hideButt = ui.Button({
    label: 'Hide',
    onClick: function () {
        print(locationPanel.widgets().length());
        var len = locationPanel.widgets().length();
        if (len === 1) {
            locationPanel.add(datePanel);
            locationPanel.add(LocationButtonSubPane);
            locationPanel.add(formatSelect);
            locationPanel.add(GEELocPanel);
            hideButt.setLabel("Hide");
        } else {
            for (var i = 0; i < len; i++) {
                locationPanel.widgets().remove(locationPanel.widgets().get(1));
            }
            hideButt.setLabel("Expand");
        }
    }
});//Populate area of interest button

locationPanel.add(hideButt);
locationPanel.add(datePanel);
locationPanel.add(LocationButtonSubPane);
locationPanel.add(formatSelect);
locationPanel.add(GEELocPanel);
//end of buttons panel-------------------------------------

//interest location button bar-----------------------------
var interestPanel = ui.Panel({
    style: {
        width: '400px',
        height: '50px',
        padding: '1px',
        margin: '1px',
        border: '1px',
        position: 'top-center'
    }
});//interestPanel
interestPanel.setLayout(ui.Panel.Layout.flow('horizontal'));//interestPanel style

var ausFire = ui.Button({
    label: 'autralia wild fire',
    onClick: function () {
        var layers = Map.layers();
        var len = layers.length();
        var i;
        for (i = 0; i < len; i++) {
            Map.remove(layers.get(0));
        }//remove all previous image layers (images and red dot)
        satImage = null;//make sure image updates
        satImageSeasons = [];
        NDVILayers = [];
        NDVILayer = null;//make sure NDVILayer info updates
        var ausP1 = [138.7658028157509, -34.90042237818962];
        var ausP2 = [138.9910225423134, -34.90042237818962];
        var ausP3 = [138.9910225423134, -34.99272714510906];
        var ausP4 = [138.7658028157509, -34.99272714510906];

        var ausPolygon = ee.Geometry.Polygon([ausP1, ausP2, ausP3, ausP4], null, false);

        selectSeasonImagery(1562847495000, 1601510400000, 138.8770324929223, -34.9343081682093);

        NDVILayers = [];
        var j;
        for (j = 0; j < satImageSeasons.length; j++) {//image processing for each image
            satImageSeasons[j] = satImageSeasons[j].clip(ausPolygon);

            var layers1 = Map.layers();
            var len1 = layers1.length();
            var ii;
            for (ii = 0; ii < len1; ii++) {
                Map.remove(layers1.get(0));
            }//remove all previous image layers (image and red dot)


            var date = satImageSeasons[j].date().format("YYYY MM dd").getInfo();

            var nir = satImageSeasons[j].select('B8');
            var red = satImageSeasons[j].select('B4');
            var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVIPopulate' + i + '');

            var layer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, date);
            layer.setName(date);
            NDVILayers.push(layer);//date is name shown
        }

        var k;
        for (k = 0; k < NDVILayers.length; k++) {//add processed image to map
            Map.add(NDVILayers[k]);
        }

        print('Map.layers()')
        print(Map.layers());
        Map.setCenter(138.8734276040064, -34.9493648493997, 14)// center on an image and zoom to level 14
    }
});//Populate australia wild fire.

var shouguangFarm = ui.Button({
    label: 'Farm in ShouGuang, China',
    onClick: function () {
        var layers = Map.layers();
        var len = layers.length();
        var i;
        for (i = 0; i < len; i++) {
            Map.remove(layers.get(0));
        }//remove all previous image layers (images and red dot)
        satImage = null;//make sure image updates
        satImageSeasons = [];
        NDVILayers = [];
        NDVILayer = null;//make sure NDVILayer info updates
        var chinaP1 = [118.22987143354396, 37.39380617263412];
        var chinaP2 = [118.39397970991115, 37.39380617263412];
        var chinaP3 = [118.39397970991115, 37.28571416406361];
        var chinaP4 = [118.22987143354396, 37.28571416406361];

        var chinaPolygon = ee.Geometry.Polygon([chinaP1, chinaP2, chinaP3, chinaP4], null, false);

        selectSeasonImagery(1546345323000, 1612009323000, 118.30645346815162, 37.335600203617275);
        NDVILayers = [];
        var j;
        for (j = 0; j < satImageSeasons.length; j++) {//image processing for each image
            satImageSeasons[j] = satImageSeasons[j].clip(chinaPolygon);

            var layers1 = Map.layers();
            var len1 = layers1.length();
            var ii;
            for (ii = 0; ii < len1; ii++) {
                Map.remove(layers1.get(0));
            }//remove all previous image layers (image and red dot)


            var date = satImageSeasons[j].date().format("YYYY MM dd").getInfo();

            var nir = satImageSeasons[j].select('B8');
            var red = satImageSeasons[j].select('B4');
            var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVIPopulate' + i + '');

            var layer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, date);
            layer.setName(date);
            NDVILayers.push(layer);//date is name shown
        }

        var k;
        for (k = 0; k < NDVILayers.length; k++) {//add processed image to map
            Map.add(NDVILayers[k]);
        }

        print('Map.layers()')
        print(Map.layers());
        Map.setCenter(118.30645346815162, 37.335600203617275, 15)// center on an image and zoom to level 11
    }
});//Shouguang China Farm land

var shpDemo = ui.Button({
    label: 'Shape File',
    onClick: function () {
        var layers = Map.layers();
        var len = layers.length();
        var i;
        for (i = 0; i < len; i++) {
            Map.remove(layers.get(0));
        }//remove all previous image layers (images and red dot)
        satImage = null;//make sure image updates
        satImageSeasons = [];
        NDVILayers = [];
        NDVILayer = null;//make sure NDVILayer info updates

        var polygon = tableDefault.geometry()

        satImage = ee.Image("COPERNICUS/S2_SR/20191227T032131_20191227T032745_T48NUG");
        satImage = satImage.clip(polygon);

        var layers1 = Map.layers();
        var len1 = layers1.length();
        var ii;
        for (ii = 0; ii < len1; ii++) {
            Map.remove(layers1.get(0));
        }//remove all previous image layers (image and red dot)


        var date = satImage.date().format("YYYY MM dd").getInfo();

        var nir = satImage.select('B8');
        var red = satImage.select('B4');
        var ndvi = nir.subtract(red).divide(nir.add(red));

        var layer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, date);
        layer.setName(date);
        Map.add(layer);
        Map.addLayer(tableDefault)
        Map.setCenter(-256.14986323052693, 1.3406536481648619, 12)// center on an image and zoom to level 11
    }
});//shpDemo
interestPanel.add(ausFire);
interestPanel.add(shouguangFarm);
interestPanel.add(shpDemo);
//end of interest location button bar----------------------

//ndvi display panel---------------------------------------
var ndviPanel = ui.Panel({
    style: {
        width: '400px',
        position: 'bottom-left'
    }
});//ndviPanel
var ndviButtonSubPane = ui.Panel();//location panel
ndviButtonSubPane.setLayout(ui.Panel.Layout.flow('horizontal', true));

var downloadButt = ui.Button({
    label: 'download',
    onClick: function () {
        alert("This will require you to log in and run in Google Earth Engine dev platform.\nThe file will be saved in your Google Drive.\nThe process is quite long so wait for the file to appear in your Drive");
        print(Map.layers())
        if (Map.layers().length() === 1) {
            print(Map.layers().get(0).getEeObject());
            print(Map.layers().get(0).getName().replace(/\s/g, ''));
            Export.image.toDrive({
                image: Map.layers().get(0).getEeObject(),
                description: Map.layers().get(0).getName().replace(/\s/g, ''),
                scale: 10
            });
        } else if (Map.layers().length() === 2 && Map.layers().get(1).getName() === '') {
            print(Map.layers().get(0).getEeObject());
            print(Map.layers().get(0).getName().replace(/\s/g, ''));
            Export.image.toDrive({
                image: Map.layers().get(0).getEeObject(),
                description: Map.layers().get(0).getName().replace(/\s/g, ''),
                scale: 10
            });
        } else {
            var b;
            for (b = 0; b < Map.layers().length(); b++) {
                var currentImage = Map.layers().get(b).getEeObject();
                Export.image.toDrive({
                    image: currentImage,
                    description: Map.layers().get(b).getName().replace(/\s/g, ''),
                    scale: 10
                });
            }
        }
    }
});//Populate area of interest button
var reduceRegionButt = ui.Button({
    label: 'Reduce Region',
    onClick: function () {
        // print("NDVILayer.getEeObject()");
        // print(NDVILayer.getEeObject()); //this is the NDVIPopulate image
        // print("Map.layers()");
        // print(Map.layers());//show all layer property
        // print("myLong: " + myLong.getInfo() + " myLat: " + myLat.getInfo());//location
        startSample = true;
        p1b = true;
        alert("Choose Point 1");
    }
});
var removeRegionButt = ui.Button({
    label: 'Remove Region',
    onClick: function () {
        try {
            var layerTamp = Map.layers();
            print(layerTamp);
            var i;
            for (i = 0; i < layerTamp.length(); i++) {
                if (layerTamp.get(i).getName() === 'geodesic polygon') {
                    Map.remove(layerTamp.get(i));
                }
            }
        } catch (e) {
            alert("No region for you to remove yet!");
            print(e)
        }
    }
});

ndviButtonSubPane.add(downloadButt);
ndviButtonSubPane.add(reduceRegionButt);
ndviButtonSubPane.add(removeRegionButt);

var ndviDisplay = ui.Label({
    value: 'NDVI value: ',
});
var instruction = ui.Label({
    value: 'zoom onto an area of interest on map and click "Get Map Center" button or "Get my loc" button, choose start and end date, then click populate',
});
var sizeSlider = ui.Slider({
    min: 10,
    max: 5000,
    value: 100,
    step: 10,
    onChange: function () {
        sizeOfsquare = sizeSlider.getValue();
    },
    style: {width: '350px'}
});

var hideExpandButt = ui.Button({
    label: 'Hide',
    onClick: function () {
        print(ndviPanel.widgets().length());
        var len = ndviPanel.widgets().length();
        if (len === 1) {
            ndviPanel.add(ndviButtonSubPane);
            ndviPanel.add(sizeSlider);
            ndviPanel.add(ndviDisplay);
            ndviPanel.add(instruction);
            hideExpandButt.setLabel("Hide");
        } else {
            for (var i = 0; i < len; i++) {
                ndviPanel.widgets().remove(ndviPanel.widgets().get(1));
            }
            hideExpandButt.setLabel("Expand");
        }
    }
});//Populate area of interest button

ndviPanel.add(hideExpandButt);
ndviPanel.add(ndviButtonSubPane);
ndviPanel.add(sizeSlider);
ndviPanel.add(ndviDisplay);
ndviPanel.add(instruction);
//end of ndvi display panel--------------------------------

// ui.root.add(datePanel);
ui.root.add(ndviPanel);
ui.root.add(interestPanel);
ui.root.add(locationPanel);


var dot = 1;
Map.onClick(function (coords) {
    clickPoint = ee.Geometry.Point(coords.lon, coords.lat);
    if (startSample) {
        try {
            var layerTamp = Map.layers();
            print(layerTamp);
            var i;
            for (i = 0; i < layerTamp.length(); i++) {
                if (layerTamp.get(i).getName() === 'geodesic polygon') {
                    Map.remove(layerTamp.get(i));
                }
            }
        } catch (e) {
            //do nothing
        }

        if (p1b) {
            p1 = [clickPoint.coordinates().get(0), clickPoint.coordinates().get(1)];
            p1b = false;
            p2b = true;
            alert("Point 1 chosen: " + "\nChoose Point 2");
        } else if (p2b) {
            p2b = false;
            p3b = true;
            p2 = [clickPoint.coordinates().get(0), clickPoint.coordinates().get(1)];
            alert("Point 2 chosen: " + "\nChoose Point 3");
        } else if (p3b) {
            p3b = false;
            p4b = true;
            p3 = [clickPoint.coordinates().get(0), clickPoint.coordinates().get(1)];
            alert("Point 3 chosen: " + "\nChoose Point 4");
        } else if (p4b) {
            p4b = false;
            startSample = false;
            p4 = [clickPoint.coordinates().get(0), clickPoint.coordinates().get(1)];
            polygon = ee.Geometry.Polygon([p2, p1, p3, p4], null, false);

            if (satImageSeasons.length > 0) {//multiple image
                NDVILayers = [];
                var j;
                for (j = 0; j < satImageSeasons.length; j++) {//image processing for each image
                    satImageSeasons[j] = satImageSeasons[j].clip(polygon);

                    var layers1 = Map.layers();
                    var len1 = layers1.length();
                    var ii;
                    for (ii = 0; ii < len1; ii++) {
                        Map.remove(layers1.get(0));
                    }//remove all previous image layers (image and red dot)


                    var date = satImageSeasons[j].date().format("YYYY MM dd").getInfo();

                    var nir = satImageSeasons[j].select('B8');
                    var red = satImageSeasons[j].select('B4');
                    var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVIPopulate' + i + '');

                    var layer = ui.Map.Layer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, date);
                    layer.setName(date);
                    NDVILayers.push(layer);//date is name shown
                }

                var k;
                for (k = 0; k < NDVILayers.length; k++) {//add processed image to map
                    Map.add(NDVILayers[k]);
                }

            } else {//single image
                var image = NDVILayer.getEeObject().select("NDVIPopulate");
                image = image.clip(polygon);

                var layers = Map.layers();
                var len = layers.length();
                var i1;
                for (i1 = 0; i1 < len; i1++) {
                    Map.remove(layers.get(0));
                }//remove all previous image layers (image and red dot)

                var date = satImage.date().format("YYYY MM dd").getInfo();
                NDVILayer = null;//make sure NDVILayer info updates
                NDVILayer = ui.Map.Layer(image, {min: -1, max: 1, palette: ['blue', 'white', 'green']});//date is name shown
                NDVILayer.setName(date);
                Map.add(NDVILayer);
            }

            //add layer at last step so region stay on top
            Map.centerObject(polygon);
            Map.addLayer(polygon, {color: 'FF0000'}, 'geodesic polygon', true, 0.5);
            //-----------------
            alert("Point 4 chosen: " + "\nAll done");
        }

    } else {
        myLong = clickPoint.coordinates().get(0);
        myLat = clickPoint.coordinates().get(1);

        var diff = 0.00023044866 * sizeOfsquare / 20;

        var pointSquare = ee.Geometry.Polygon([[
                [ee.Number(myLong).add(-diff), ee.Number(myLat).add(diff)],
                [ee.Number(myLong).add(-diff), ee.Number(myLat).add(-diff)],
                [ee.Number(myLong).add(diff), ee.Number(myLat).add(-diff)],
                [ee.Number(myLong).add(diff), ee.Number(myLat).add(diff)]]]
            , null, false);
        //sample square

        var dataN = null;
        if (satImageSeasons.length > 0) {//multiple image
            ndviPanel.widgets().remove(tempTimeSeries);
            tempTimeSeries = ui.Chart.image.seriesByRegion(
                ndviSeasonImage, pointSquare, ee.Reducer.mean(), 'NDVISeason', 100, 'system:time_start', 'label')
                .setChartType('ScatterChart')
                .setOptions({
                    title: 'NDVI over time in ROI',
                    vAxis: {title: 'Value'},
                    lineWidth: 1,
                    pointSize: 4,
                });

            ndviPanel.add(tempTimeSeries);
            ndviDisplay.setValue("NDVI value at" + " Lan: " + clickPoint.coordinates().get(0).getInfo() + " Lat: " + clickPoint.coordinates().get(1).getInfo() + " is : ");//update on NDVI panel
        } else {//single image
            dataN = ee.Number(NDVILayer.getEeObject()
                .select("NDVIPopulate")
                .reduceRegion(ee.Reducer.first(), pointSquare, 10)
                .get("NDVIPopulate"));// Extract data, turn metadata into num format
            ndviPanel.widgets().remove(tempTimeSeries);
            ndviDisplay.setValue("NDVI value at" + " Lan: " + clickPoint.coordinates().get(0).getInfo() + " Lat: " + clickPoint.coordinates().get(1).getInfo() + " is : " + dataN.getInfo());//update on NDVI panel
        }

        //dot singular update
        print(dot);
        if (dot === 1) {
            dot = ui.Map.Layer(clickPoint, {color: 'FF0000'});
            Map.layers().set(Map.layers().length(), dot);//red dot
        } else {
            Map.remove(dot);
            dot = ui.Map.Layer(clickPoint, {color: 'FF0000'});
            Map.layers().set(Map.layers().length(), dot);//red dot
        }
    }
});
