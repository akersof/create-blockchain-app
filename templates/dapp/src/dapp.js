import React from 'react';
import {MetaMaskProvider, DappProvider} from "./context";
import DappTest from './dapptest';
function Dapp() {
    return (
        <div className="App">
            <MetaMaskProvider>
                <DappProvider>
                    <DappTest />
                </DappProvider>
            </MetaMaskProvider>
        </div>
    );
}
export default Dapp;
