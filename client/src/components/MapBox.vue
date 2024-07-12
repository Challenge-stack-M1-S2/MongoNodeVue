<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib21hcmhhZGlkaTEyMyIsImEiOiJjbHlnZXRrbGUwMWNsMmtzOXRnanhxZGszIn0.XFE9hQN3EKdhvluGAMn_Wg";

export default {
  mounted() {
    this.initializeMap();
  },
  methods: {
    async initializeMap() {
      try {
        const map = new mapboxgl.Map({
          container: this.$refs.mapContainer,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [4.84468, 45.74848],
          zoom: 10,
        });
        this.map = map;

        map.on("load", async () => {
          map.addSource("sessions", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [],
            },
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          });

          const sessions = await this.getSessionsFromAPI();
          map.getSource("sessions").setData(sessions);

          map.addLayer({
            id: "clusters",
            type: "circle",
            source: "sessions",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40,
              ],
            },
          });

          map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "sessions",
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            },
          });

          map.addLayer({
            id: "unclustered-point",
            type: "symbol",
            source: "sessions",
            filter: ["!", ["has", "point_count"]],
            layout: {
              "icon-image": "custom-icon",
              "icon-size": 0.1,
              "text-field": "{sessionId}",
              "text-offset": [0, 1],
              "text-anchor": "top",
            },
          });

          this.addCustomIconToMap(map);
          this.addPopupsToMap(map);
        });
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    },

    async getSessionsFromAPI() {
      try {
        const response = await fetch("http://localhost:8081/api/sessions");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        
        const sessions = data.data.map((session) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              session.location.coordinates[0],
              session.location.coordinates[1],
            ],
          },
          properties: {
            location: session.location.formattedAddress,
            sessionId: session.sessionId,
            tattooId: session.tattoo_id._id,
            price: session.tattoo_id.price,
            imageUrl: session.tattoo_id.image_url,
          },
        }));

        return {
          type: "FeatureCollection",
          features: sessions,
        };
      } catch (error) {
        throw new Error(`Error fetching sessions: ${error.message}`);
      }
    },

    addCustomIconToMap(map) {
      const imageUrl =
        "https://static.vecteezy.com/system/resources/thumbnails/038/280/757/small_2x/3d-blue-map-pointer-location-map-icon-blue-texture-blue-location-pin-or-navigation-web-location-point-pointer-grey-pointer-icon-location-symbol-gps-travel-navigation-place-position-png.png";

      map.loadImage(imageUrl, (error, image) => {
        if (error) throw error;
        map.addImage("custom-icon", image);
      });
    },

    addPopupsToMap(map) {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mouseenter", "unclustered-point", (e) => {
        map.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const tattooId = e.features[0].properties.tattooId;
        const location = e.features[0].properties.location;
        const price = e.features[0].properties.price;
        const imageUrl = e.features[0].properties.imageUrl;

        const popupContent = `<div class="popup-content">
                                <div class="popup-image" style="background-image: url(${imageUrl});"></div>
                                <div class="popup-details">
                                  <p>${location}</p>
                                  <p>Prix : ${price} €</p>
                                  <a href="/tattoo-details/${tattooId}">Voir détails</a>
                                </div>
                              </div>`;

        popup.setLngLat(coordinates).setHTML(popupContent).addTo(map);

        // Délai avant de fermer la popup
        const popupElement = popup.getElement();
        popupElement.addEventListener("mouseleave", () => {
          setTimeout(() => {
            popup.remove();
          }, 300); // Délai de 300 ms avant de fermer la popup
        });
      });

      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = "";
      });
    },
  },
  unmounted() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  },
};
</script>

<style>
.map-container {
  width: 90%;
  height: 400px;
  margin-bottom: 200px;
}

.popup-content {
  display: flex;
  max-width: 300px;
  overflow: hidden;
}

.popup-image {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  margin-right: 10px;
}

.popup-details {
  flex-grow: 1;
}

.popup-details p {
  margin: 0;
}

.popup-details a {
  display: block;
  margin-top: 10px;
  text-decoration: none;
  color: blue;
}

.popup-details a:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
