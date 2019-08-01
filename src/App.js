import React from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";

import PageHeader from './common/pageHeader'
import Rotas from './rotas'

function App() {
	return (
		<HashRouter>
			<div className = "App" >
				<PageHeader />
				<Rotas />
			</div>
		</HashRouter>
	);
}

export default App
