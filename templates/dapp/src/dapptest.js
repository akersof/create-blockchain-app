import React, {useContext, useReducer, useEffect} from 'react';
import {MetaMaskContext, DappContext} from "./context";
import {helloYou} from './contracts/hooks/hello.js';

function DappTest () {
    const metaMaskContext = useContext(MetaMaskContext);
    const dappContext = useContext(DappContext);
    const [response] = helloYou(metaMaskContext.address);
    return(
      <div>
          <br />
          {response.status === "success" ? response.result : "LOADING"}
          <h1>Hello World</h1>
      </div>
    );
}

export default DappTest;