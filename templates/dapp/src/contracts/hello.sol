pragma solidity ^0.5.8;

import "./Deployable.sol";

contract hello is Deployable {
    function helloYou(string memory _name) public view returns(string memory){
        return string(abi.encodePacked("hello"," ",_name, ", welcome to the jungle insane it works!!!"));
    }
}
