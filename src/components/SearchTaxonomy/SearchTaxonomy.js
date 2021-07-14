import React, { Component } from 'react'

import './SearchTaxonomy.css'
import { MainNavbar } from '../utils'
import { gardenService, taxonomyService } from '../../services'
import GardenSelection from './GardenSelection/GardenSelection';
import TaxonomySidebar from './TaxonomySidebar/TaxonomySidebar';
import TaxonomyDashboard from './TaxonomyDashboard/TaxonomyDashboard';

class SearchTaxonomy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGardens: null,
      allTaxonomies: null,
      currentTaxonomies: null,
      selectedGardens: null,
      selectedLetter: null,
      gardenSelectionShow: false,
      isLoaded: false,
      isLoadedWithError: false,
      loadingError: null,
    }
  }

  componentDidMount() {
    Promise.all([
      gardenService.getAll(),
      taxonomyService.getAll(),
    ]).then(([allGardens, allTaxonomies]) => {
      const cleanTaxonomies = this.cleanTaxonomyArray(allTaxonomies);
      this.setState({
        allGardens,
        allTaxonomies: cleanTaxonomies,
        currentTaxonomies: cleanTaxonomies,
        selectedGardens: [...Array(allGardens.length)].map(val => true),
        isLoaded: true
      })
    }).catch(err => {
      this.setState({
        isLoaded: false,
        isLoadedWithError: true,
        loadingError: JSON.stringify(err)
      })
    })
  }

  cleanTaxonomyArray = (arr) => {
    arr.sort((a, b) => {
      if(a.nombre.toLowerCase() < b.nombre.toLowerCase())
        return -1;
      if(a.nombre.toLowerCase() > b.nombre.toLowerCase())
        return 1;
      return 0;
    })
    arr.forEach(val => {
      val.jardines = val.jardines.split(',').map(Number)
    });
    return arr
  }

  filterEverything = (selectedGardens, selectedLetter) => {
    const { allTaxonomies } = this.state;
    if(selectedLetter) {
      return allTaxonomies.filter( val => {
        let cnt = 0;
        for(const jardinId of val.jardines){
          if(selectedGardens[jardinId] === false)
              cnt += 1;
        }
        if(val.jardines.length === cnt)
          return false;
        let currentSpeFirstChar = String(val.nombre).charAt(0);
        if (selectedLetter.localeCompare(currentSpeFirstChar) === 0){
            return true;
        }
        else return false;
      })
    } else {
      return allTaxonomies.filter( val => {
        let cnt = 0;
        for(const jardinId of val.jardines){
          if(selectedGardens[jardinId] === false)
              cnt += 1;
        }
        if(val.jardines.length === cnt)
          return false;
        else return true;
      })
    }
  }

  handleGardenSelection = (selectedGardens) => {
    const { selectedLetter } = this.state;
    this.setState({ 
      currentTaxonomies: this.filterEverything(selectedGardens, selectedLetter),
      selectedGardens,
      gardenSelectionShow: false
    })
  }

  handleTaxonomySelection = (selectedLetter) => {
    const { selectedGardens } = this.state;
    this.setState({ 
      currentTaxonomies: this.filterEverything(selectedGardens, selectedLetter),
      selectedLetter,
    })
  }

  handleSelectionReset = () => {
    const { allTaxonomies, allGardens } = this.state;
    this.setState({
      currentTaxonomies: allTaxonomies,
      selectedGardens: [...Array(allGardens.length)].map(val => true),
      selectedLetter: null,
    })
  }

  render() {
    const { 
      allGardens,
      currentTaxonomies,
      selectedGardens,
      gardenSelectionShow,
      isLoaded,
      isLoadedWithError,
      loadingError 
    } = this.state;

    return (
      <div>
        <MainNavbar />
        { isLoaded ? (
          <div>
            <div className="spe-container">
              <TaxonomySidebar 
                handleTaxonomySelection={(val) => this.handleTaxonomySelection(val)}
                handleGardenSelectionShow={() => this.setState({ gardenSelectionShow: true })}
                handleSelectionReset={() => this.handleSelectionReset()}
              />
              <TaxonomyDashboard 
                taxonomies={currentTaxonomies}
              />
            </div>
            <GardenSelection
              show={gardenSelectionShow}
              onHide={() => this.setState({ gardenSelectionShow: false })}
              allGardens={allGardens}
              handleGardenSelection={(val) => this.handleGardenSelection(val)}
              selectedGardens={selectedGardens}
            />
          </div>
        ) : isLoadedWithError ? (
          <div>
            Loaded with Errors
            {loadingError}
          </div>
        ) : (
          <div>
            Loading...
          </div>
        )}
        
      </div>
    )
  }
}

export { SearchTaxonomy }
