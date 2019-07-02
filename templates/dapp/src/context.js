import React, {useContext, useReducer, useEffect, useState} from 'react';
import {ethers} from 'ethers';
//import * as contracts from './contracts/*.js';

export const MetaMaskContext = React.createContext(null);
export const DappContext = React.createContext(null);

export const MetaMaskProvider = ({children}) => {
    const [metamask] = useMetaMask();
    return(
        <>
            <MetaMaskContext.Provider value={metamask}>
                {children}
            </MetaMaskContext.Provider>
        </>
    );
};

const metaMaskReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_CONNECTION':
            return {...state, isLoading: true};
        case 'CONNECTION_SUCCESS':
            return {...state, isLoading: false};
        case 'DETECT_METAMASK':
            return {...state, isMetaMask: action.isMetaMask};
        case 'DETECT_ACCOUNT_CHANGE':
            return {...state, address: action.address};
        case 'DETECT_NETWORK_CHANGE':
            return {...state, network: action.address};
        case 'GET_ADDRESS':
            return {...state, address: action.address};
        case 'GET_PROVIDER':
            return {...state, provider: action.provider};
        case 'GET_NETWORK':
            return {...state, network: action.network};
        case 'GET_BALANCE':
            return {...state, balance: action.balance};
        default:
            throw new Error('Unhandled action in metaMaskReducer')
    }
};

const initialUserState = {isMetaMask: false, address: "0x0", network: "", isLoading: true};
const useMetaMask = () => {
    const [metamask, dispatch] = useReducer(metaMaskReducer, initialUserState);
    useEffect(() => {
        //TODO: https://ethereum.stackexchange.com/questions/42768/how-can-i-detect-change-in-account-in-metamask
        // window.onbeforeunload = function() {
        //    return "Prevent reload";
        //};
        window.ethereum.on('accountsChanged', (accounts) => {
            dispatch({type: 'DETECT_ACCOUNT_CHANGE', address: accounts[0]})});
        window.ethereum.on('networkChanged', (netID) => {
            dispatch({type: 'DETECT_NETWORK_CHANGE', network: netID});
        });
        (async () => {
            dispatch({type: 'INIT_CONNECTION'});
            const address = (await window.ethereum.enable())[0];
            dispatch({type: "GET_ADDRESS", address: address});
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            dispatch({type: "GET_PROVIDER", provider: provider});
            const network = (await provider.getNetwork()).name;
            dispatch({type: "GET_NETWORK", network: network});
            //TODO: find a way to get update on balance change.
            const balance = ethers.utils.formatEther(await provider.getBalance(address));
            dispatch({type: "GET_BALANCE", balance: balance});
            dispatch({type: 'CONNECTION_SUCCESS'});
        })();
    }, [metamask.address, metamask.network]);
    return [metamask];
};

export const DappProvider = ({children}) => {
    const [dappState] = useDapp();
    return(
        <>
            <DappContext.Provider value={dappState}>
                {children}
            </DappContext.Provider>
        </>
    );
};

const dappReducer = (state, action) => {
    switch(action.type) {
        case 'SET_CONTRACT':
            const obj = {...state};
            obj[action.name] = action.instance;
            console.log(obj);
            return obj;
        case 'SET_SIGNER':
            //const obj = {...state};
            //obj[action.name] = contracts[action.name];
            return {...state};
        case 'SET_ISREADY':
            return {...state, ready: true};
        default:
            throw new Error('Unhandled action in dappReducer');
    }
};

const useDapp = () => {
    const metaMaskContext = useContext(MetaMaskContext);
    const [dapp, dispatch] = useReducer(dappReducer, {ready: false});
    useEffect(() => {
        (async () => {
            if(!metaMaskContext.isLoading) {
                let contracts = await import('./contracts/hello.js');
                const keys = Object.keys(contracts);
                for(const key of keys) {
                    const obj = {};
                    obj['type'] = 'SET_CONTRACT';
                    obj['name'] = key;
                    obj['instance'] = contracts[key];
                    dispatch(obj);
                }
                //const contract = new ethers.Contract(CONTRACT_CRYTO_MERC_ADDRESS, CONTRACT_CRYPTO_MERC_ABI, metaMaskContext.provider);
                //console.log('contract');
                //console.log(contract);
               // dispatch({type: 'SET_CONTRACT', contract: contract});
                //const signer = contract.connect(metaMaskContext.provider.getSigner(metaMaskContext.address));
                //console.log('signer');
                //console.log(signer);
                //dispatch({type: 'SET_SIGNER', signer: signer});
                dispatch({type: 'SET_ISREADY'});
            }
        })()
    }, [metaMaskContext.address, metaMaskContext.network, metaMaskContext.isLoading]);
    return [dapp];
};

