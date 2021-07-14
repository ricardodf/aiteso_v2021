import React from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from './helpers';
import { About, Admin, FilterGarden, Home, Login, Welcome, SearchNumber, SearchTaxonomy, TreeDetail, TreeRoute } from './components';
import { PrivateRoute } from './components/utils'

class App extends React.Component {

	render() {
		return (
			<div>
				<Router history={history} >
					<Route exact path="/about" component={About} />
					<PrivateRoute exact path="/admin" component={Admin} />
					<Route exact path="/filtro-jardin/:specie_id" component={FilterGarden} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/NID" component={SearchNumber} />
					<Route exact path="/especies" component={SearchTaxonomy} />
					<Route exact path="/arbol/:id" component={TreeDetail} />
					<Route exact path="/arbol/:id/route" component={TreeRoute} />
					<Route exact path="/" component={Welcome} />
				</Router>
			</div>
		);
	}
}


export default App;
