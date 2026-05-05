const geojsonUrl = './bprd_trees.json';

function loadTreeData() {
  return d3.json(geojsonUrl).then(data => 
    data.features.map(feature => ({
      position: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
      properties: feature.properties
    }))
  );
}
