import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Polygon from "react-google-maps/lib/components/Polygon";
import { withRouter } from "react-router-dom";
import { MARKERS, COORDS } from "../FilterGardenUtils"

import '../FilterGarden.css';

class FilterGardenMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: null,
    };
  }

	addDefaultSrc(e){
		e.preventDefault();
		e.target.src = "https://picsum.photos/id/10/70"
	}

  render() {
    return (
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: 20.60807, lng: -103.41469 }}
      >
        {this.props.markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              position={{
                lat: Number(marker.Latitud),
                lng: Number(marker.Longitud),
              }}
              onClick={() => this.setState({ selectedMarker: marker })}
              icon={MARKERS.ICONS[marker.id_jardin].icon}
            />
          );
        })}
        {this.state.selectedMarker ? (
          <InfoWindow
            position={{
              lat: Number(this.state.selectedMarker.Latitud) + 0.00002,
              lng: Number(this.state.selectedMarker.Longitud),
            }}
            onCloseClick={() => this.setState({ selectedMarker: null })}
          >
            <div
              className="infowindow-content"
              onClick={() =>
                this.props.history.push(
                  "/arbol/" + this.state.selectedMarker.NID
                )
              }
            >
              <div className="infowindow-img">
                <img
                  src={`http://papvidadigital-test.com/imagenes/${this.state.selectedMarker.id_taxonomia}.jpg`}
                  onError={ this.addDefaultSrc }
                  alt=""
                />
              </div>
              <div
                id={this.state.selectedMarker.id}
                className="infowindow-title"
              >
                Arbol {this.state.selectedMarker.NID}
              </div>
            </div>
          </InfoWindow>
        ) : null}
        {COORDS.map((jardin, key) => {
          return (
            <Polygon
              key={key}
              path={jardin.coords}
              options={{
                fillColor: jardin.fillColor,
                strokeColor: jardin.strokeColor,
                fillOpacity: jardin.fillOpacity,
              }}
            />
          );
        })}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(withRouter(FilterGardenMap)));
