import React from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";

import Rotas from './rotas'
import Menu from './common/Menu'
import Footer from './common/Footer'

function App() {
	return (
		<HashRouter>
			<div className="app">
				<Menu />
				<Rotas />
				<Footer />
			</div>
		</HashRouter>
	);
}

export default App
