import React from 'react';
import { Modal } from 'react-bootstrap';

import './TreeRoute.css'
import { TREE_ROUTE } from './TreeRouteConsts';
import { treeService } from '../../services'
import { MainNavbar } from '../utils';
import TreeRouteMap from './TreeRouteMap/TreeRouteMap';

class TreeRoute extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        treeID: props.match.params.id,
        tree: {},
        isValidId: false,
        isLoading: true,
        showModal: false,
        startPointisSet: false,
        startPoint: {},
      }
      this.startRoute = this.startRoute.bind(this);
      this.handleMapCallback = this.handleMapCallback.bind(this);
  }
  startRoute(event) {
    event.preventDefault();
    if (this.state.startPointisSet) {
      this.treemap.renderDitections();
    } else {
      this.setState({showModal:true});
    }
  }
  handleMapCallback(position) {
    this.setState({
      startPointisSet: true,
      startPoint: position,
    });
  }
  componentDidMount() {
    treeService.getOneByNID(this.state.treeID).then((res) => {
      if (res.length > 0) {
        this.setState({
          tree: res[0],
          isValidId: true,
          isLoading: false,
        });
      } else {
        this.setState({
          isValidId: false,
          isLoading: false,
        });
      }
    }, (err) => {
      this.setState({
        isValidId: false,
        isLoading: false,
      });
    });
  }

  render() {
    return (
      <div>
        <MainNavbar />
        { this.state.isLoading ? (
          <> Loading... </>
        ) : (
          <>
            <Modal show={this.state.showModal} animation={true} onHide={() => this.setState({showModal:false})}> 
              <Modal.Body>{ TREE_ROUTE.NO_START_INSTRUCTIONS }</Modal.Body>
              <Modal.Footer>
                <button className="btn btn-success" onClick={() => this.setState({showModal:false})}>
                  { TREE_ROUTE.OK }
                </button>
              </Modal.Footer>
            </Modal>
            <div className="tree-detail-container">
              { this.state.isValidId ? ( <>
                <div className="row">
                  <div className="col-md-12">
                      <h4 className="tree-route-title">
                        { `${TREE_ROUTE.TITLE}${this.state.tree.NID}`}
                      </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                  <TreeRouteMap 
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?v3.exp&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                      containerElement={<div style={{height:'600px', width:'100%'}} />}
                      mapElement={<div style={{ height:'100%', width:'100%'}} />}
                      loadingElement={<p>Cargando Vista...</p>}
                      mapCallback={this.handleMapCallback}
                      onRef={ref => (this.treemap = ref)}
                      treeMarker={{
                        lat: Number(this.state.tree.Latitud), 
                        lng: Number(this.state.tree.Longitud), 
                        id: this.state.tree.NID
                      }}
                  />
                  </div>
                  <div className="col-md-4 route-instruct-container">
                    <h4 className="tree-route-subtitle">
                      { TREE_ROUTE.ROUTE }
                    </h4>
                    { this.state.startPointisSet ? ( <>
                      <p>
                        { TREE_ROUTE.INSTRUCTIONS }
                      </p>
                    </>) : (<>
                      <p>
                        { TREE_ROUTE.NO_START_INSTRUCTIONS }
                      </p>
                    </>)}
                    <button type="button" className="btn search-btn" onClick={this.startRoute}>
                        { TREE_ROUTE.START }
                    </button>
                  </div>
                </div>
              </>) : ( <>
                <div className="row">
                  <div className="col-md-12">
                      <h4 className="tree-route-title">
                        { TREE_ROUTE.NOT_FOUND }
                      </h4>
                  </div>
                </div>
              </>) }
            </div>
          </>
        )}
      </div>
    )
  }
}

export { TreeRoute }
