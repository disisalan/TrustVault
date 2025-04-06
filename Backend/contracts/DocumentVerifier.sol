// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerifier {
    event DocumentStored(bytes32 indexed compositeHash, address indexed issuer);
    mapping(bytes32 => bool) public isDocumentStored;

    function storeDocument(bytes32 compositeHash) external {
        require(!isDocumentStored[compositeHash], "Document already stored");
        isDocumentStored[compositeHash] = true;
        emit DocumentStored(compositeHash, msg.sender);
    }
}