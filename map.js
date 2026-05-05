mapboxgl.accessToken = 'pk.eyJ1IjoicnNlbG92ZXIiLCJhIjoiY21hbGJxMGxjMDZ6MDJtb3JqMWx5ZHh0YSJ9.50NQFxaZLsWruJ8dFIqfXw';

/*const geojsonUrl = 'https://gist.githubusercontent.com/rselover/0ee2da020db757f2b35c8ec8b8b51888/raw/22a6f75fb1c6dca6073684e652dec25e27a98f83/Ski_Toddler.json';
*/
function initMap() {
  const mapDiv = document.getElementById('map');

  // Wrap map in a flex container and inject a listings sidebar
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:flex;height:100%;';
  mapDiv.parentNode.insertBefore(wrapper, mapDiv);

  const listings = document.createElement('div');
  listings.id = 'listings';

  const heading = listings.appendChild(document.createElement('div'));
  heading.className = 'heading';
  const h1 = heading.appendChild(document.createElement('h1'));
  h1.textContent = 'Ski Resorts';

  const scroll = listings.appendChild(document.createElement('div'));
  scroll.className = 'listings-scroll';

  wrapper.appendChild(listings);
  wrapper.appendChild(mapDiv);

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [-105.2211, 39.7555],
    zoom: 8
  });

  function setActive(el) {
    Array.from(scroll.getElementsByClassName('item')).forEach(item => {
      item.classList.remove('active');
    });
    el.classList.add('active');
  }

  d3.json(geojsonUrl).then(data => {
    data.features.forEach(feature => {
      const prop = feature.properties;
      const coords = feature.geometry.coordinates; // [lng, lat]

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${prop.name}</h3><div>Walkup Price: $${prop.walkup}</div>`);

      const el = document.createElement('span');
      el.className = 'material-symbols-outlined map-marker';
      el.textContent = 'downhill_skiing';

      const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map);

      const listing = scroll.appendChild(document.createElement('div'));
      listing.className = 'item';

      const link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.textContent = prop.name;

      const details = listing.appendChild(document.createElement('div'));
      details.className = 'details';
      details.textContent = `Walkup: $${prop.walkup} - Distance from Denver: ${prop.distance} miles`;

      link.addEventListener('click', e => {
        e.preventDefault();
        setActive(listing);
        map.flyTo({ center: coords, zoom: 12 });
        if (!popup.isOpen()) marker.togglePopup();
      });

      marker.getElement().addEventListener('click', () => {
        map.panTo(coords);
        setActive(listing);
      });
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  function waitForMapDiv() {
    if (document.getElementById('map')) {
      initMap();
    } else {
      setTimeout(waitForMapDiv, 50);
    }
  }
  waitForMapDiv();
});
