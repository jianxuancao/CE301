var roi = /* color: #00ffff */ee.Geometry.Point([116.90530573985583, 39.93829705030342]),
    tCity = 
    /* color: #bf04c2 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[116.39117991588122, 39.94454866706725],
                  [116.39117991588122, 39.930860172926074],
                  [116.41160761973865, 39.930860172926074],
                  [116.41160761973865, 39.94454866706725]]], null, false),
            {
              "landcover": 1,
              "system:index": "0"
            })]),
    tWater = 
    /* color: #0000ff */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[117.52740656993396, 40.04876767595676],
                  [117.52740656993396, 40.04272271915026],
                  [117.53410136363513, 40.04272271915026],
                  [117.53410136363513, 40.04876767595676]]], null, false),
            {
              "landcover": 0,
              "system:index": "0"
            })]),
    tForest = 
    /* color: #ff0000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[115.93559062144763, 39.887802551277524],
                  [115.93559062144763, 39.880426054851306],
                  [115.9463194575072, 39.880426054851306],
                  [115.9463194575072, 39.887802551277524]]], null, false),
            {
              "landcover": 2,
              "system:index": "0"
            })]),
    tCloud = 
    /* color: #b0ff06 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[117.58010661265857, 39.87265353047445],
                  [117.58010661265857, 39.86672474178622],
                  [117.58800303599841, 39.86672474178622],
                  [117.58800303599841, 39.87265353047445]]], null, false),
            {
              "landcover": 3,
              "system:index": "0"
            })]),
    vCity = /* color: #bf04c2 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([116.48045207463478, 39.9084685113961]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([116.41087034904199, 39.94184640774521]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([116.29791716300683, 39.92210173436598]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([116.57394865714745, 39.85308231455626]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([116.5217635985537, 39.85202804446417]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([116.61308745109277, 40.061508637414796]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([116.38374785148339, 39.9899995044016]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([116.2745712157412, 39.90946215446532]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([116.5272567626162, 39.88628353313989]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([116.66664580070214, 39.85519080616154]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([116.35353544913964, 39.90788204296228]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([116.3789413329287, 39.93210641404155]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([116.4119003173037, 39.92894719946764]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([116.45515898429589, 39.936318473325905]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([116.36864165031152, 39.89471302976709]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([116.39061430656152, 39.89049841102753]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([116.36864165031152, 39.87469128277275]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([116.42563322745995, 39.84728362866522]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([116.48125151359277, 39.84833797162414]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([116.4613387938662, 39.891552090007806]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([116.5821884032412, 39.98368627662819]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([116.68175200187402, 39.879960730420805]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([116.65085295402245, 39.89629344498142]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([116.65153959953027, 39.87837993863943]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([116.6645858641787, 39.893659399377704]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([116.1866805907412, 39.91420227029077]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([116.28143767081933, 39.86467821681219]),
            {
              "landcover": 0,
              "system:index": "26"
            })]),
    vWater = /* color: #ff0000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([117.5160262938662, 40.04363838160798]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([117.54486540519433, 40.050997289688]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([117.51739958488183, 40.034175761093756]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([117.48993376456933, 40.03943293460736]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([117.26012831282445, 39.68607442599876]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([117.32741957259007, 39.66453830671011]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([117.39113515394506, 39.58822663216345]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([117.37259572523412, 39.61388610893097]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([116.6021250561924, 40.3094799084994]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([116.6131113843174, 40.33042103258394]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([116.60796154300881, 40.30895629717569]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([115.79504473823212, 40.39732491160886]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([115.77513201850556, 40.37797380912872]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([115.73461993354462, 40.3502449769475]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([115.59179766791962, 40.27956341070891]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([115.61583026069306, 40.282706384604325]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([115.59797747748993, 40.26437031045783]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([117.36703366516537, 39.420668411373434]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([117.34780759094662, 39.42279012621169]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([117.35879391907162, 39.408997825299664]),
            {
              "landcover": 1,
              "system:index": "19"
            })]),
    vForest = /* color: #00ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([116.37951417928066, 40.60390080205317]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([116.33282228474941, 40.612241398523146]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([116.47289796834316, 40.88482036481349]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([116.89861818318691, 40.67476268788776]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([117.03869386678066, 40.714329209851044]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([116.80523439412441, 40.697672485598915]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([117.38476320271816, 40.53296370950835]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([117.61272951131191, 40.618496162741145]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([117.53307863240566, 40.62058095402241]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([117.47265382771816, 40.583044756938904]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([116.05423625613743, 40.05351867182965]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([115.98282512332493, 40.059825441693064]),
            {
              "landcover": 2,
              "system:index": "11"
            })]),
    vCloud = /* color: #999900 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([116.04256153900735, 41.26232548007932]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([116.01097584564798, 41.25509897999135]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.9848833163511, 41.25819614936363]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([116.10847950775735, 41.24374143586814]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([116.16258397527814, 41.24993670469032]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([116.18455663152814, 41.23857826314356]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([116.14747777410626, 41.30050941139073]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([116.19416966863751, 41.28709598136899]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([116.04585423895001, 41.07107081364181]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([116.02113500066876, 41.088668855595536]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([117.50511147761155, 39.32065133325969]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([117.4858854033928, 39.31108913174112]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([117.45567300104905, 39.312151663115706]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([117.24830605768967, 39.359948873926726]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([117.23045327448655, 39.43211375725478]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([117.25105263972092, 39.43105304983637]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([117.21809365534592, 39.40771340143483]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([117.4803922393303, 39.54551612418693]),
            {
              "landcover": 3,
              "system:index": "17"
            })]);




var imageCollection = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    city = /* color: #bf04c2 *//* color: #bf04c2 */vCity,
    water = /* color: #ff0000 */vWater,
    forest = /* color: #00ff00 */vForest,
    cloud = /* color: #999900 */vCloud;

//import image
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterBounds(roi).filterDate('2020-06-01', '2020-08-30').sort('CLOUD_COVER').first());

//add Band 4,3,2 for visiable light, this facilitates the mannual gathering of data
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'],min:0, max: 3000}, 'True colour image');

//gather trainning data from previous dataset
var classNames = city.merge(water).merge(forest).merge(cloud);

//add Band 2,3,4,5,6,7. this helps algorithm to get more information, adis classification 
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];

//Sampling
var training = image.select(bands).sampleRegions({collection: classNames, properties: ['landcover'], scale: 30});

//Training classifier
var classifier = ee.Classifier.cart().train({features: training, classProperty: 'landcover', inputProperties: bands
});

//Run classification
var classified = image.select(bands).classify(classifier);


//-----------------------------------------------------------
//validation code
//-----------------------------------------------------------

//Merge feature collection
var collection = vCity.merge(vWater).merge(vForest).merge(vCloud);

var validation = classified.sampleRegions({collection: collection, properties: ['landcover'], scale: 30,});
print(validation);


//Compare result of first result against the second result to gain accuracy comparison 
var testAccuracy = validation.errorMatrix('landcover', 'classification');

print('Validation error matrix: ', testAccuracy); //Error matrix

print('Validation overall accuracy: ', testAccuracy.accuracy());//overall accuracy
