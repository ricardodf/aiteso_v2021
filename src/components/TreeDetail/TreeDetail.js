import React from 'react';
import { Link } from 'react-router-dom';
import { taxonomyService, treeService } from '../../services';
import { MainNavbar } from '../utils';

import './TreeDetail.css'
import { TREE_DETAIL } from './TreeDetailConsts'

class TreeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeID: props.match.params.id,
      tree: {},
      isValidId: false,
      isLoading: true,
      tax: {},
      hum: null,
      temp: null
    }
  }
  componentDidMount() {
    treeService.getOneByNID(this.state.treeID).then((res) => {
      if (res.length > 0) {
        this.setState({
          tree: res[0],
          isValidId: true,
          isLoading: false,
        });
        taxonomyService.getOneById(res[0].id_taxonomia).then((taxonomy) => {
          this.setState({
            tax: taxonomy[0],
            isLoading: false,
          });
          if(this.state.treeID === "1"){
            const fetchSensor = fetch("https://papvidadigital-test.com/wsnv21/api/lecturas/n/HM3?count=1").then(res => res.json());
            fetchSensor.then((res) => {
              const data = res[0]
              this.setState({
                hum: data.hum,
                temp: data.temp
              })
            }).catch(err => {
              console.log(err)
            })
          }
        }, (err) => {
          this.setState({
            isLoading: false,
          });
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
    const addDefaultSrc = (e) => {
      e.preventDefault();
      e.target.src = "https://picsum.photos/id/10/600"
    }
    return (
      <>
        <MainNavbar />
        { this.state.isLoading ? (
          <> Loading... </>
        ) : this.state.isValidId ? (
          <div className="tree-detail-container">
            <div className="row">
              <div className="col-md-12">
                  <h4 className="tree-detail-title">
                    { `${TREE_DETAIL.TITLE}${this.state.tree.NID}`}
                  </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 img-container-wrapper">
                <div className="img-container card">
                  <img src={`http://papvidadigital-test.com/imagenes/${this.state.tree.id_taxonomia}.jpg`} onError={ addDefaultSrc } alt=""></img>
                </div>
              </div>
              <div className="col-md-4 detail-container-wrappper">
                <div className="detail-container card">
                  <p>{ TREE_DETAIL.FITO }</p>
                  <p id="fito">
                    <img 
                      className="tree-icon"
                      src={`${process.env.REACT_APP_FILE_ROOT}/images/treeIcons/${
                        (this.state.tree.Valoracion < 25) ? 'val_bad.png' : 
                        (this.state.tree.Valoracion >= 25 && this.state.tree.Valoracion < 50) ? 'val_regular.png' :
                        (this.state.tree.Valoracion >= 50 && this.state.tree.Valoracion < 75) ? 'val_good.png' :
                        'val_excelent.png'
                      }`} 
                      alt=""
                    />
                      { this.state.tree.Valoracion }%
                  </p>
                  <p>{ TREE_DETAIL.TAXONOMY }</p>
                  <p id="taxo">{ this.state.tax.nombre }</p>
                  <p>{ TREE_DETAIL.DATE }</p>
                  <p id="date">{ this.state.tree.Plantado }</p>
                  <p>{ TREE_DETAIL.DIAMETER }</p>
                  <p id="diameter">
                    <img
                      className="tree-icon"
                      src={`${process.env.REACT_APP_FILE_ROOT}/images/treeIcons/${
                        (this.state.tree.Diametro >= 30) ? 'diam_big.png' :
                        (this.state.tree.Diametro < 30 && this.state.tree.Diametro >= 15) ? 'diam_med.png':
                        'diam_small.png'
                      }`}
                      alt=""
                    />
                      { this.state.tree.Diametro }cm
                  </p>
                  <p>{ TREE_DETAIL.SIZE }</p>
                  <p id="size">
                    <img
                      className="tree-icon"
                      src={`${process.env.REACT_APP_FILE_ROOT}/images/treeIcons/${
                        (this.state.tree.Altura < 8) ? 'height_short.png' : 
                        (this.state.tree.Altura >= 8 && this.state.tree.Altura < 15) ? 'height_med.png' :
                        'height_tall.png'
                      }`}
                      alt=""
                    />
                      { this.state.tree.Altura }m
                  </p>
                  { this.state.hum != null ? ( <>
                    <p>{ TREE_DETAIL.HUMIDITY }</p>
                    <p id="humidity">
                      <img
                        className="tree-icon"
                        src={`${process.env.REACT_APP_FILE_ROOT}/images/treeIcons/${
                          (this.state.hum >= 70) ? 'hum_high.png' : 
                          (this.state.hum < 70 && this.state.hum >= 22) ? 'hum_good.png' :
                          'hum_low.png'
                        }`} 
                        alt=""
                      />
                        { this.state.hum }%
                    </p>
                  </>) : '' }
                  { this.state.temp != null ? ( <>
                    <p>{ TREE_DETAIL.TEMPERATURE }</p>
                    <p id="temperature">
                    <img
                      className="tree-icon"
                      src={`${process.env.REACT_APP_FILE_ROOT}/images/treeIcons/${
                        (this.state.temp < 17) ? 'tem_cold.png' : 
                        (this.state.temp >= 17 && this.state.temp < 27) ? 'tem_good.png' :
                        'tem_hot.png'
                      }`}
                      alt=""/>
                      { this.state.temp }°C
                    </p>
                  </>) : ''}
                </div>
                <Link to={`/arbol/${this.state.tree.NID}/route`} className="landpage-btn-link">
                  <button type="button" className="btn search-btn">
                      { TREE_DETAIL.ROUTE }
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="tree-detail-container">
            <div className="row">
                <div className="col-md-12">
                    <h4 className="tree-detail-title">
                      { TREE_DETAIL.NOT_FOUND }
                    </h4>
                </div>
              </div>
          </div>
        )}
      </>
    )
  }
}

export { TreeDetail }
