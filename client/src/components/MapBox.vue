<template>
    <div ref="mapContainer" class="map-container"></div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  
  mapboxgl.accessToken = 'pk.eyJ1Ijoib21hcmhhZGlkaTEyMyIsImEiOiJjbHlnZXRrbGUwMWNsMmtzOXRnanhxZGszIn0.XFE9hQN3EKdhvluGAMn_Wg';
  
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
            zoom: 9,
          });
          this.map = map;
  
          const sessions = await this.getSessionsFromAPI();
          console.log('Sessions data:', sessions); // Log the sessions data to console
          this.addCustomIconToMap(map);
          this.addLayerToMap(map, sessions);
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      },
      async getSessionsFromAPI() {
        try {
          const response = await fetch('http://localhost:8081/api/sessions');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          // Map data to GeoJSON features
          const sessions = data.data.map(session => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [session.location.coordinates[0], session.location.coordinates[1]]
            },
            properties: {
              sessionId: session.sessionId, // Adjust according to your API response
              icon: 'custom-icon'
            }
          }));
  
          return {
            type: 'FeatureCollection',
            features: sessions
          };
        } catch (error) {
          throw new Error(`Error fetching sessions: ${error.message}`);
        }
      },
      addCustomIconToMap(map) {
        const imageUrl = 'https://static.vecteezy.com/system/resources/thumbnails/038/280/757/small_2x/3d-blue-map-pointer-location-map-icon-blue-texture-blue-location-pin-or-navigation-web-location-point-pointer-grey-pointer-icon-location-symbol-gps-travel-navigation-place-position-png.png';
        
        map.loadImage(imageUrl, (error, image) => {
          if (error) throw error;
          map.addImage('custom-icon', image);
        });
      },
      addLayerToMap(map, sessions) {
        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': {
            'type': 'geojson',
            'data': sessions,
          },
          'layout': {
            'icon-image': 'custom-icon',
            'icon-size': 0.1, // Adjust icon size as needed
            'text-field': '{sessionId}',
            'text-offset': [0, 1],
            'text-anchor': 'top'
          }
        });
      }
    },
    unmounted() {
      if (this.map) {
        this.map.remove();
        this.map = null;
      }
    }
  };
  </script>
  
  <style>
  .map-container {
    width: 50%;
    height: 400px; /* Adjust height as needed */
    margin-bottom: 200px;
  }
  </style>
  