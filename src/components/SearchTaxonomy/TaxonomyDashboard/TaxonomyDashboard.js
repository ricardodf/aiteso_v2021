import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import './TaxonomyDashboard.css'
import { TAX_DASHBOARD } from './TaxonomyDashboardConsts'
import { CustomTile } from '../../utils/CustomTile/CustomTile';

class TaxonomyDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: TAX_DASHBOARD.INITIAL_PAGE,
			speciesPerPage: TAX_DASHBOARD.ITEMS_PER_PAGE
		}
		this.handlePageClick = this.handlePageClick.bind(this);
	}

	handlePageClick({ selected: selectedPage }) {
		this.setState({currentPage: selectedPage});
	}

	componentDidUpdate(prevProps) {
		if(prevProps.taxonomies !== this.props.taxonomies) {
			this.setState({currentPage: TAX_DASHBOARD.INITIAL_PAGE})
		}
	}

	render() {
		const { currentPage, speciesPerPage } = this.state;

		const offset = currentPage * speciesPerPage;
		const currentPageData = this.props.taxonomies
			.slice(offset, offset + speciesPerPage)
			.map((specie, index) => {
				return(
					<CustomTile
						key={index}
            color="#00697C"
            id={specie.id_taxonomia}
            imgSrc={`http://papvidadigital-test.com/imagenes/${specie.id_taxonomia}.jpg`}
						label={specie.nombre}
						link={`/filtro-jardin/`+specie.id_taxonomia}
          />
				)
			});
		const pageCount = Math.ceil(this.props.taxonomies.length / speciesPerPage);

		return (
			<div className="spedashboard-container">
				<div className="spedashboard-title">
					<h4>{ TAX_DASHBOARD.TITLE }</h4>
				</div>

				{ currentPageData.length < 1 ? (
					<div className="spedashboard-noselect">
						<h4>{ TAX_DASHBOARD.NOT_FOUND }</h4>
					</div>
				) : (
					<div className="spedashboard-grid">
						{currentPageData}
					</div>
				)}
				<ReactPaginate 
					previousLabel={"<<"}
					nextLabel={">>"}
					pageCount={pageCount}
					onPageChange={(this.handlePageClick)}
					pageRangeDisplayed={TAX_DASHBOARD.PAGE_RANGE_DISPLAYED}
					marginPagesDisplayed={TAX_DASHBOARD.MARGIN_RANGE_DISPLAYED}
					containerClassName={"pagination"}
					previousLinkClassName={"pagination__link"}
					nextLinkClassName={"pagination__link"}
					disabledClassName={"pagination__link--disabled"}
					activeClassName={"pagination__link--active"}
				/>
			</div>
		)
	}
}

export default TaxonomyDashboard
