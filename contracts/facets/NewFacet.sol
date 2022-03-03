// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewFacet {
    uint256 x;

    event Value(uint256 _x);

    function addValue() external view returns (uint256) {
        return x;
    }

    function changeValue(uint256 _x) external {
        x = _x;
        emit Value(_x);
    }

    function add(uint256 a, uint256 b) external pure returns (uint256 z) {
        z = a + b;
    }
}
