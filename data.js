const geojsonUrl = 'https://gist.githubusercontent.com/rselover/0ee2da020db757f2b35c8ec8b8b51888/raw/1594c0fea344aa16a0a13ae9267bb712cf47fcb2/Ski_Toddler.json';

function loadData() {
  return d3.json(geojsonUrl).then(data => 
    data.features.map(feature => ({
      position: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
      properties: feature.properties
    }))
  );
}
