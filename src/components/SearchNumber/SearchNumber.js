import React from 'react';

import './SearchNumber.css'
import { treeService, taxonomyService } from '../../services';
import { CustomTile, MainNavbar } from '../utils'
import { SEARCH_NUM } from './SearchNumberConsts';

class SearchNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      searchResult: null,
      searchRecomended: [],
      totalTrees: null,
      isLoaded: false,
      errorLoading: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async handleSearch(event) {
    event.preventDefault();
    if (this.state.inputValue !== '') {
      this.setState({
          isLoaded: false,
      });

      Promise.all([
        treeService.getOneByNID(this.state.inputValue),
        treeService.getRandoms()
      ]).then(([singleArbol, recommended]) => {
        this.processTree(singleArbol, true);
        this.processTree(recommended, false);
      }).catch(err => {
        this.setState({
          isLoaded: true,
          errorLoading: err
        });
      })
    } else {
      this.setState({
        searchResult: {},
        searchRecomended: [],
      });
    }
  }

  async processTree(treeRes, isSearchResult) {
    await Promise.all(treeRes.map( async tree => {
      const taxonomy = await taxonomyService.getOneById(tree.id_taxonomia)
      tree.id = tree.NID;
      tree.specie = taxonomy[0].nombre;
      tree.specie_id = taxonomy[0].id_taxonomia;
    }))
    if (isSearchResult) {
      this.setState({
        isLoaded: true,
        searchResult: treeRes[0],
      })
    } else {
      this.setState({
        isLoaded: true,
        searchRecomended: treeRes,
      })
    }
  }

    handleInputChange(event) {        
        this.setState({
            inputValue: event.target.value
        });
    }
    componentDidMount() {
        treeService.getLastCreated().then( totalTreesRes => {
            this.setState({
                totalTrees: Number(totalTreesRes[0].NID),
                isLoaded: true
            });
        }, (err) => {
            this.setState({
                isLoaded: true,
                errorLoading: err
            });
        })
    }
    render() {
            const isSearchValid = this.state.searchRecomended.length;
            const colors = ["#C1D8ED", "#B8CB53", "#00697C"];                      

            return (
                <>
                  <MainNavbar />
                  { this.state.errorLoading ? (
                    <div>Error: {this.state.errorLoading.message}</div>
                  ) : !this.state.isLoaded ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="num-container">
                      <div className="row">
                          <div className="col-md-12">
                              <h4 className="num-title">
                                  { SEARCH_NUM.NUMBER_TITLE }
                              </h4>
                          </div>
                      </div>
                      <div className="search-container">
                          <div className="row">
                              <div className="col-md-8">
                                  <form onSubmit={this.handleSearch} className="num-search-field">
                                      <input
                                          id="searchhByNum"
                                          type="number"
                                          min="0" max={this.state.totalTrees}
                                          value={this.state.inputValue}
                                          onChange={this.handleInputChange}
                                          placeholder="ingresar número"/>
                                      <input type="submit" value="Submit"/>
                                      { !isSearchValid > 0 ? (<>
                                          <p>
                                              {`${SEARCH_NUM.SEARCH_NUMBER}${this.state.totalTrees}`}
                                          </p>
                                      </>) : ''}

                                  </form>
                              </div>
                          </div>
                          { isSearchValid > 0 ? ( <>
                              <div className="row tree-container">
                                  <div className="col-md-12 tree-result-wrapper">
                                      {(isSearchValid > 0 && this.state.searchResult) ? <CustomTile
                                        color="#EEA649"
                                        id={ this.state.searchResult.id }
                                        imgSrc={`http://papvidadigital-test.com/imagenes/${this.state.searchResult.specie_id}.jpg`}
                                        label={ this.state.searchResult.specie }
                                        link={`/arbol/${this.state.searchResult.id}`}
                                      /> : ''}
                                  </div>
                              </div>
                              <div className="row tree-container">
                                  <p>
                                      { SEARCH_NUM.RECOMMENDED }
                                  </p>
                                  <div className="col-md-12 tree-result-wrapper">
                                      {this.state.searchRecomended.map((tree, index) => {
                                        return(
                                            <CustomTile
                                                key={ index }
                                                color={ colors[index] } 
                                                id={ tree.id }
                                                imgSrc={`http://papvidadigital-test.com/imagenes/${this.state.searchResult.specie.id_taxonomia}.jpg`}
                                                label={ tree.specie }
                                                link={`/arbol/${tree.id}`}
                                                />
                                          )
                                        })
                                      }
                                  </div>
                              </div> 
                          </>) : '' }
                      </div>
                  </div>
                  )}
                </>
            )
        }
    }

export { SearchNumber }
