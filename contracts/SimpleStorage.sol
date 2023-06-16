// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract SimpleStorage {
    uint256 favouriteNumber;

    struct Person {
        string name;
        uint256 favouriteNumber;
    }

    mapping(string => uint256) public nameToFavouriteNumber;

    Person[] public person;

    function store(uint256 _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
    }

    function retrive() public view returns (uint256) {
        return favouriteNumber;
    }

    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        person.push(Person(_name, _favouriteNumber));
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}