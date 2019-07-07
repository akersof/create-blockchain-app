import React from 'react';
import ReactDOM from 'react-dom';
import {MetaMaskProvider, DappProvider} from "./components/context";
import './index.css'
import Dapp from './dapp';


ReactDOM.render(
    <React.Fragment>
        <MetaMaskProvider>
            <DappProvider>
                <Dapp />
            </DappProvider>
        </MetaMaskProvider>
    </React.Fragment>, document.getElementById('root'));
