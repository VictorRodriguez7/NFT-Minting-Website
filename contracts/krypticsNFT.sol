// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract KrypticsNFT is ERC721, Ownable {

    uint256 public mintPrice; // price of mint
    uint256 public totalSupply; // current supply
    uint256 public maxSupply; // max supply
    uint256 public maxPerWallet; // max amount per wallet
    bool public isPublicMintEnabled; // determines when users can mint (owner has control)
    string internal baseTokenUri; //url where images are located
    address payable public withdrawWallet; // withdraw money that goes into wallet
    mapping(address => uint256) public walletMints; //keeps track of how many are minted per wallet

    constructor() payable ERC721('Kryptics','KT'){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // set withdraw wallet
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    //calldata is like the 'memory' key word but lets us know its 'read only'

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    //since erc721 exists and we already defined "baseTokenUri" we must override it
    //we first require that the token exists
    //next we take the url, put the id behind it, and then ".json" behind it
    //nft marketplaces will be able to grab this string and display our nft from it

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require((_exists(_tokenId)), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
    }

    //call() function returns a tuple with the second being an array of bytes we can ignore
    //we have no data to pass in to the function call so we leave it empty ''

    function withdraw() external onlyOwner {
        (bool success,) = withdrawWallet.call{ value: address(this).balance}('');
        require(success, 'Withdraw failed!');
    }

    //safeMint is in the ERC721: assigns the NFT to the person calling the contract

    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, 'Minting not enabled!');
        require(msg.value == _quantity * mintPrice, 'Wrong mint value!' );
        require(totalSupply + _quantity <= maxSupply,'Sold out!');
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'Exceed max wallet');

        for(uint256 i = 0; i < _quantity; i++){
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }

    }

}

