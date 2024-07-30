import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './B.Homepage';
import CoinPage from './D.CoinPage';
import Coin from './E.Coin';
import Graph from './G.Graph.jsx';
import LoginForm from './H.LoginForm.jsx';
import TopNavbar from './TopNavBar.jsx';
import DashBoard from './DashBoard.jsx';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<DashBoard />} />
                    
                    <Route path="/graph" element={<Graph />} />
                    {/* Modify the route to accept coinId as a URL parameter */}
                    <Route path="/coinpage/:coinId" element={<CoinPage />} />
                    <Route path="/HomePage" element={<HomePage />} />
                    <Route path="/LoginForm" element={<LoginForm />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
