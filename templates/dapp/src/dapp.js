import React, {useContext} from 'react';
import {MetaMaskContext, DappContext} from "./components/context";
import {helloYou} from './contracts/hooks/hello.js';
import './Dapp.css';
import logo from './logo.svg';

function Dapp() {
    const metamask = useContext(MetaMaskContext);
    const [response] = helloYou(metamask.address);
    return (
        <div className="Dapp">
            <header className="Dapp-header">
                {response.status === "success" ? response.result : "Loading"}
                <img src={logo} className="Dapp-logo" alt="logo" />
                <p>
                    Edit <code>src/dapp.js</code> or <code>src/contracts/hello.sol</code> and save to reload.
                </p>
                <a
                    className="Dapp-link"
                    href="https://github.com/akersof/create-blockchain-app/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn blockchain dapp developement
                </a>
                <a
                    className="Dapp-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}
export default Dapp;
