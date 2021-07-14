import React, { Component } from 'react';
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
} from 'react-google-maps';
import Polyline from "react-google-maps/lib/components/Polyline";
import { withRouter } from 'react-router-dom'

class TreeRouteMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeIsSelected: false,
            positionIsSet: false,
            position: null,
            initLat: null,
            initLong: null,
            directions: null,
            points: null
        }
        this.onMapClick = this.onMapClick.bind(this);
        this.renderDitections = this.renderDitections.bind(this);
    }

    onMapClick(event) {
        this.props.mapCallback(event.latLng);
        console.log(event.latLng.lat())
        console.log(event.latLng.lng())
        console.log(this.props.treeMarker.lat)
        console.log(this.props.treeMarker.lng)
        this.setState({
            positionIsSet: true,
            position: event.latLng,
            initLat: event.latLng.lat(),
            initLong: event.latLng.lng()
        });
    }

    getDirectionCoords() {
        var initData = this.state.directions;
        let dataPoints = [{ lat: this.props.treeMarker.lat, lng: this.props.treeMarker.lng }]
        for(const value of initData) {
            dataPoints.push({ lat: Number(value.data.lat), lng: Number(value.data.long) })
        }
        dataPoints.push({ lat: this.state.initLat, lng: this.state.initLong })
        console.log(dataPoints)
        this.setState({ points: dataPoints })
    }

    renderDitections() {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                initLat: this.state.initLat,
                initLong: this.state.initLong,
                endLat: this.props.treeMarker.lat,
                endLong: this.props.treeMarker.lng
            })
        }
        // Reemplazar endpoint con el de cPanel!
        const getShortestRoute = fetch("http://papvidadigital2021-rutasnodos.mybluemix.net/ruta", options).then(res => res.json())
        getShortestRoute.then(
            res => {
              this.setState({ directions: res})
              this.getDirectionCoords();
            },
            err => {
              console.log(err)
            }
          );
    }

    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    componentDidUpdate() {
        console.log(this.state.position)
    }

    // END TODO

    render() {
        return (
            <GoogleMap
                defaultZoom={17}
                defaultCenter={{ lat: 20.60807, lng: -103.41469}}
                onClick={this.onMapClick}>   

                <Marker
                    key={0}
                    position={{ lat: this.props.treeMarker.lat, lng: this.props.treeMarker.lng }}
                    onClick={() => this.setState({ treeIsSelected: true })}
                    icon='http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|023F4B'/>

                {   this.state.positionIsSet ? (<>
                    <Marker
                        key={1}
                        position={this.state.position}
                        icon='http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|B8CB53'/>
                </>) : null }

                { this.state.points ? (
                    <Polyline
                        path={this.state.points}
                        options={{
                            strokeColor: "#000000",
                        }}
                    />
                ): null}
            </GoogleMap>
        );
    }
};

export default withScriptjs(
    withGoogleMap(
        withRouter(TreeRouteMap)
    )
)