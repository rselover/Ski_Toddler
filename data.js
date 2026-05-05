const geojsonUrl = 'https://gist.githubusercontent.com/rselover/0ee2da020db757f2b35c8ec8b8b51888/raw/22a6f75fb1c6dca6073684e652dec25e27a98f83/Ski_Toddler.json';

function loadTreeData() {
  return d3.json(geojsonUrl).then(data => 
    data.features.map(feature => ({
      position: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
      properties: feature.properties
    }))
  );
}
