import React from 'react';
import './App.css';
import Header from './components/core/Header';
import {PoolsContainer} from "./components/core/PoolsContainer";
import {Route, Routes } from 'react-router-dom'
import {PoolPage} from "./components/core/PoolPage";


function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<PoolsContainer />} />
                <Route path="/pool:id" element={<PoolPage  poolId={1}/>} />
            </Routes>
        </div>

    );
}

export default App;
