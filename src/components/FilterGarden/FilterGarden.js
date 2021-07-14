import React, { Component } from 'react'

import './FilterGarden.css'
import { FILT_GARDENS } from './FilterGardenConsts'
import { MARKERS } from './FilterGardenUtils'
import { gardenService, taxonomyService, treeService } from '../../services'
import FilterGardenMap from './FilterGardenMap/FilterGardenMap'
import { MainNavbar } from '../utils'

class FilterGarden extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specie_name: "",
            allTreesBySpecieId: null,
            treesFiltered: null,
            jardinesSelected: null,
            jardinListBySpecie: null,
        }
        this.filterTreesBySelection = this.filterTreesBySelection.bind(this);
    }

    filterTreesBySelection() {
        const { allTreesBySpecieId, jardinesSelected, jardinListBySpecie } = this.state;
        const newList = allTreesBySpecieId.filter( (tree) => {
            for(let i=0; i < jardinesSelected.length; i++){
                if(!jardinesSelected[i]) {
                    if(jardinListBySpecie[i].id_jardin === tree.id_jardin) {
                        return false;
                    }
                }
            }
            return true;
        });
        this.setState({ treesFiltered: newList })
    }

    handleClick = (e) => {
        let tmp = this.state.jardinesSelected;
        tmp[e.target.id] = !tmp[e.target.id];
        this.setState({
            jardinesSelected: tmp
        })
        this.filterTreesBySelection();
    }

    async processJardines(jardinIdList) {
        let jardinListBySpecie = [];
        for(const jardinId of jardinIdList){
            try {
                let jardin = await gardenService.getOneById(jardinId)
                jardinListBySpecie.push(jardin[0]);
            } catch(error) {
                console.error(error)
            }
        }
        jardinListBySpecie.sort((a,b) => {
            var nameA=a.id_jardin, nameB=b.id_jardin;
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });
        return jardinListBySpecie;
    }

  componentDidMount() {
    const specie_id = this.props.match.params.specie_id
    Promise.all([
      taxonomyService.getOneById(specie_id),
      treeService.getAllByTaxonomy(specie_id)
    ]).then(([specie, allTreesBySpecieId]) => {
      let jardinIdList = [];
      for(const tree of allTreesBySpecieId) {
        if(!jardinIdList.includes(tree.id_jardin))
        jardinIdList.push(tree.id_jardin);
      }
      this.processJardines(jardinIdList).then(
        (jardinListBySpecie) => {
          this.setState({
            specie_name: specie[0].nombre,
            allTreesBySpecieId,
            treesFiltered: allTreesBySpecieId,
            jardinListBySpecie,
            jardinesSelected: [...Array(jardinListBySpecie.length)].map((val, i) => true),
            isLoaded: true
          })
        }
      );
    }).catch(err => {
      this.setState({
        isLoaded: true,
        errorLoading: err
      });
    })
  }

  render() {
    return (
      <div>
        <MainNavbar />
        { this.state.errorLoading ? (
          <div>Error: {this.state.errorLoading.message}</div>
        ) : !this.state.isLoaded ? (
          <div>Loading...</div>
        ) : (
          <div className="filtjar-container">
            <div className="filtjar-title">
              <h4>{ FILT_GARDENS.TITLE }</h4>
            </div>
            <div className="filtjar-subtitle">
              <h6>Especie: { this.state.specie_name }</h6>
            </div>
            <div className="filtjar-dashboard">
              <div className="filtjar-sidebar">
                <div className="filtjar-sidebar-content">
                  { this.state.jardinListBySpecie.map((jardin, key) => {
                    return (
                      <>
                        <button 
                          key={Math.random()}
                          id={key}
                          className={
                            this.state.jardinesSelected[key] ? 
                              `btn filtjar-btn color_${MARKERS.BTN_COLORS[jardin.id_jardin]}` : 
                              "btn filtjar-btn isNotSelected"
                            }
                          onClick={this.handleClick}
                        >
                          {jardin.nombre}
                        </button>
                      </>
                    )
                  })}
                </div>
              </div>
              <div className="filtjar-mapa">
                <FilterGardenMap 
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v3.exp?libraries=drawing&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                  containerElement={<div style={{height:'600px', width:'100%'}} />}
                  mapElement={<div style={{ height:'100%', width:'100%'}} />}
                  loadingElement={<p>Cargando Vista...</p>}
                  markers={this.state.treesFiltered}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export { FilterGarden }

