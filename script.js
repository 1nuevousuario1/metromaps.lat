mapboxgl.accessToken = 'pk.eyJ1Ijoic29sb3lveWplaG92YSIsImEiOiJjbWsyZ3FheXcwZnE5M2ZxNHduOTBnM3c2In0.c6ZiIV6kck5DH-pY9ftlTg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-100.3161, 25.6866],
  zoom: 11
});

const estaciones = [
  // Línea 1 (amarillo)
  { nombre: "Talleres", coords: [-100.374, 25.749], linea: "L1" },
  { nombre: "San Bernabé", coords: [-100.360, 25.744], linea: "L1" },
  { nombre: "Unidad Modelo", coords: [-100.348, 25.739], linea: "L1" },
  { nombre: "Aztlán", coords: [-100.337, 25.734], linea: "L1" },
  { nombre: "Penitenciaría", coords: [-100.345, 25.736], linea: "L1" },
  { nombre: "Alfonso Reyes", coords: [-100.335, 25.730], linea: "L1" },
  { nombre: "Mitras", coords: [-100.326, 25.729], linea: "L1" },
  { nombre: "Simón Bolívar", coords: [-100.318, 25.723], linea: "L1" },
  { nombre: "Hospital", coords: [-100.310, 25.720], linea: "L1" },
  { nombre: "Edison", coords: [-100.303, 25.715], linea: "L1" },
  { nombre: "Central", coords: [-100.296, 25.710], linea: "L1" },
  { nombre: "Cuauhtémoc", coords: [-100.309, 25.675], linea: "L1" },
  { nombre: "Del Golfo", coords: [-100.300, 25.678], linea: "L1" },
  { nombre: "Félix Gómez", coords: [-100.290, 25.670], linea: "L1" },
  { nombre: "Parque Fundidora", coords: [-100.285, 25.675], linea: "L1" },
  { nombre: "Y Griega", coords: [-100.293, 25.666], linea: "L1" },
  { nombre: "Eloy Cavazos", coords: [-100.280, 25.660], linea: "L1" },
  { nombre: "Lerdo de Tejada", coords: [-100.275, 25.658], linea: "L1" },
  { nombre: "Exposición", coords: [-100.270, 25.655], linea: "L1" },

  // Línea 2 (verde)
  { nombre: "Sendero", coords: [-100.309, 25.795], linea: "L2" },
  { nombre: "Tapia", coords: [-100.309, 25.785], linea: "L2" },
  { nombre: "San Nicolás", coords: [-100.309, 25.775], linea: "L2" },
  { nombre: "Anáhuac", coords: [-100.309, 25.765], linea: "L2" },
  { nombre: "Universidad", coords: [-100.309, 25.755], linea: "L2" },
  { nombre: "Niños Héroes", coords: [-100.309, 25.735], linea: "L2" },
  { nombre: "Regina", coords: [-100.309, 25.745], linea: "L2" },
  { nombre: "General Anaya", coords: [-100.309, 25.715], linea: "L2" },
  { nombre: "Cuauhtémoc", coords: [-100.309, 25.675], linea: "L2" },
  { nombre: "Alameda", coords: [-100.309, 25.670], linea: "L2" },
  { nombre: "Fundadores", coords: [-100.309, 25.665], linea: "L2" },
  { nombre: "Padre Mier", coords: [-100.309, 25.660], linea: "L2" },
  { nombre: "General I. Zaragoza", coords: [-100.309, 25.655], linea: "L2" },
  { nombre: "Hospital Metropolitano", coords: [-100.312, 25.730], linea: "L2" },
  { nombre: "Los Ángeles", coords: [-100.320, 25.740], linea: "L2" },
  { nombre: "Ruiz Cortines", coords: [-100.330, 25.750], linea: "L2" },
  { nombre: "Col. Moderna", coords: [-100.335, 25.720], linea: "L2" },
  { nombre: "Metalúrgica", coords: [-100.340, 25.725], linea: "L2" },
  { nombre: "Col. Obrera", coords: [-100.345, 25.730], linea: "L2" },
  { nombre: "Santa Lucía", coords: [-100.305, 25.660], linea: "L2" },

  // Línea 3 (rojo)
  { nombre: "Hospital Metropolitano", coords: [-100.312, 25.730], linea: "L3" },
  { nombre: "General I. Zaragoza", coords: [-100.309, 25.655], linea: "L3" },
  { nombre: "Félix U. Gómez", coords: [-100.290, 25.670], linea: "L3" },
  { nombre: "Santa Lucía", coords: [-100.305, 25.660], linea: "L3" }
];



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

  let color = "orange";
  if (est.linea === "L2") color = "green";
  if (est.linea === "L3") color = "blue";

  new mapboxgl.Marker({ color })
    .setLngLat(est.coords)
    .setPopup(new mapboxgl.Popup().setText(est.nombre))
    .addTo(map);
});

window.calcularRuta = function() {
  const origen = estaciones.find(e => e.nombre === origenSelect.value);
  const destino = estaciones.find(e => e.nombre === destinoSelect.value);

  if (!origen || !destino) {
    document.getElementById("info").textContent = "Selecciona origen y destino.";
    return;
  }

  document.getElementById("info").textContent =
    `Ruta calculada de ${origen.nombre} a ${destino.nombre}.`;

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
};
