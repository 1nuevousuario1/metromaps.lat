window.calcularRuta = function() {
  const origen = origenSelect.value;
  const destino = destinoSelect.value;

  // Definir líneas como arrays de nombres
  const linea1 = ["Talleres","San Bernabé","Unidad Modelo","Aztlán","Penitenciaría","Alfonso Reyes","Mitras","Simón Bolívar","Hospital","Edison","Central","Cuauhtémoc","Del Golfo","Félix Gómez","Parque Fundidora","Y Griega","Eloy Cavazos","Lerdo de Tejada","Exposición"];
  const linea2 = ["Sendero","Tapia","San Nicolás","Anáhuac","Universidad","Niños Héroes","Regina","General Anaya","Cuauhtémoc","Alameda","Fundadores","Padre Mier","General I. Zaragoza","Hospital Metropolitano","Los Ángeles","Ruiz Cortines","Col. Moderna","Metalúrgica","Col. Obrera","Santa Lucía"];
  const linea3 = ["Hospital Metropolitano","General I. Zaragoza","Félix U. Gómez","Santa Lucía"];

  let ruta = [];
  let tiempo = 0;

  // Caso: misma línea
  if (linea1.includes(origen) && linea1.includes(destino)) {
    const i1 = linea1.indexOf(origen);
    const i2 = linea1.indexOf(destino);
    ruta = linea1.slice(Math.min(i1,i2)+1, Math.max(i1,i2));
    tiempo = Math.abs(i2 - i1) * 2;
  } else if (linea2.includes(origen) && linea2.includes(destino)) {
    const i1 = linea2.indexOf(origen);
    const i2 = linea2.indexOf(destino);
    ruta = linea2.slice(Math.min(i1,i2)+1, Math.max(i1,i2));
    tiempo = Math.abs(i2 - i1) * 2;
  } else if (linea3.includes(origen) && linea3.includes(destino)) {
    const i1 = linea3.indexOf(origen);
    const i2 = linea3.indexOf(destino);
    ruta = linea3.slice(Math.min(i1,i2)+1, Math.max(i1,i2));
    tiempo = Math.abs(i2 - i1) * 2;
  } else {
    document.getElementById("info").innerHTML = `
      Ruta calculada de ${origen} a ${destino}:<br>
      Necesitas hacer transbordo en una estación de intercambio (ej. Cuauhtémoc, Félix Gómez, General I. Zaragoza).
    `;
    return;
  }

  document.getElementById("info").innerHTML = `
    Ruta calculada de ${origen} a ${destino}:<br>
    Pasa por ${ruta.join(", ")}.<br>
    Tiempo estimado: ${tiempo} minutos.
  `;

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
        coordinates: [
          estaciones.find(e => e.nombre === origen).coords,
          estaciones.find(e => e.nombre === destino).coords
        ]
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

