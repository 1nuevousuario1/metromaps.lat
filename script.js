// Token de Mapbox (reemplaza con el tuyo)
mapboxgl.accessToken = 'TU_TOKEN_DE_MAPBOX';

// Inicializar mapa centrado en Monterrey
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-100.3161, 25.6866], // Coordenadas Monterrey
  zoom: 11
});

// Estaciones de ejemplo
const estaciones = [
  { nombre: "Talleres", coords: [-100.374, 25.749] },
  { nombre: "Cuauhtémoc", coords: [-100.309, 25.675] },
  { nombre: "Y Griega", coords: [-100.293, 25.666] }
];

// Poblar selects
const origenSelect = document.getElementById("origen");
const destinoSelect = document.getElementById("destino");

estaciones.forEach(est => {
  const opt1 = document.createElement("option");
  opt1.value = est.nombre;
  opt1.textContent = est.nombre;
  origenSelect.appendChild(opt1);

  const opt2 = document.createElement("option");
  opt2.value = est.nombre;
  opt2.textContent = est.nombre;
  destinoSelect.appendChild(opt2);

  // Marcadores en el mapa
  new mapboxgl.Marker({ color: "orange" })
    .setLngLat(est.coords)
    .setPopup(new mapboxgl.Popup().setText(est.nombre))
    .addTo(map);
});

// Función para calcular ruta (ejemplo simple)
function calcularRuta() {
  const origen = estaciones.find(e => e.nombre === origenSelect.value);
  const destino = estaciones.find(e => e.nombre === destinoSelect.value);

  if (!origen || !destino) {
    document.getElementById("info").textContent = "Selecciona origen y destino.";
    return;
  }

  document.getElementById("info").textContent =
    `Ruta calculada de ${origen.nombre} a ${destino.nombre}.`;

  // Dibujar línea en el mapa
  if (map.getSource("ruta")) {
    map.removeLayer("ruta");
    map.removeSource("ruta");
  }

  map.addSource("ruta", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [origen.coords, destino.coords]
      }
    }
  });

  map.addLayer({
    id: "ruta",
    type: "line",
    source: "ruta",
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#ff6f00", "line-width": 4 }
  });
}
