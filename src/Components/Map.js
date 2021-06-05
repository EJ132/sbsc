import React from 'react';
import '../App.css'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
/* eslint-disable */ 
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiZWoxMzIiLCJhIjoiY2syMmRzcXNoMXRodTNjbXR4cTI1OWFjYyJ9.cRa4xJr8vtyhyGL367szRg';

export default class Map extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          lng: -118.28551487478929,
          lat: 33.738696496518166,
          zoom: 17
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
          container: this.mapContainer.current,
          style: 'mapbox://styles/ej132/ckmzvsqnr081218obnwvesa8d',
          center: [lng, lat],
          zoom: zoom
        });
    }

    render() {
        const { lng, lat, zoom } = this.state;
        return (
          <div className="d-flex justify-content-center">
            <div ref={this.mapContainer} className="map-container" />
          </div>
        );
      }
}