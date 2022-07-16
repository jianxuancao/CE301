var sent2 = ee.ImageCollection("COPERNICUS/S2");// Select Sentinel-2
var satImageSeasons = [];

function selectSeasonImagery(dayF, dayT, locX, locY) {
    satImageSeasons = [];
    var from = ee.Date(dayF);
    var to = ee.Date(dayT);
    var diff = to.difference(from, 'day');
    var diffSeasons = diff.getInfo() / 90;

    print(diffSeasons);
    var i;
    for (i = 0; i < diffSeasons; i++) {
        satImageSeasons.push(ee.Image(
            sent2.filterDate(from, from.advance(90, 'day'))
                .filterBounds(ee.Geometry.Point([locX, locY]))
                .sort("CLOUD_COVERAGE_ASSESSMENT").first()
            )
        );
        from = from.advance(90, 'day');
    }
    print(satImageSeasons);
}//select image based on range of date and exact location

function NDVI(image) {
    return image.expression(
        "(NIR - RED) / (NIR + RED)",    //NDVI = (NIR - RED)/(NIR + RED)
        {
            RED: image.select("B4"),    //  RED
            NIR: image.select("B8"),    // NIR
        }
    );
}//calculate NDVIPopulate index for given image

var datePanel = ui.Panel({
    style: {
        width: '400px',
        height: '200px',
        position: 'middle-right'
    }
});//datePanel
datePanel.setLayout(ui.Panel.Layout.absolute());//datePanel style

var sDate = ui.DateSlider({
    start: "2015-10-01",
    period: 180,//a season
    onChange: function () {
        var date1 = new Date(sDate.getValue()[0]).toLocaleString();
        print(date1);
    },
    style: {width: '190px', position: 'bottom-left'}
});//startDate slider
var eDate = ui.DateSlider({
    start: "2016-01-01",
    period: 180,//a season
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

var populateSeasonButt = ui.Button({
    label: 'Populate Image collections',
    onClick: function () {
        selectSeasonImagery(sDate.getValue()[0], eDate.getValue()[0], -122.1, 37.2);//!!!!!!!change locations
        satImageSeasons.forEach(addToMap);

        function addToMap(value, index) {
            index++;
            Map.addLayer(NDVI(value), {min: -1, max: 1, palette: ['blue', 'white', 'green']}, "Sector" + index + "");
        }//add NDVI image to map
    },
    style: {position: 'top-center'}
});//Populate area of interest button

datePanel.add(startDateLabel);
datePanel.add(sDate);
datePanel.add(endDateLabel);
datePanel.add(eDate);
datePanel.add(populateSeasonButt);

ui.root.add(datePanel);