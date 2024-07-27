import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './B.Homepage';
import CoinPage from './D.CoinPage';
import Coin from './E.Coin';
import Graph from './G.Graph.jsx';
import LoginForm from './H.LoginForm.jsx';
import TopNavbar from './TopNavBar.jsx';
const App = () => {
    return (
        <div>
            <TopNavbar /> 
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    
                    <Route path="/graph" element={<Graph />} />
                    {/* Modify the route to accept coinId as a URL parameter */}
                    <Route path="/coinpage/:coinId" element={<CoinPage />} />
                    <Route path="/HomePage" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
