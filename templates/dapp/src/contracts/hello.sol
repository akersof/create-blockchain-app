pragma solidity ^0.5.8;

import "./Deployable.sol";

contract hello is Deployable {
    function helloYou(string memory _name) public view returns(string memory){
        return string(abi.encodePacked("Hello"," ",_name, ", welcome to blockchain dapp programming."));
    }
}
