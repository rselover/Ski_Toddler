const geojsonUrl = 'https://gist.githubusercontent.com/rselover/0ee2da020db757f2b35c8ec8b8b51888/raw/dafeacf9b2f088df015c44bf17f2c4ff143796b9/Ski_Toddler.json';

function loadData() {
  return d3.json(geojsonUrl).then(data => 
    data.features.map(feature => ({
      position: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
      properties: feature.properties
    }))
  );
}
