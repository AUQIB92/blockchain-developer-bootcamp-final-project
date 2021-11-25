import React from 'react';
import ReactDOM from 'react-dom';
import {
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import MayorPage from './My-Components/MayorPage';
import OwnerPage from './My-Components/OwnerPage';
import MarketPlace from './My-Components/MarketPlace';
import { Provider } from 'react-redux'
import blockchainReducer from './blockchainReducer/blockchainReducer';
import storeSynchronize from 'redux-localstore';
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({ reducer: { blockchainReducer }, devTools: true })
//storeSynchronize(store);
ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/mayorPage" element={<MayorPage />} />
                    <Route path="/ownerPage" element={<OwnerPage />} />
                    <Route path="/marketplace" element={<MarketPlace />} /> 
                </Route>
            </Routes>
        </BrowserRouter>;
        </Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
