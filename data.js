const geojsonUrl = 'https://gist.githubusercontent.com/rselover/0ee2da020db757f2b35c8ec8b8b51888/raw/48c8627512aa196fbef028f64ff42225e3ebdb0e/Ski_Toddler.json';

function loadData() {
  return d3.json(geojsonUrl).then(data => 
    data.features.map(feature => ({
      position: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
      properties: feature.properties
    }))
  );
}
